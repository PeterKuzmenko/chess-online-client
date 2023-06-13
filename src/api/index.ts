import axios from 'axios';

const token = localStorage.getItem('token');

export const API_URL = process.env.REACT_APP_API_URL;
export const api = axios.create({
  baseURL: API_URL,
  headers: token
    ? {
        'Authorization': `Bearer ${token}`,
      }
    : undefined,
});
