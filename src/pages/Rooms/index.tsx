import { FC, useEffect, useState } from 'react';
import { getRooms } from 'api/rooms';
import { Room } from 'api/rooms/types';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  IconButton,
  Stack,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import DeleteIcon from '@mui/icons-material/Delete';

import AddRoomDialog from 'pages/Rooms/AddRoomDialog';
import DeleteRoomConfirmation from 'pages/Rooms/DeleteRoomConfirm';
import JoinRoomDialog from 'pages/Rooms/JoinToRoom';
import { RoomCredentials } from 'pages/Rooms/types';

const Rooms: FC = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);

  const [addRoomOpened, setAddRoomOpened] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [deleteRoomId, setDeleteRoomId] = useState<string | null>(null);

  const navigateToRoom = (room: RoomCredentials) => {
    navigate(`/rooms/${room.roomId}/${room.password}`);
  };

  const updateRooms = () => getRooms().then(setRooms).catch(null);

  useEffect(() => {
    updateRooms();
  }, []);

  return (
    <Container sx={{ pt: 5 }} maxWidth="xs">
      <Stack spacing={3}>
        <Stack mx="auto" direction="row" spacing={3}>
          <IconButton onClick={updateRooms}>
            <CachedIcon />
          </IconButton>
          <Button onClick={() => setAddRoomOpened(true)} variant="contained">
            Add a new room
          </Button>
        </Stack>

        <Stack spacing={2}>
          {rooms.map(({ id, name }) => (
            <MenuItem
              key={id}
              sx={{ border: '1px solid #00000050', borderRadius: 1 }}
              onClick={() => setSelectedRoomId(id)}
            >
              <ListItemText>{name}</ListItemText>
              <ListItemIcon>
                <IconButton
                  color="error"
                  onClick={e => {
                    e.stopPropagation();
                    setDeleteRoomId(id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemIcon>
            </MenuItem>
          ))}
        </Stack>
      </Stack>

      <AddRoomDialog
        opened={addRoomOpened}
        close={() => setAddRoomOpened(false)}
        navigateToRoom={navigateToRoom}
      />
      <DeleteRoomConfirmation
        roomId={deleteRoomId}
        close={() => setDeleteRoomId(null)}
        setRooms={setRooms}
      />
      <JoinRoomDialog
        roomId={selectedRoomId}
        close={() => setSelectedRoomId(null)}
        navigateToRoom={navigateToRoom}
      />
    </Container>
  );
};

export default Rooms;
