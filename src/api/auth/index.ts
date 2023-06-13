import { api } from 'api';
import { AxiosResponse } from 'axios';

type AuthPayload = {
  username: string;
  password: string;
};

type AuthResponse = {
  token: string;
  userId: string;
};

const storeToken = ({ data: { token, userId } }: AxiosResponse<AuthResponse>) => {
  const expirationTimestamp = Date.now() + 24 * 60 * 60 * 1000;

  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
  localStorage.setItem('expirationTimestamp', expirationTimestamp.toString());

  return userId;
};

export const login = (payload: AuthPayload) => {
  return api.post('auth/login', payload).then(storeToken);
};

export const register = (payload: AuthPayload) => {
  return api.post('auth/registration', payload).then(storeToken);
};
