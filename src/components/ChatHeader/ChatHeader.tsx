import React from 'react';
import classes from "./ChatHeader.module.scss";
import {useAppSelector} from "@/lib/hooks";
import ChatHeaderSkeleton from "@/ui/loaders/ChatHeaderSkeleton/ChatHeaderSkeleton";
import {shallowEqual} from "react-redux";

const ChatHeader = ({chatId}: {chatId:number}) => {
    const status = useAppSelector(state => state.currentChatReducer.status);
    const currentChat = useAppSelector(state => {
        const allChats = state.chatsReducer.chatsList;
        return allChats.find(chat => chat.chatId === chatId);
    }, shallowEqual)
    return (
        <div className={classes.container}>
            {status !== 'success' && currentChat !== undefined?
                <ChatHeaderSkeleton/>
                :
                <div className={classes.recipientContainer}>
                        <span className={classes.userInfo}>
                            {currentChat?.recipientLogin}
                        </span>
                        <span className={classes.isOnline} style={{backgroundColor: currentChat?.isRecipientOnline?'green':'gray'}}>
                            {currentChat?.isRecipientOnline}
                        </span>
                </div>
            }
        </div>
    );
};

export default ChatHeader;