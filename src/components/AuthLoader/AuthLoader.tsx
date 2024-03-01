'use client'
import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {checkAuth} from "@/lib/features/user/userActions";
import GlobalLoader from "@/ui/loaders/GlobalLoader/GlobalLoader";

const AuthLoader: FC<PropsWithChildren> = ({children}) => {
    const status = useAppSelector(state => state.userReducer.status);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(checkAuth());
    }, []);
    return (
        status!=='success'?
            <GlobalLoader/>
            :
            children
    );
};

export default AuthLoader;