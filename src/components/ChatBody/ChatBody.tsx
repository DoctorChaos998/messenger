import React, {useEffect} from 'react';
import classes from "./ChatBody.module.scss";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import ChatBodyLoader from "@/ui/loaders/ChatBodyLoader/ChatBodyLoader";
import ChatMessage from "@/components/ChatMessage/ChatMessage";
import {useRouter} from "next/navigation";
import ChatService from "@/http/chatService/chatService";
import {currentChatActions} from "@/lib/features/currentChat/currentChatSlice";

const ChatBody = ({chatId}: {chatId:number}) => {
    const status = useAppSelector(state => state.currentChatReducer.status);
    const messageIds = useAppSelector(state => state.currentChatReducer.messages.map(message => message.messageId));
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(chatId !== chatId) router.push('/chats');
        else {
            ChatService.getMessages(chatId, 0, 20).then(value => {
                dispatch(currentChatActions.loadingMessagesListSuccess(value));
            }).catch(() => {
                router.push('/chats');
            });
        }
    }, []);

    return (
        <div className={classes.container}>
            {
                status!=='success'?
                    <ChatBodyLoader/>
                    :
                    messageIds.map((messageId) => <ChatMessage messageId={messageId}/> )
            }
        </div>
    );
};

export default ChatBody;