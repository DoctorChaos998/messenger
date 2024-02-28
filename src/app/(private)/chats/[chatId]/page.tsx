'use client'
import React, {useEffect} from 'react';
import {useParams, useRouter} from "next/navigation";
import ChatBody from "@/components/ChatBody/ChatBody";
import ChatInput from "@/components/ChatInput/ChatInput";

const CurrentChat = () => {
    const params: {chatId: string} = useParams();
    const router = useRouter();
    useEffect(() => {
        if(+params.chatId === +params.chatId){
            //dispatch(loadingFileList(+params.folderId));

        }
        else{
            router.push('/chats');
        }
    }, []);
    return (
        <>
            <ChatBody/>
            <ChatInput/>
        </>
    );
};

export default CurrentChat;