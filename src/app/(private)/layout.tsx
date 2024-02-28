'use client'
import React, {useEffect} from "react";
import {useAppSelector} from "@/lib/hooks";
import {useRouter} from "next/navigation";
import ChatLayout from "@/components/ChatLayout/ChatLayout";
import ChatsList from "@/components/ChatsList/ChatsList";
import ChatContainer from "@/components/ChatContainer/ChatContainer";
import GlobalLoader from "@/ui/loaders/GlobalLoader/GlobalLoader";

export default function ContentLayout({children,}: {
    children: React.ReactNode
}) {
    const isAuth = useAppSelector(state => state.userReducer.isAuth);
    const router = useRouter();
    useEffect(() => {
        if(!isAuth) router.push('/login');
    }, [isAuth]);
    return (
        isAuth?
        <ChatLayout>
            <ChatsList/>
            <ChatContainer>
                {children}
            </ChatContainer>
        </ChatLayout>
            :
            <GlobalLoader/>
    )
}