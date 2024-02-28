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
}