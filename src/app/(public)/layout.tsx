'use client'
import React, {useEffect} from "react";
import {useAppSelector} from "@/lib/hooks";
import {useRouter} from "next/navigation";
import GlobalLoader from "@/ui/loaders/GlobalLoader/GlobalLoader";

export default function ContentLayout({children,}: {
    children: React.ReactNode
}) {
    const isAuth = useAppSelector(state => state.userReducer.isAuth);
    const router = useRouter();
    useEffect(() => {
        if(isAuth){
            router.push('/chats');
        }
    }, [isAuth]);
    return (
        isAuth?
            <GlobalLoader/>
            :
            children
    )
}