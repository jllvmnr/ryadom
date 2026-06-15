import axios from 'axios';

const API_BASE_URL = 'https://moonclub.pythonanywhere.com/api/requests/'; 

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const getHelpRequests = async () => {
    try {
        const response = await apiClient.get(''); 
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении всех запросов:", error);
        throw error;
    }
};

export const createHelpRequest = async (requestData) => {
    try {
        const response = await apiClient.post('', requestData);
        return response.data;
    } catch (error) {
        console.error("Ошибка при создании запроса:", error.response?.data || error);
        throw error;
    }
};

export const updateHelpRequest = async (id, requestData) => {
    try {
        const response = await apiClient.patch(`${id}/`, requestData); 
        return response.data;
    } catch (error) {
        console.error(`Ошибка при обновлении запроса ${id}:`, error.response?.data || error);
        throw error;
    }
};

export const deleteHelpRequest = async (id) => {
    try {
        await apiClient.delete(`${id}/`);
        return true; 
    } catch (error) {
        console.error(`Ошибка при удалении запроса ${id}:`, error.response?.data || error);
        throw error;
    }
};

export async function getHelpRequestById(id) {
    const response = await fetch(`${API_BASE_URL}${id}/`);
    if (!response.ok) {
        throw new Error(`Ошибка загрузки запроса: ${response.status}`);
    }
    return response.json();
}
