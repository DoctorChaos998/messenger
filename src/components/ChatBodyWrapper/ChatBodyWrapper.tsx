'use client'
import React from 'react';
import {useAppSelector} from "@/lib/hooks";
import ChatBody from "@/components/ChatBody/ChatBody";
import ChatBodyLoader from "@/ui/loaders/ChatBodyLoader/ChatBodyLoader";

const ChatBodyWrapper = ({chatId}: {chatId: number}) => {
    const status = useAppSelector(state => state.chatsReducer.status);
    return (
        status === 'success'?
            <ChatBody chatId={chatId}/>
            :
            <ChatBodyLoader/>
    );
};

export default ChatBodyWrapper;