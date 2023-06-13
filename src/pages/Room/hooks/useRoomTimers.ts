import { useEffect, useRef, useState } from 'react';
import { Timers } from 'pages/Room/types';

export const useRoomTimers = (isGameStarted: boolean, currentPlayerId?: string) => {
  const intervalId = useRef<number | null>(null);
  const [roomTimers, setRoomTimers] = useState<Timers>({});

  useEffect(() => {
    if (Object.values(roomTimers).some(x => x < 1000)) {
      clearInterval(intervalId.current!);
    }
  }, [roomTimers]);

  useEffect(() => {
    if (isGameStarted && currentPlayerId) {
      intervalId.current = window.setInterval(() => {
        setRoomTimers(prev => ({
          ...prev,
          [currentPlayerId]: prev[currentPlayerId] - 1000,
        }));
      }, 1000);
    }

    return () => {
      clearInterval(intervalId.current!);
    };
  }, [currentPlayerId, isGameStarted]);

  return { roomTimers, setRoomTimers };
};
