import { FC, FormEvent, useCallback, useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { changeUsername } from 'api/players';
import { useUserInfoContext } from 'utils/providers/UserInfoProvider';

const Username: FC = () => {
  const { userInfo, updateUserInfo } = useUserInfoContext();
  const { username: currentUsername } = userInfo!;

  const [isSaving, setIsSaving] = useState(false);
  const [username, setUsername] = useState(currentUsername);
  const isDirty = currentUsername !== username;

  const changeUsernameHandler = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      setIsSaving(true);
      await changeUsername(username)
        .then(() => {
          updateUserInfo({ username });
        })
        .catch(e => {
          alert(e.response.data.message);
        })
        .finally(() => setIsSaving(false));
    },
    [updateUserInfo, username],
  );

  return (
    <Stack component="form" onSubmit={changeUsernameHandler} width="100%" spacing={3}>
      <Typography textAlign="center" variant="h4">
        Username
      </Typography>
      <TextField
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        label="Username"
      />

      {isDirty && (
        <Stack direction="row" spacing={3}>
          <Button onClick={() => setUsername(currentUsername)}>Reset</Button>
          <Button disabled={!username || isSaving} type="submit" variant="contained">
            Save
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default Username;
