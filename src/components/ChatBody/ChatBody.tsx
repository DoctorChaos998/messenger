import React, {useEffect, useRef} from 'react';
import classes from "./ChatBody.module.scss";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import ChatBodyLoader from "@/ui/loaders/ChatBodyLoader/ChatBodyLoader";
import ChatMessage from "@/components/ChatMessage/ChatMessage";
import {useRouter} from "next/navigation";
import ChatService from "@/http/chatService/chatService";
import {currentChatActions} from "@/lib/features/currentChat/currentChatSlice";
import {shallowEqual} from "react-redux";
import WsApi from "@/ws/instance";
import {chatsActions} from "@/lib/features/chats/chatsSlice";


const ChatBody = ({chatId}: {chatId:number}) => {
    const status = useAppSelector(state => state.currentChatReducer.status);
    const messageIds = useAppSelector(state => {
        const newState = state.currentChatReducer.messages;
        return newState.map(message => message.messageId);
    }, shallowEqual);
    const unreadMessagesNumber = useAppSelector(state => {
        const chatsList = state.chatsReducer.chatsList;
        return chatsList.find((chat) => chat.chatId === chatId)?.unreadMessagesNumber ?? 0;
    });
    const canLoadMore = useRef(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const endRef = useRef<HTMLDivElement>(null);
    const topMessageNumber = useRef(20);

    useEffect(() => {
        if(chatId !== chatId){
            router.push('/chats');
        }
        else {
            const chatBodyHandler = (event: MessageEvent) => {
                const message: IStatusMessage|IReadMessage|INewMessage|INewChat = JSON.parse(event.data);
                if (message.type === 'new_message'){
                    if(chatId === message.data.chatId){
                        dispatch(currentChatActions.addMessage(message.data));
                        dispatch(chatsActions.clearUnreadMessages(chatId));
                        WsApi.wsApi.send(JSON.stringify({type: 'read_message', data: {chatId: chatId}}));
                    }
                }
                if (message.type === 'read_message'){
                    if(chatId === message.data.chatId){
                        dispatch(currentChatActions.readAllMessages());
                    }
                }
            }
            ChatService.getMessages(chatId, 0, 20).then(value => {
                dispatch(currentChatActions.loadingMessagesListSuccess(value));
                dispatch(currentChatActions.setChatId(chatId));
                dispatch(chatsActions.clearUnreadMessages(chatId));
                if(unreadMessagesNumber) WsApi.wsApi.send(JSON.stringify({type: 'read_message', data: {chatId: chatId}}));
                WsApi.wsApi.addEventListener('message', chatBodyHandler);
                if(value.length === 20) canLoadMore.current = true;
                setTimeout(() => endRef.current?.scrollIntoView(false),0);
            }).catch(() => {
                router.push('/chats');
            });
            return () => {
                WsApi.wsApi.removeEventListener('message', chatBodyHandler);
            }
        }
    }, []);


    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const {scrollTop, clientHeight, scrollHeight} = container;
            if(scrollHeight - scrollTop < clientHeight + 200) endRef.current?.scrollIntoView({behavior: 'smooth'});
        }
    }, [messageIds]);

    return (
        <div className={classes.container} ref={containerRef} onScroll={(event) => {
            if(event.currentTarget.scrollTop === 0 && canLoadMore.current) {
                canLoadMore.current = false
                ChatService.getMessages(chatId, topMessageNumber.current, 20).then(value => {
                    dispatch(currentChatActions.loadMoreMessages(value));
                    if(value.length === 20) canLoadMore.current = true;
                    topMessageNumber.current += 20;
                })
            }
        }}>
            {status!=='success'?
                    <ChatBodyLoader/>
                    :
                    messageIds.length === 0?
                        <div className={classes.noMessagesContainer}>
                            <span className={`material-icons ${classes.icon}`}>
                                forum
                            </span>
                            <h2>
                                Lets chat
                            </h2>
                        </div>
                        :
                        messageIds.map(messageId => <ChatMessage key={messageId} messageId={messageId}/>)
            }
            <div ref={endRef} style={{bottom: 0, clear: 'both', position: "relative"}}/>
        </div>
    );
};

export default ChatBody;