import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "@/lib/features/user/userSlice";
import {chatsReducer} from "@/lib/features/chats/chatsSlice";
import {currentChatReducer} from "@/lib/features/currentChat/currentChatSlice";

const rootReducer = combineReducers({
    userReducer,
    chatsReducer,
    currentChatReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch