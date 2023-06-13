import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { FCWithChildren } from 'types';

let storedUserId = localStorage.getItem('userId');
const expirationTimestamp = localStorage.getItem('expirationTimestamp');

if (expirationTimestamp && Date.now() > Number(expirationTimestamp)) {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationTimestamp');

  storedUserId = null;
}

type AuthContextType = {
  userId: string | null;
  setUserId: Dispatch<SetStateAction<string | null>>;
};

const AuthContext = createContext({} as AuthContextType);
export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider: FCWithChildren = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(storedUserId);

  useEffect(() => {
    if (!userId) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('expirationTimestamp');
    }
  }, [userId]);

  return <AuthContext.Provider value={{ userId, setUserId }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
