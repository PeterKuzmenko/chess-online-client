import { FC, useCallback, useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { updateUser } from 'api/players';
import { UpdateUserInfoPayload } from 'api/players/types';

import UserStatusField from 'pages/UserSettings/UserInfo/StatusField';
import UserDescriptionField from 'pages/UserSettings/UserInfo/Description';
import { useUserInfoContext } from 'utils/providers/UserInfoProvider';

const UserInfo: FC = () => {
  const { userInfo, updateUserInfo } = useUserInfoContext();
  const { description, status } = userInfo!;

  const [isSaving, setIsSaving] = useState(false);
  const formMethods = useForm<UpdateUserInfoPayload>({
    defaultValues: {
      description,
      status,
    },
  });
  const { handleSubmit, formState, reset } = formMethods;
  const { isDirty } = formState;

  useEffect(() => {
    reset({ description, status });
  }, [description, reset, status]);

  const savePersonalInfo = useCallback(
    async (payload: UpdateUserInfoPayload) => {
      setIsSaving(true);

      await updateUser(payload)
        .then(res => {
          updateUserInfo(res.data);
        })
        .catch(e => {
          alert(e.response.data.message);
        })
        .finally(() => setIsSaving(false));
    },
    [updateUserInfo],
  );

  return (
    <FormProvider {...formMethods}>
      <Stack width="100%" component="form" onSubmit={handleSubmit(savePersonalInfo)} spacing={3}>
        <Typography textAlign="center" variant="h4">
          Player info
        </Typography>
        <UserStatusField />
        <UserDescriptionField />

        {isDirty && (
          <Stack direction="row" spacing={3}>
            <Button onClick={() => reset()}>Reset</Button>
            <Button disabled={isSaving} type="submit" variant="contained">
              Save
            </Button>
          </Stack>
        )}
      </Stack>
    </FormProvider>
  );
};

export default UserInfo;
