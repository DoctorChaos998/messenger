import React from 'react';
import classes from "./ChatBodyLoader.module.scss";

const ChatBodyLoader = () => {
    return (
        <div className={classes.container}>
            <div className={classes.loader}/>
        </div>
    );
};

export default ChatBodyLoader;