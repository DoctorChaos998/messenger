import React from 'react';
import classes from "./chats.module.scss";

const ChatPage = () => {
    return (
        <div className={classes.container}>
            <span className={`material-icons ${classes.icon}`}>
                forum
            </span>
            <h2 className={classes.header}>
                Select the chat
            </h2>
        </div>
    );
};

export default ChatPage;