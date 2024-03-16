import {httpApi} from "@/http/instance";
import axios, {AxiosError} from "axios";

export default class ChatService {
    private static serviceUrl = '/chats';

    static async getAllChats(): Promise<IChat[]>{
        try {
            const response = await httpApi.get<IChat[]>(`${this.serviceUrl}`);
            return Promise.resolve(response.data);
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

    static async createChat(recipientId: number): Promise<IChat>{
        try {
            const response = await httpApi.post<IChat>(`${this.serviceUrl}`, {
                recipientId
            });
            return Promise.resolve(response.data);
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

    static async getMessages(chatId: number, fromMessageNumber: number, messagesNumber: number):Promise<IMessage[]>{
        try {
            const response = await httpApi.get<IMessage[]>(`${this.serviceUrl}/${chatId}/messages`, {
                params:{
                    fromMessageNumber,
                    messagesNumber
                }
            });
            return Promise.resolve(response.data);
        } catch (error){
            if(axios.isAxiosError(error)){
                const errorResponse: AxiosError<{error: string}> = error;
                console.log('@ 6', errorResponse)
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

    static async sendMessage(chatId: number, message: string):Promise<IMessage>{
        try {
            const response = await httpApi.post<IMessage>(`${this.serviceUrl}/${chatId}/messages`, {
                message
            });
            return Promise.resolve(response.data);
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
}