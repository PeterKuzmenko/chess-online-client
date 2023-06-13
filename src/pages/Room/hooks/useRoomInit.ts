import { useEffect } from 'react';
import { SocketEvent, useSocketEmit } from 'utils/providers/SocketProvider';
import { useParams } from 'react-router-dom';

export const useRoomInit = () => {
  const { id, password } = useParams();

  const emit = useSocketEmit();

  useEffect(() => {
    if (id && password) {
      emit(SocketEvent.JoinRoom, { roomId: id, password });
    }
  }, [emit, id, password]);
};
