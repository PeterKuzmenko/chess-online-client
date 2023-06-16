import { createContext, FC, PropsWithChildren, useContext, useEffect, useMemo } from 'react';
import { useAuthContext } from 'utils/providers/AuthProvider';
import io, { Socket } from 'socket.io-client';
import { SERVER_URL } from 'api';

type SocketContextType = {
  socket: Socket | null;
};

export const SocketContext = createContext({} as SocketContextType);
export const useSocketContext = () => useContext(SocketContext);

const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const { userId } = useAuthContext();

  const socket = useMemo(() => {
    if (userId) {
      const token = localStorage.getItem('token');

      return io(SERVER_URL, {
        query: { token },
      });
    }

    return null;
  }, [userId]);

  useEffect(
    () => () => {
      if (socket) {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('pong');
      }
    },
    [socket],
  );

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export default SocketProvider;

export * from './useSocketEmit';
export * from './events';
export * from './useSocketListener';
