import axios, {AxiosError, InternalAxiosRequestConfig} from "axios";
import {httpApi} from "@/http/instance";
import {IUserLoginData} from "@/types/apiUserData";
import {userActions} from "@/lib/features/user/userSlice";

export default class UserService {
    private static serviceUrl = '/user';
    private static accessToken: string;
    static async registration(login: string, password: string): Promise<void>{
        try {
            await httpApi.post(`${this.serviceUrl}/registration`, {
                login,
                password
            });
            return Promise.resolve();
        } catch (error){
            if(axios.isAxiosError(error)){
                const errorResponse: AxiosError<{error: string}> = error;
                if(errorResponse.response){
                    return Promise.reject({
                        status: errorResponse.response.status,
                        error: errorResponse.response.data.error
                    });
                }
            }
        }
    }
    static async login(login: string, password: string, rememberMe: boolean): Promise<IUserLoginData>{
        try {
            const response  =  await httpApi.post<IUserLoginData>(`${this.serviceUrl}/login`,
                {
                    login,
                    password,
                    rememberMe
                });
            this.accessToken = response.data.accessToken;
            return Promise.resolve(response.data);
        } catch(error){
            if(axios.isAxiosError(error)){
                const errorResponse: AxiosError<{error: string}> = error;
                if(errorResponse.response){
                    return Promise.reject({
                        status: errorResponse.response.status,
                        error: errorResponse.response.data.error
                    });
                }
            }
            throw error
        }
    }
    static async logout(): Promise<void>{
        try {
            await httpApi.post(`${this.serviceUrl}/logout`);
            return Promise.resolve();
        } catch(error){
            if(axios.isAxiosError(error)){
                const errorResponse: AxiosError<{error: string}> = error;
                if(errorResponse.response){
                    return Promise.reject({
                        status: errorResponse.response.status,
                        error: errorResponse.response.data.error
                    });
                }
            }
            throw error
        }
    }
    static async refreshTokens(): Promise<IUserLoginData>{
        try {
            const response  =  await httpApi.put<IUserLoginData>(`${this.serviceUrl}/tokens`);
            this.accessToken = response.data.accessToken;
            return Promise.resolve(response.data);
        } catch(error){
            if(axios.isAxiosError(error)){
                const errorResponse: AxiosError<{error: string}> = error;
                if(errorResponse.response){
                    return Promise.reject({
                        status: errorResponse.response.status,
                        error: errorResponse.response.data.error
                    });
                }
            }
            throw error
        }
    }
    static async changePassword(currentPassword: string, newPassword: string): Promise<void>{
        try {
            await httpApi.put(`${UserService.serviceUrl}/password`, {currentPassword, newPassword});
            return Promise.resolve();
        } catch (error){
            if(axios.isAxiosError(error)){
                const errorResponse: AxiosError<{error: string}> = error;
                if(errorResponse.response){
                    return Promise.reject({
                        status: errorResponse.response.status,
                        error: errorResponse.response.data.error
                    });
                }
            }
            throw error
        }
    }
    static createRequestInterceptor(){
        httpApi.interceptors.request.clear();
        httpApi.interceptors.request.use((config:InternalAxiosRequestConfig) => {
            config.headers.Authorization = `Bearer ${this.accessToken}`
            return config
        });
    }
    static createResponseInterceptor(logoutFunction: () => void){
        let isRetry = false;
        httpApi.interceptors.response.use((config) => {
            return config
        }, async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && error.config && !isRetry) {
                try {
                    isRetry = true;
                    await UserService.refreshTokens();
                    isRetry = false;
                    this.createRequestInterceptor();
                    return httpApi.request(originalRequest);
                } catch (error: any) {
                    this.clearAllInterceptor();
                    logoutFunction();
                }
            }
            throw error
        });
    }
    static clearAllInterceptor(){
        httpApi.interceptors.request.clear();
        httpApi.interceptors.response.clear();
    }

    static getAccessToken() {
        return this.accessToken;
    }

    static async searchUser(login: string): Promise<INotInChatUser>{
        try {
            const response  =  await httpApi.get<INotInChatUser>(`${this.serviceUrl}/${login}`);
            return Promise.resolve(response.data);
        } catch(error){
            if(axios.isAxiosError(error)){
                const errorResponse: AxiosError<{error: string}> = error;
                if(errorResponse.response){
                    return Promise.reject({
                        status: errorResponse.response.status,
                        error: errorResponse.response.data.error
                    });
                }
            }
            throw error
        }
    }
}