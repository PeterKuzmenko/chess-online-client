import { SERVER_URL } from 'api';

export const getImageUrl = (path?: string) => path && `${SERVER_URL}${path}`;

export const toMMSS = (timeInMs: number) => {
  const totalSeconds = Math.floor(timeInMs / 1000);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};
