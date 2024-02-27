import UserService from "@/http/userService/userService";
import {AppDispatch} from "@/lib/store";
import {userActions} from "@/lib/features/user/userSlice";

export const userLogin = (nickname:string, password: string, rememberMe: boolean) => async (dispatch: AppDispatch) =>{
    UserService.login(nickname, password, rememberMe).then(value => {
        UserService.createRequestInterceptor();
        dispatch(userActions.userLoginSuccess(value));
        UserService.createResponseInterceptor(() => {
            dispatch(userActions.userLogoutSuccess());
        })
    })
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
    UserService.refreshTokens().then(value => {
        UserService.createRequestInterceptor();
        dispatch(userActions.userLoginSuccess(value));
    })
}

