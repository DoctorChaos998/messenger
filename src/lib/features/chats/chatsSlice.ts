import {status} from "@/types/slices";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import notInChatUser from "@/components/NotInChatUser/NotInChatUser";

interface IChatsState {
    status: status,
    chatsList: IChat[],
    notInChatUser: INotInChatUser|null,
    searchLine: string
}

const initialState: IChatsState = {
    status: 'initial',
    chatsList: [],
    notInChatUser: null,
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
            state.notInChatUser = action.payload;
        },
        createNewChat(state, action: PayloadAction<IChat>){
            state.chatsList.unshift(action.payload);
            state.searchLine = '';
            state.notInChatUser = null;
        },
        setUserStatus(state, action: PayloadAction<{recipientId: number, isRecipientOnline: boolean}>){
            state.chatsList.find((chat) => {
                return chat.recipientId === action.payload.recipientId;
            })!.isRecipientOnline = action.payload.isRecipientOnline;
        },
        setLastMessage(state, action: PayloadAction<{chatId: number, lastMessage: string}>){
            const newChat = state.chatsList.find(chat => chat.chatId === action.payload.chatId)!;
            newChat.lastMessage = action.payload.lastMessage;
            // newChat.unreadMessagesNumber += 1;
        },
        addNewChat(state, action: PayloadAction<IChat>){
            state.chatsList.unshift(action.payload);
        }
    }
})
export const {actions: chatsActions, reducer: chatsReducer} = chatsSlice;