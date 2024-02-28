import {status} from "@/types/slices";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ICurrentChatState {
    status: status,
    currentChat: IChat|null,
    messages: IMessage[]
}

const initialState: ICurrentChatState = {
    status: 'initial',
    currentChat: null,
    messages: []
}

const chatsSlice = createSlice({
    name: 'chatsSlice',
    initialState,
    reducers:{
        loadingMessagesListSuccess(state, action: PayloadAction<IMessage[]>) {
            state.messages = action.payload;
            state.status = 'success';
        },
    }
})
export const {actions: currentChatActions, reducer: currentChatReducer} = chatsSlice;