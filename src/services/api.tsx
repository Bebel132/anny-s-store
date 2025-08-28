import type { AxiosInstance } from "axios";
import axios from "axios";

const createApiInstance = (): AxiosInstance => {
    return axios.create({
        baseURL: `https://localhost:7123/`,
        withCredentials: true,
    })
}

const api = createApiInstance();

export default api;