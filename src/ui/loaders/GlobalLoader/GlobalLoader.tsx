import React from 'react';
import classes from "./GlobalLoader.module.scss";

const GlobalLoader = () => {
    return (
        <div className={classes.container}>
            <div className={classes.loader}/>
        </div>
    );
};

export default GlobalLoader;