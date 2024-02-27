import {InternalAxiosRequestConfig} from "axios";

const createSetRequestInterceptor = (accessToken:string) => (config:InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
}