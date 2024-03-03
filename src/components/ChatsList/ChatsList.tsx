import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import classes from "./ChatsList.module.scss";
import ChatSkeleton from "@/ui/loaders/ChatSkeleton/ChatSkeleton";
import SearchLineSkeleton from "@/ui/loaders/SearchLineSkeleton/SearchLineSkeleton";
import ChatsSearcher from "@/components/ChatsSearcher/ChatsSearcher";
import { shallowEqual } from 'react-redux';
import ChatService from "@/http/chatService/chatService";
import {chatsActions} from "@/lib/features/chats/chatsSlice";
import ChatItem from "@/components/ChatItem/ChatItem";
import NotInChatUser from "@/components/NotInChatUser/NotInChatUser";
import WsApi from "@/ws/instance";

const ChatsList = () => {
    const status = useAppSelector(state => state.chatsReducer.status);
    const chatIdsList = useAppSelector(state => {
        const newState = state.chatsReducer.chatsList;
        const newSearchLine = state.chatsReducer.searchLine;
        return newState.filter(chat => {
            if(chat.recipientLogin.toLowerCase().includes(newSearchLine.toLowerCase())) return true;
        }).map((chat) => chat.chatId);
    }, shallowEqual);
    const searchLine = useAppSelector(state => state.chatsReducer.searchLine);
    const notInChatUser = useAppSelector(state => state.chatsReducer.notInChatUser);
    const dispatch = useAppDispatch();

    useEffect(() => {
        ChatService.getAllChats().then(value => {
            dispatch(chatsActions.loadingChatsListSuccess(value));
        }).catch(() => {
        });
        const setUserStatusHandler = (event: MessageEvent) => {
            const message: IStatusMessage|IReadMessage|INewMessage = JSON.parse(event.data);
            if(message.type === 'status'){
                dispatch(chatsActions.setUserStatus({recipientId: message.data.userId, isRecipientOnline: message.data.isOnline}));
            }
        };
        const setNewMessage = (event: MessageEvent) => {
            const message: IStatusMessage|IReadMessage|INewMessage = JSON.parse(event.data);
            if(message.type === 'new_message'){
                dispatch(chatsActions.setLastMessage({chatId: message.data.chatId, lastMessage: message.data.message}));
            }
        }

        WsApi.wsApi.addEventListener('message', setUserStatusHandler);
        WsApi.wsApi.addEventListener('message', setNewMessage);
        return () => {
            WsApi.wsApi.removeEventListener('message', setUserStatusHandler);
            WsApi.wsApi.removeEventListener('message', setNewMessage);
        }
    }, []);

    return (
        <div className={classes.container}>
            {status === 'success'?
            <>
                <ChatsSearcher/>
                <p className={classes.subHeader}>Added users</p>
                {chatIdsList.map((chatId) => <ChatItem key={chatId} chatId={chatId}/>)}
                {searchLine&&<p className={classes.subHeader}>Global search</p>}
                {
                    notInChatUser&&<NotInChatUser notInChatUser={notInChatUser}/>
                }
            </>
            :
            <>
                <SearchLineSkeleton/>
                {
                    Array(3).fill(1).map((_, index) => <ChatSkeleton key={index}></ChatSkeleton>)
                }
            </>
            }
        </div>
    );
};

export default ChatsList;