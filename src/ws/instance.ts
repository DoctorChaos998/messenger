import UserService from "@/http/userService/userService";

export default class WsApi{
    public static wsApi: WebSocket;

    static connect(){
        this.wsApi = new WebSocket(`ws://localhost:8080/api/notification?accessToken=${UserService.getAccessToken()}`);
    }
    static disconnect(){
        this.wsApi.close();
    }
}