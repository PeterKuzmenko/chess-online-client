import { useUserInfoContext } from 'utils/providers/UserInfoProvider';
import { useEffect, useMemo, useState } from 'react';
import { Player } from 'api/players/types';
import { getPlayer } from 'api/players';
import { useAuthContext } from 'utils/providers/AuthProvider';

export const useRoomPlayersInfo = (opponentUserId: string | null): Record<string, Player> => {
  const { userId } = useAuthContext();
  const { userInfo } = useUserInfoContext();

  const [opponentInfo, setOpponentInfo] = useState<Player | null>(null);

  useEffect(() => {
    if (!opponentUserId) return;

    getPlayer(opponentUserId)
      .then(res => {
        setOpponentInfo(res.data);
      })
      .catch(null);
  }, [opponentUserId]);

  return useMemo(() => {
    if (!userInfo || !userId) return {};

    if (!opponentInfo || !opponentUserId) {
      return { [userId]: userInfo };
    }

    return {
      [userId]: userInfo,
      [opponentUserId]: opponentInfo,
    };
  }, [opponentInfo, opponentUserId, userId, userInfo]);
};
