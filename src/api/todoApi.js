import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // 변경

export const TodoAPI = {
    getAllTodos: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/todos`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch todos:', error);
            throw error;
        }
    },

    createTodo: async (todo) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/todos`, todo);
            return response.data;
        } catch (error) {
            console.error('Failed to create todo:', error);
            throw error;
        }
    },

    updateTodo: async (id, updatedTodo) => {
        try {
            const response = await axios.patch(`${API_BASE_URL}/todos/${id}`, updatedTodo);
            return response.data;
        } catch (error) {
            console.error('Failed to update todo:', error);
            throw error;
        }
    },

    deleteTodo: async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/todos/${id}`);
        } catch (error) {
            console.error('Failed to delete todo:', error);
            throw error;
        }
    }
};
