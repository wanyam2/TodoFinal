import axios from 'axios';

const getAllTodos = async () => {
    const url = '/todos';
    const response = await axios.get(url)
    return response.data;
};

const createTodo = async (todo) => {
    const url = '/todos';
    const response = await axios.post(url, todo);
    return response.data;
};

const updateTodo = async (id, updatedTodo) => {
    const url = '/todos/' + id;
    const response = await axios.patch(url, updatedTodo);
    return response.data;
};

const deleteTodo = async (id) => {
    const url = '/todos/' + id;
    const response = await axios.delete(url);
    return response.data;
};

export const TodoAPI = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
}