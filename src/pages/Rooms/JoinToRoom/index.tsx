import { FC, useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  Button,
  DialogContentText,
  DialogActions,
  Dialog,
  TextField,
} from '@mui/material';
import { RoomCredentials } from 'pages/Rooms/types';

type JoinRoomDialogProps = {
  roomId: null | string;
  close: () => void;
  navigateToRoom: (payload: RoomCredentials) => void;
};

const JoinRoomDialog: FC<JoinRoomDialogProps> = ({ roomId, close, navigateToRoom }) => {
  const [password, setPassword] = useState('');

  const joinToRoomModalClose = () => {
    setPassword('');
    close();
  };

  return (
    <Dialog open={!!roomId} onClose={close}>
      <DialogTitle>Join to the Room</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter the password for the selected room</DialogContentText>
        <TextField
          autoFocus
          label="Password"
          fullWidth
          variant="standard"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={joinToRoomModalClose}>Cancel</Button>
        <Button disabled={!password} onClick={() => navigateToRoom({ password, roomId: roomId! })}>
          Join
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JoinRoomDialog;
