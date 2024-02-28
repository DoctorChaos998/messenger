import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IUserState {
    id: number,
    login: string,
    isAuth: boolean,
}
const initialState: IUserState = {
    id: 0,
    login: '',
    isAuth: false,
}
const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        userLoginSuccess(state, action:PayloadAction<{nickname: string, accessToken: string}>){
            state.login = action.payload.nickname;
            state.isAuth = true;
        },
        userLogoutSuccess(){
            return {...initialState};
        },
    }
})
export const {actions: userActions, reducer: userReducer} = userSlice;
