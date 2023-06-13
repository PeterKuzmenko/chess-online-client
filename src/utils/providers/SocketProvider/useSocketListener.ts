import { SocketEvent, useSocketContext } from 'utils/providers/SocketProvider/index';
import { useEffect } from 'react';

export const useSocketListener = <T>(event: SocketEvent, callback: (res: T) => void) => {
  const { socket } = useSocketContext();

  useEffect(() => {
    if (socket) {
      socket.on(event, callback);

      return () => {
        socket.off(event, callback);
      };
    }
  }, [socket, event, callback]);
};
