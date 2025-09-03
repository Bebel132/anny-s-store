import type { AxiosInstance } from "axios";
import axios from "axios";

const createApiInstance = (): AxiosInstance => {
    return axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true,
    })
}

const api = createApiInstance();

export default api;