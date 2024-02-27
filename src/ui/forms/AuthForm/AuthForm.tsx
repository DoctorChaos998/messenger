'use client'
import React, {FC, HTMLAttributes, PropsWithChildren} from 'react';
import {useAppSelector} from "@/lib/hooks";
import classes from "./AuthForm.module.scss";

const AuthForm: FC<PropsWithChildren<HTMLAttributes<HTMLFormElement>>> = ({children, ...props}) => {
    return (
        <div className={classes.container}>
            <form className={classes.form} {...props}>
                {children}
            </form>
        </div>
    );
};

export default AuthForm;