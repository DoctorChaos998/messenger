import React, {FC, useRef} from 'react';
import {CSSTransition} from "react-transition-group";
import classes from "./ErrorNotification.module.scss";
interface IErrorNotificationProps{
    isActive: boolean,
    notificationText: string
}
const ErrorNotification: FC<IErrorNotificationProps> = ({isActive, notificationText}) => {
    const ref = useRef<HTMLDivElement>(null);
    return (
        <CSSTransition nodeRef={ref} timeout={{enter: 0}} in={isActive} unmountOnExit={true} classNames={{
            enterDone: classes.containerActive
        }}>
            <div className={classes.containerInactive} ref={ref}>
                {notificationText}
            </div>
        </CSSTransition>
    );
};

export default ErrorNotification;