import React, {FC} from 'react';
import {useAppSelector} from "@/lib/hooks";
import {shallowEqual} from "react-redux";
import classes from "./ChatMessage.module.scss";

interface IChatMessageProps{
    messageId: number,
    recipientLogin: string
}
const ChatMessage: FC<IChatMessageProps> = ({messageId, recipientLogin}) => {
    const userId = useAppSelector(state => state.userReducer.id);
    const userLogin = useAppSelector(state => state.userReducer.login);
    const message = useAppSelector(state => {
        const newState = state.currentChatReducer.messages;
        return newState.find(message => message.messageId === messageId)!;
    }, shallowEqual);
    return (
        <div className={classes.container} style={{justifySelf:userId === message.senderId?'right':'right'}}>
            <div className={classes.infoContainer}>
                <span>
                    {userId === message.senderId?userLogin:recipientLogin}
                </span>
                <span className={classes.timeContainer}>
                    {message.messageSendingDate}
                </span>
            </div>
            <div className={classes.textMessageContainer}>
                {message.message}
            </div>
        </div>
    );
};

export default ChatMessage;