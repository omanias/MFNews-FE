import axiosInstance from './axiosConfig';

const NEWS_API_URL = '/news';

export const getNews = async () => {
    try {
        const response = await axiosInstance.get(NEWS_API_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchNews = async (query: string) => {
    try {
        const response = await axiosInstance.get(`${NEWS_API_URL}/search`, {
            params: { q: query }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createNews = async (data: any, imageFile?: File) => {
    try {
        const formData = new FormData();

        Object.keys(data).forEach(key => {
            if (key !== 'image_url') {
                formData.append(key, data[key]);
            }
        });

        if (imageFile) {
            formData.append('image', imageFile);
        }

        const response = await axiosInstance.post(NEWS_API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateNews = async (id: string, data: any, imageFile?: File) => {
    try {
        const formData = new FormData();

        Object.keys(data).forEach(key => {
            if (key !== 'image_url') {
                formData.append(key, data[key]);
            }
        });

        if (imageFile) {
            formData.append('image', imageFile);
        }

        const response = await axiosInstance.put(`${NEWS_API_URL}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteNews = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`${NEWS_API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}; 