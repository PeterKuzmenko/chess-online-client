import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Stack } from '@mui/material';

import { useUserInfoContext } from 'utils/providers/UserInfoProvider';

import AvatarUpload from 'pages/UserSettings/Avatar';
import UserInfo from 'pages/UserSettings/UserInfo';
import Username from 'pages/UserSettings/Username';

const PlayerPage: FC = () => {
  const { userInfo } = useUserInfoContext();

  if (!userInfo) return <Navigate to="/" />;

  return (
    <Container sx={{ pt: 5 }} maxWidth="md">
      <Stack direction="row" spacing={10}>
        <AvatarUpload />
        <Stack spacing={3} width="100%">
          <Username />
          <UserInfo />
        </Stack>
      </Stack>
    </Container>
  );
};

export default PlayerPage;
