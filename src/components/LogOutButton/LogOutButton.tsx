import React from 'react';
import classes from "./LogOutButton.module.scss";
import {useAppDispatch} from "@/lib/hooks";
import UserService from "@/http/userService/userService";
import {logout} from "@/lib/features/user/userActions";

const LogOutButton = () => {
    const dispatch = useAppDispatch();
    return (
        <button className={classes.container} onClick={() => {
            UserService.logout().then(() => {
                dispatch(logout());
            })
        }}>
            <span className="material-icons">
                logout
            </span>
            Logout
        </button>
    );
};

export default LogOutButton;