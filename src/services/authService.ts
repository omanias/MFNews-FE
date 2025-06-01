import axiosInstance from './axiosConfig';

const AUTH_API_URL = '/users';

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

interface CreateUserData {
    email: string;
    password: string;
    role: 'user' | 'admin';
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post(`${AUTH_API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createUser = async (userData: CreateUserData) => {
    try {
        const response = await axiosInstance.post(AUTH_API_URL, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}; 