import {status} from "@/types/slices";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IChatsState {
    status: status,
    chatsList: IChat[],
    notInChatUsers: INotInChatUser|null,
    searchLine: string
}

const initialState: IChatsState = {
    status: 'initial',
    chatsList: [],
    notInChatUsers: null,
    searchLine: ''
}

const chatsSlice = createSlice({
    name: 'chatsSlice',
    initialState,
    reducers:{
        loadingChatsListSuccess(state, action: PayloadAction<IChat[]>) {
            state.chatsList = action.payload;
            state.status = 'success';
        },
        setSearchLine(state, action: PayloadAction<string>){
            state.searchLine = action.payload;
        },
        setNotInChatUsers(state, action: PayloadAction<INotInChatUser|null>){
            state.notInChatUsers = action.payload;
        }
    }
})
export const {actions: chatsActions, reducer: chatsReducer} = chatsSlice;