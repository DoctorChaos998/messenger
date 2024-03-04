import React, {FC} from 'react';
import {useAppSelector} from "@/lib/hooks";
import classes from "./ChatItem.module.scss";
import {useRouter} from "next/navigation";
interface IChatItemProps{
    chatId: number
}
const ChatItem: FC<IChatItemProps> = ({chatId}) => {
    const chat = useAppSelector(state => state.chatsReducer.chatsList.find(chat => chat.chatId === chatId)!);
    const router = useRouter();
    return (
        <div className={classes.container} onClick={() => router.push(`/chats/${chat.chatId}`)}>
            <span className={classes.circleIcon}>
                {chat.recipientLogin[0].toUpperCase()}
            </span>
            <div className={classes.textContainer}>
                <div className={classes.userInfo}>
                    <span>
                        {chat.recipientLogin}
                    </span>
                    <span className={classes.isOnline} style={{backgroundColor: chat.isRecipientOnline?'green':'gray'}}/>
                </div>
                <div className={classes.lastMessage}>
                    {chat.lastMessage}
                </div>
            </div>
            {chat.unreadMessagesNumber > 0&&<span className={classes.unreadMessagesNumber}>
                {chat.unreadMessagesNumber}
            </span>}
        </div>
    );
};

export default ChatItem;