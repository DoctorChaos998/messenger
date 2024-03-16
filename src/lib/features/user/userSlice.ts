import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {status} from "@/types/slices";
import {IUserLoginData} from "@/types/apiUserData";

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
        userLoginSuccess(state, action:PayloadAction<IUserLoginData>){
            state.login = action.payload.login;
            state.id = action.payload.userId;
            state.isAuth = true;
            state.status = 'success';
        },
        userLogoutSuccess(){
            return {...initialState, status: 'success'};
        },
        setStatus(state, action: PayloadAction<status>){
            state.status = action.payload;
        }
    }
})
export const {actions: userActions, reducer: userReducer} = userSlice;
