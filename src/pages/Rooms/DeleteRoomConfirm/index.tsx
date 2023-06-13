import { Dispatch, FC, SetStateAction } from 'react';
import {
  DialogTitle,
  DialogContent,
  Button,
  DialogContentText,
  DialogActions,
  Dialog,
} from '@mui/material';
import { Room } from 'api/rooms/types';
import { deleteRoom } from 'api/rooms';

type DeleteRoomConfirmationProps = {
  roomId: string | null;
  close: () => void;
  setRooms: Dispatch<SetStateAction<Room[]>>;
};

const DeleteRoomConfirmation: FC<DeleteRoomConfirmationProps> = ({ roomId, close, setRooms }) => {
  const handleDeleteRoomClick = async () => {
    await deleteRoom(roomId!);

    setRooms(prev => prev.filter(x => x.id !== roomId));
    close();
  };

  return (
    <Dialog open={!!roomId} onClose={close}>
      <DialogTitle>Delete the room</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete the selected room?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={close}>
          Close
        </Button>
        <Button color="error" onClick={handleDeleteRoomClick} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteRoomConfirmation;
