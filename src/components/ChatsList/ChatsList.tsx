import React, {useEffect} from 'react';
import {useAppSelector} from "@/lib/hooks";
import classes from "./ChatsList.module.scss";
import ChatSkeleton from "@/ui/loaders/ChatSkeleton/ChatSkeleton";
import SearchLineSkeleton from "@/ui/loaders/SearchLineSkeleton/SearchLineSkeleton";

const ChatsList = () => {
    const status = useAppSelector(state => state.chatsReducer.status);
    const chatsList = useAppSelector(state => state.chatsReducer.chatsList);

    useEffect(() => {
        
    }, []);
    return (
        <div className={classes.container}>
            {status === 'success'?
            <div>

            </div>
            :
            <>
                <SearchLineSkeleton/>
                {
                    Array(3).fill(1).map((_, index) => <ChatSkeleton key={index}></ChatSkeleton>)
                }
            </>
            }
        </div>
    );
};

export default ChatsList;