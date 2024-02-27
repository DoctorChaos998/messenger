'use client'
import React, {useEffect} from 'react';
import {useParams, useRouter} from "next/navigation";

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
        <div>

        </div>
    );
};

export default CurrentChat;