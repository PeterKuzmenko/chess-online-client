import { useCallback } from 'react';
import { SocketEvent, useSocketContext } from 'utils/providers/SocketProvider/index';

export const useSocketEmit = () => {
  const { socket } = useSocketContext();

  return useCallback(
    <T>(event: SocketEvent, data: T) => {
      if (socket) {
        socket.emit(event, data);
      }
    },
    [socket],
  );
};
