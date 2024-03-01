import React, {FC} from 'react';
import classes from "./ChatMessage.module.scss";
import {useAppSelector} from "@/lib/hooks";

interface IChatMessageProps{
    messageId: number
}
const ChatMessage: FC<IChatMessageProps> = ({messageId}) => {
    const userId = useAppSelector(state => state.userReducer.id);
    const message = useAppSelector(state => state.currentChatReducer.messages.find(message => message.messageId = messageId)!);
    return (
        <div>

        </div>
    );
};

export default ChatMessage;