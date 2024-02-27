import React from 'react';
import classes from "./ChatSkeleton.module.scss";

const ChatSkeleton = () => {
    return (
        <div className={classes.container}>
            <div className={classes.circleIcon}/>
            <div className={classes.textContainer}>
                <div className={classes.skeletonLogin}/>
                <div className={classes.skeletonMessage}/>
            </div>
        </div>
    );
};

export default ChatSkeleton;