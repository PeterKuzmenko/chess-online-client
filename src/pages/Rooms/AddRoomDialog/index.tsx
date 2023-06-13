import { FC, useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  Button,
  Stack,
  DialogContentText,
  TextField,
  DialogActions,
  Dialog,
} from '@mui/material';
import { addRoom } from 'api/rooms';
import { RoomCredentials } from 'pages/Rooms/types';

type AddRoomDialogProps = {
  opened: boolean;
  close: () => void;
  navigateToRoom: (payload: RoomCredentials) => void;
};

const AddRoomDialog: FC<AddRoomDialogProps> = ({ opened, close, navigateToRoom }) => {
  const [newRoom, setNewRoom] = useState({ password: '', name: '' });

  const handleAddRoomClick = async () => {
    if (newRoom.name && newRoom.password) {
      addRoom(newRoom.name, newRoom.password).then(res => {
        navigateToRoom({ roomId: res.data.id, password: newRoom.password });
      });

      close();
    }
  };

  return (
    <Dialog open={opened} onClose={close}>
      <DialogTitle>New Room</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <DialogContentText>Create name and password for the new room</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
            value={newRoom.name}
            onChange={e => setNewRoom(prev => ({ ...prev, name: e.target.value }))}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            fullWidth
            variant="standard"
            value={newRoom.password}
            onChange={e => setNewRoom(prev => ({ ...prev, password: e.target.value }))}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button disabled={!newRoom.name || !newRoom.password} onClick={handleAddRoomClick}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRoomDialog;
