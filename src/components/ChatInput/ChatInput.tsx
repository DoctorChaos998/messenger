import React, {useRef, useState} from 'react';
import classes from "./ChatInput.module.scss";
import ChatService from "@/http/chatService/chatService";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {currentChatActions} from "@/lib/features/currentChat/currentChatSlice";
import {chatsActions} from "@/lib/features/chats/chatsSlice";

const ChatInput = () => {
    const [text, setText] = useState('');
    const currentChatId = useAppSelector(state => state.currentChatReducer.currentChatId);
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLTextAreaElement>(null);
    const handleSendMessage = () => {
        if(text.length>0 && currentChatId !== 0){
            ChatService.sendMessage(currentChatId,text).then(value => {
                dispatch(currentChatActions.addMessage(value));
                dispatch(chatsActions.setLastMessage({chatId: currentChatId, lastMessage: text}));
                dispatch(chatsActions.clearUnreadMessages(currentChatId));
                if(ref.current) ref.current.style.height = 'auto';
            });
            setText('');
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        event.target.style.height = 'auto';
        if(event.target.scrollHeight < 180)
        event.target.style.height = event.target.scrollHeight + 'px';
    };
    return (
        <div className={classes.container}>
            <textarea placeholder={'Write message...'} className={classes.textInput} value={text} onChange={handleChange} ref={ref}/>
            <button className={classes.button} onClick={handleSendMessage}>
                <span className={`material-icons ${classes.icon}`}>
                    send
                </span>
            </button>
        </div>
    );
};

export default ChatInput;