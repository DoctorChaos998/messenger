import React, {FC, PropsWithChildren} from 'react';
import classes from "./ChatContainer.module.scss";

const ChatContainer:FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={classes.container}>
            {children}
        </div>
    );
};

export default ChatContainer;