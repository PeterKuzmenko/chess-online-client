import { FC } from 'react';
import { useController } from 'react-hook-form';
import { UpdateUserInfoPayload } from 'api/players/types';
import { TextField } from '@mui/material';

const UserStatusField: FC = () => {
  const { field } = useController<UpdateUserInfoPayload, 'status'>({
    name: 'status',
  });

  return <TextField label="Status" {...field} />;
};

export default UserStatusField;
