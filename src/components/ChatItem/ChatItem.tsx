import React, {FC} from 'react';
import {useAppSelector} from "@/lib/hooks";
import classes from "./ChatItem.module.scss";
interface IChatItemProps{
    chatId: number
}
const ChatItem: FC<IChatItemProps> = ({chatId}) => {
    const chat = useAppSelector(state => state.chatsReducer.chatsList.find(chat => chat.chatId === chatId)!);
    return (
        <div className={classes.container}>
            <span className={classes.circleIcon} style={{borderColor: chat.isRecipientOnline?'green':'gray'}}>
                {chat.recipientLogin[0].toUpperCase()}
            </span>
            <div className={classes.textContainer}>
                <div className={classes.chatInfo}>
                    {chat.recipientLogin}
                </div>
                <div className={classes.chatInfo}>
                    {chat.lastMessage}
                </div>
            </div>
        </div>
    );
};

export default ChatItem;