import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {status} from "@/types/slices";

interface IUserState {
    id: number,
    login: string,
    isAuth: boolean,
    status: status
}
const initialState: IUserState = {
    id: 0,
    login: '',
    isAuth: false,
    status: 'initial'
}
const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        userLoginSuccess(state, action:PayloadAction<{nickname: string, accessToken: string}>){
            state.login = action.payload.nickname;
            state.isAuth = true;
            state.status = 'success';
        },
        userLogoutSuccess(){
            return {...initialState};
        },
        setStatus(state, action: PayloadAction<status>){
            state.status = action.payload;
        }
    }
})
export const {actions: userActions, reducer: userReducer} = userSlice;
