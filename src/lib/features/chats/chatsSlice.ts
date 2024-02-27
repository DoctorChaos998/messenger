import {status} from "@/types/slices";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IChatsState {
    status: status,
    chatsList: IChat[],
    notInChatUsers: INotInChatUser|null
}

const initialState: IChatsState = {
    status: 'initial',
    chatsList: [],
    notInChatUsers: null
}

const chatsSlice = createSlice({
    name: 'chatsSlice',
    initialState,
    reducers:{
        loadingChatsListSuccess(state, action: PayloadAction<IChat[]>) {
            state.chatsList = action.payload;
            state.status = 'success';
        },
    }
})
export const {actions: chatsActions, reducer: chatsReducer} = chatsSlice;