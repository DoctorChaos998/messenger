import React, {FC, PropsWithChildren} from 'react';
import classes from "./ChatLayout.module.scss";

const ChatLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <section className={classes.container}>
            {children}
        </section>
    );
};

export default ChatLayout;