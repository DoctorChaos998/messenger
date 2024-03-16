'use client'
import React, {useEffect} from 'react';
import {useParams, useRouter} from "next/navigation";
import ChatBody from "@/components/ChatBody/ChatBody";
import ChatInput from "@/components/ChatInput/ChatInput";
import ChatService from "@/http/chatService/chatService";
import ChatHeader from "@/components/ChatHeader/ChatHeader";
import ChatBodyWrapper from "@/components/ChatBodyWrapper/ChatBodyWrapper";

const CurrentChat = () => {
    const params: {chatId: string} = useParams();
    const router = useRouter();

    useEffect(() => {
        if(+params.chatId !== +params.chatId) router.push('/chats');
    }, []);

    return (
        <>
            <ChatHeader chatId={+params.chatId}/>
            <ChatBodyWrapper chatId={+params.chatId}/>
            <ChatInput/>
        </>
    );
};

export default CurrentChat;