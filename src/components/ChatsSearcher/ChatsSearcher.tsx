import React, {useEffect, useState} from 'react';
import classes from "./ChatsSearcher.module.scss";
import {useDebounce} from "@/hooks/debounce";
import {useAppDispatch} from "@/lib/hooks";
import {chatsActions} from "@/lib/features/chats/chatsSlice";
import UserService from "@/http/userService/userService";

const ChatsSearcher = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedValue = useDebounce(searchQuery);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setSearchQuery(searchQuery)
    }, [searchQuery]);

    useEffect(() => {
        dispatch(chatsActions.setSearchLine(debouncedValue));
        if(debouncedValue){
            UserService.searchUser(debouncedValue).then((value) => {
                dispatch(chatsActions.setNotInChatUsers(value));
            }).catch(() => {
                dispatch(chatsActions.setNotInChatUsers(null));
            })
        }
    }, [debouncedValue]);

    return (
        <div className={classes.container}>
            <label className={classes.label}>
                <span className={`material-icons ${classes.icon}`}>
                    search
                </span>
                <input maxLength={32} placeholder={'Find some one...'} className={classes.input} value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
            </label>
        </div>
    );
};

export default ChatsSearcher;