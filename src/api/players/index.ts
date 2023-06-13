import { api } from 'api';
import { Player, UpdateUserInfoPayload, UploadAvatarResponse } from './types';

export const getPlayer = (id: string) => api.get<Player>(`/players/${id}`);

export const updateUser = (body: UpdateUserInfoPayload) => {
  return api.patch('/players/update', body);
};

export const uploadAvatar = (fileList: FileList) => {
  const [file] = fileList;
  const formData = new FormData();
  formData.append('avatar', file);

  return api.post<UploadAvatarResponse>('/players/uploadAvatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const removeAvatar = () => api.delete('/players/removeAvatar');

export const changeUsername = (username: string) =>
  api.patch('/players/changeUsername', { username });
