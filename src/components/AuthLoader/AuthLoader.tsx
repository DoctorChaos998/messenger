'use client'
import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import {useAppDispatch} from "@/lib/hooks";
import {checkAuth} from "@/lib/features/user/userActions";
import GlobalLoader from "@/ui/loaders/GlobalLoader/GlobalLoader";

const AuthLoader: FC<PropsWithChildren> = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(checkAuth()).finally(() => setIsLoading(false));
    }, []);
    return (
        isLoading?
            <GlobalLoader/>
            :
            children
    );
};

export default AuthLoader;