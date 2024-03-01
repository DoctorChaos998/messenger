import React, {FC} from 'react';
import classes from "./NotInChatUser.module.scss";
import {useAppDispatch} from "@/lib/hooks";
import {useRouter} from "next/navigation";
import ChatService from "@/http/chatService/chatService";
import {chatsActions} from "@/lib/features/chats/chatsSlice";

interface INotInChatUserProps{
    notInChatUser: INotInChatUser
}
const NotInChatUser: FC<INotInChatUserProps> = ({notInChatUser}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const addNewChatHandler = () => {
        ChatService.createChat(notInChatUser.userId).then(value => {
            dispatch(chatsActions.createNewChat(value));
            router.push(`chats/${notInChatUser.userId}`);
        }).catch(() => {});
    };

    return (
        <div className={classes.container} onClick={addNewChatHandler}>
            <span className={classes.circleIcon}>
                {notInChatUser.login[0].toUpperCase()}
            </span>
            <div className={classes.textContainer}>
                {notInChatUser.login}
            </div>
        </div>
    );
};

export default NotInChatUser;