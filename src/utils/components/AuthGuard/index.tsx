import { FC, ReactNode } from 'react';
import { useAuthContext } from 'utils/providers/AuthProvider';
import { Navigate } from 'react-router-dom';

type AuthGuardProps = {
  reversed?: boolean;
  children: ReactNode;
};

const AuthGuard: FC<AuthGuardProps> = ({ reversed, children }) => {
  const { userId } = useAuthContext();

  if (reversed ? userId : !userId) {
    return <Navigate to={reversed ? '/' : '/login'} />;
  }

  return <>{children}</>;
};

export default AuthGuard;
