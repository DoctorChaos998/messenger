import UserService from "@/http/userService/userService";

export default class WsApi{
    public static wsApi: WebSocket;

    static connect(){
        this.wsApi = new WebSocket(`ws://95.31.117.107:8080/api/notification?accessToken=${UserService.getAccessToken()}`);
    }
    static disconnect(){
        this.wsApi.close();
    }
}