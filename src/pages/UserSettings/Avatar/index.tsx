import { ChangeEvent, FC, useCallback } from 'react';
import { Stack, Button, Typography, Avatar } from '@mui/material';
import { uploadAvatar, removeAvatar } from 'api/players';
import { useUserInfoContext } from 'utils/providers/UserInfoProvider';
import { getImageUrl } from 'utils/helpers';

const AvatarUpload: FC = () => {
  const { userInfo, updateUserInfo } = useUserInfoContext();
  const { avatarUrl, username } = userInfo!;

  const uploadAvatarHandler = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return;

      await uploadAvatar(e.target.files as FileList)
        .then(res => {
          updateUserInfo({ avatarUrl: res.data.filePath });
        })
        .catch(e => {
          alert(e.response.data.message);
        });
    },
    [updateUserInfo],
  );

  const removeAvatarHandler = useCallback(async () => {
    await removeAvatar()
      .then(() => {
        updateUserInfo({ avatarUrl: undefined });
      })
      .catch(e => {
        alert(e.response.data.message);
      });
  }, [updateUserInfo]);

  return (
    <Stack alignItems="center" spacing={2}>
      <Avatar sx={{ width: 150, height: 150 }} alt={username} src={getImageUrl(avatarUrl)} />
      {avatarUrl ? (
        <Button onClick={removeAvatarHandler}>
          <Typography fontSize={14}>Remove avatar</Typography>
        </Button>
      ) : (
        <Button component="label">
          <input onChange={uploadAvatarHandler} style={{ display: 'none' }} type="file" />
          <Typography fontSize={14}>Upload avatar</Typography>
        </Button>
      )}
    </Stack>
  );
};

export default AvatarUpload;
