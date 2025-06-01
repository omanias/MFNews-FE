import axios from 'axios';
import { viteEnv } from '../config/vite-env';

const axiosInstance = axios.create({
    baseURL: viteEnv.VITE_API_BASE_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem(viteEnv.VITE_AUTH_TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            sessionStorage.clear();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 