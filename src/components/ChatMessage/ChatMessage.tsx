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
    const message = useAppSelector(state => {
        const newState = state.currentChatReducer.messages;
        return newState.find(message => message.messageId === messageId)!;
    }, shallowEqual);
    console.log(message.isMessageRead)
    return (
        <div className={classes.container} style={{float: userId === message.senderId?'right':'left'}}>
            {message.message}
            <div className={classes.infoContainer}>
                <span className={classes.timeContainer}>
                    {message.messageSendingDate}
                </span>
                {!(userId === message.senderId)?
                    !message.isMessageRead?
                        <span className={`material-icons ${classes.isMessageUnRead}`}>
                            done
                        </span>
                        :
                        <span className={`material-icons ${classes.isMessageRead}`}>
                            done_all
                        </span>
                    :
                    null
                }
            </div>
        </div>
    );
};

export default ChatMessage;