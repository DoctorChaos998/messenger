import UserService from "@/http/userService/userService";
import {AppDispatch} from "@/lib/store";
import {userActions} from "@/lib/features/user/userSlice";
import WsApi from "@/ws/instance";

export const userLogin = (nickname:string, password: string, rememberMe: boolean) => async (dispatch: AppDispatch) =>{
    UserService.login(nickname, password, rememberMe).then(value => {
        UserService.createRequestInterceptor();
        UserService.createResponseInterceptor(() => {
            dispatch(userActions.userLogoutSuccess());
            WsApi.disconnect();
        });
        dispatch(userActions.userLoginSuccess(value));
        WsApi.connect();
    }).catch(() => {
        dispatch(userActions.setStatus('success'));
    });
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
    UserService.refreshTokens().then(value => {
        UserService.createRequestInterceptor();
        UserService.createResponseInterceptor(() => {
            dispatch(userActions.userLogoutSuccess());
            WsApi.disconnect();
        });
        dispatch(userActions.userLoginSuccess(value));
        WsApi.connect();
    }).catch(() => {
        dispatch(userActions.setStatus('success'));
    });
}

export const logout = () => async (dispatch: AppDispatch) => {
    UserService.logout().then(() => {
        dispatch(userActions.userLogoutSuccess());
        WsApi.disconnect();
    })
}

