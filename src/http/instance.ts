import axios from "axios";

const API_URl = process.env.NODE_ENV === 'production'?'http://95.31.117.107:8080/api':'http://localhost:8080/api';

export const httpApi = axios.create({
    withCredentials: true,
    baseURL: API_URl
})