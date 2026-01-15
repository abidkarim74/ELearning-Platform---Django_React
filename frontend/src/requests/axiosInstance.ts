import axios from "axios";
import { type AxiosInstance } from "axios";


const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});


export default api;