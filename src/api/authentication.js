import { post } from './fetch';

export const login = (email, password) => {
    return post('/users/login', { email, password });
};

export const createAccount = (email, password) => {
    return post('/users/register', { email, password });
};