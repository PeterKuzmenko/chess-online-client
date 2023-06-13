import { api } from 'api';
import { GetRoomsResponse, Room } from './types';

export const getRooms = async () => {
  return await api.get<GetRoomsResponse>('/rooms').then(res => res.data?.rooms ?? []);
};

export const addRoom = (name: string, password: string) =>
  api.post<Room>('/rooms', { name, password });

export const deleteRoom = (id: string) => api.post('/rooms/deleteRoom', { id }).catch(null);
