import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Player } from 'api/players/types';
import { useAuthContext } from 'utils/providers/AuthProvider';
import { getPlayer } from 'api/players';
import { FCWithChildren } from 'types';

type UserInfoContextType = {
  userInfo: Player | null;
  updateUserInfo: (payload: Partial<Player>) => void;
};

const UserInfoContext = createContext({} as UserInfoContextType);
export const useUserInfoContext = () => useContext(UserInfoContext);

const storedUserInfo: Player | null = JSON.parse(localStorage.getItem('userInfo') ?? 'null');

const UserInfoContextProvider: FCWithChildren = ({ children }) => {
  const { userId, setUserId } = useAuthContext();
  const [userInfo, setUserInfo] = useState<Player | null>(storedUserInfo);

  const updateUserInfo = useCallback(
    (payload: Partial<Player>) => {
      if (userInfo) {
        setUserInfo({ ...userInfo, ...payload });
      }
    },
    [userInfo],
  );

  useEffect(() => {
    if (!userId) return;

    getPlayer(userId)
      .then(res => {
        localStorage.setItem('userInfo', JSON.stringify(res.data));

        setUserInfo(res.data);
      })
      .catch(() => {
        alert('User is not found, please re-login');
        setUserId(null);
      });
  }, [setUserId, userId]);

  return (
    <UserInfoContext.Provider value={{ userInfo, updateUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoContextProvider;
