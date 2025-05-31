import axios from 'axios';

const AUTH_API_URL = 'http://localhost:3000/api/users';

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

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
        const response = await axios.post(`${AUTH_API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
}; 