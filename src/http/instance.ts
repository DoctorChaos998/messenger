import axios from "axios";

const API_URl = process.env.NODE_ENV === 'production'?'localhost:8080/api':'localhost:8080/api';

export const httpApi = axios.create({
    withCredentials: true,
    baseURL: API_URl
})