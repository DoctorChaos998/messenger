import React from 'react';
import classes from "./ChatHeaderSkeleton.module.scss";

const ChatHeaderSkeleton = () => {
    return (
        <div className={classes.container}>
            <div className={classes.circleIcon}/>
            <div className={classes.recipientInfo}/>
        </div>
    );
};

export default ChatHeaderSkeleton;