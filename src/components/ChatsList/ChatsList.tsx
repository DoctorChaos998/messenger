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
        })
    }, []);

    return (
        <div className={classes.container}>
            {status === 'success'?
            <>
                <ChatsSearcher/>
                <p className={classes.subHeader}>Added users</p>
                {chatIdsList.map((chatId) => <ChatItem chatId={chatId}/>)}
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