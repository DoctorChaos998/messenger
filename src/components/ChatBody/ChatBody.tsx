import React, {useEffect, useRef} from 'react';
import classes from "./ChatBody.module.scss";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import ChatBodyLoader from "@/ui/loaders/ChatBodyLoader/ChatBodyLoader";
import ChatMessage from "@/components/ChatMessage/ChatMessage";
import {useRouter} from "next/navigation";
import ChatService from "@/http/chatService/chatService";
import {currentChatActions} from "@/lib/features/currentChat/currentChatSlice";
import {shallowEqual} from "react-redux";
import ChatHeader from "@/components/ChatHeader/ChatHeader";


const ChatBody = ({chatId}: {chatId:number}) => {
    const status = useAppSelector(state => state.currentChatReducer.status);
    const messageIds = useAppSelector(state => {
        const newState = state.currentChatReducer.messages;
        return newState.map(message => message.messageId);
    }, shallowEqual);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const recipientLogin = useAppSelector(state => {
        const chatsList = state.chatsReducer.chatsList;
        return chatsList.find((chat) => chat.chatId === chatId)?.recipientLogin ?? '';
    });
    const endRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if(chatId !== chatId) router.push('/chats');
        else {
            ChatService.getMessages(chatId, 0, 20).then(value => {
                dispatch(currentChatActions.loadingMessagesListSuccess(value));
                dispatch(currentChatActions.setChatId(chatId));
                setTimeout(() => endRef.current?.scrollIntoView(false),0);
            }).catch(() => {
                router.push('/chats');
            });
        }
    }, []);

    useEffect(() => {
       endRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messageIds]);

    return (
        <div className={classes.container}>
            {status!=='success'?
                    <ChatBodyLoader/>
                    :
                    messageIds.length === 0?
                            <div>
                                No message
                            </div>
                            :
                            messageIds.map(messageId => <ChatMessage key={messageId} messageId={messageId} recipientLogin={recipientLogin}/>)
            }
            <div ref={endRef} style={{bottom: 0, clear: 'both', position: "relative"}}/>
        </div>
    );
};

export default ChatBody;