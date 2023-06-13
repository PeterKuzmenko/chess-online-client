import { FC } from 'react';
import { useController } from 'react-hook-form';
import { UpdateUserInfoPayload } from 'api/players/types';
import { TextField } from '@mui/material';

const UserDescriptionField: FC = () => {
  const { field } = useController<UpdateUserInfoPayload, 'description'>({
    name: 'description',
  });

  return <TextField rows={5} multiline label="About yourself" {...field} />;
};

export default UserDescriptionField;
