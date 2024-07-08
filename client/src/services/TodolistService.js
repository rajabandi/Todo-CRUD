
import axios from "axios";

export const TodolistService = {
    getTodos,
    createTodo,
    updateTodo,
    getTodoById,
    deleteTodo,
};

const baseUrl = 'http://localhost:8080/api/todolists';

function getTodos() {
    return axios.get(`${baseUrl}`)
};

function createTodo(data) {
    return axios.post(`${baseUrl}`, data);
};

function updateTodo(data,Id) {
    return axios.put(`${baseUrl}/${Id}`, data);
};

function getTodoById(Id) {
    return axios.get(`${baseUrl}/${Id}`);
};

function deleteTodo(Id) {
    return axios.delete(`${baseUrl}/${Id}`);
};