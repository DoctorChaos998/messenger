import React from 'react';
import classes from "./Header.module.scss";
const Header = () => {
    return (
        <header className={classes.container}>
            <h1 className={classes.header}>
                Chat messenger
            </h1>
        </header>
    );
};

export default Header;