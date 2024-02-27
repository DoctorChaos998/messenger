import axios from "axios";

const API_URl = process.env.NODE_ENV === 'production'?'https://ocsearch.ru/api':'http://localhost:5000/api';

export const httpApi = axios.create({
    withCredentials: true,
    baseURL: API_URl
})