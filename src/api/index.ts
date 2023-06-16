import axios from 'axios';

const token = localStorage.getItem('token');

export const SERVER_URL = process.env.REACT_APP_SERVER_URL ?? '';
export const API_URL = SERVER_URL + '/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: token
    ? {
        'Authorization': `Bearer ${token}`,
      }
    : undefined,
});
