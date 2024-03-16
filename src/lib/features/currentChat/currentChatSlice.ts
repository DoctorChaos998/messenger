import {status} from "@/types/slices";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ICurrentChatState {
    status: status,
    currentChatId: number,
    messages: IMessage[]
}

const initialState: ICurrentChatState = {
    status: 'initial',
    currentChatId: 0,
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
        addMessage(state, action: PayloadAction<IMessage>){
            state.messages.push(action.payload);
        },
        setChatId(state, action: PayloadAction<number>){
            state.currentChatId = action.payload;
        },
        readAllMessages(state){
            state.messages.forEach(message => message.isMessageRead = true);
        },
        loadMoreMessages(state, action: PayloadAction<IMessage[]>){
            state.messages = [...action.payload, ...state.messages];
        }
    }
})
export const {actions: currentChatActions, reducer: currentChatReducer} = chatsSlice;