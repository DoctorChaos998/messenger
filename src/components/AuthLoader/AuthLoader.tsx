'use client'
import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import {useAppDispatch} from "@/lib/hooks";
import {checkAuth} from "@/lib/features/user/userActions";

const AuthLoader: FC<PropsWithChildren> = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        //dispatch(checkAuth()).finally(() => setIsLoading(false));
    }, []);
    return (
        isLoading?
            <div>

            </div>
            :
            children
    );
};

export default AuthLoader;