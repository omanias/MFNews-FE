import axios from 'axios';

const NEWS_API_URL = 'http://localhost:3000/api/news';

export const getNews = async () => {
    try {
        const response = await axios.get(NEWS_API_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createNews = async (data: any) => {
    try {
        const response = await axios.post(NEWS_API_URL, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateNews = async (id: string, data: any) => {
    try {
        const response = await axios.put(`${NEWS_API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteNews = async (id: string) => {
    try {
        const response = await axios.delete(`${NEWS_API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}; 