import axios from 'axios';

const NEWS_API_URL = 'https://tu-backend.com/api/news';

export const getNews = async () => {
    const response = await axios.get(NEWS_API_URL);
    return response.data;
}; 