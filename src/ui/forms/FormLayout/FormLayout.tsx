'use client'
import React, {FC, PropsWithChildren} from 'react';
import classes from "./FormLayout.module.scss";

const FormLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={classes.layout}>
            {children}
        </div>
    );
};

export default FormLayout;