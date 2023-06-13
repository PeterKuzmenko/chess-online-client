import { FC } from 'react';
import { Player } from 'api/players/types';
import { Avatar, Stack, Tooltip, Typography } from '@mui/material';
import { getImageUrl, toMMSS } from 'utils/helpers';
import { useAuthContext } from 'utils/providers/AuthProvider';
import { Color, FigureType } from 'pages/Room/types';
import { figureIconMapping } from 'pages/Room/Board/mappings';

type PlayerSideProps = {
  player?: Player;
  time: number;
  isPlayerMove: boolean;
  isGameStarted: boolean;
  gainedFigures?: FigureType[];
  gainedFiguresColor: Color;
};

const PlayerSide: FC<PlayerSideProps> = ({
  player,
  time,
  isPlayerMove,
  isGameStarted,
  gainedFigures,
  gainedFiguresColor,
}) => {
  const { userId } = useAuthContext();

  return (
    <Stack p={1} spacing={1} direction="row" alignItems="center">
      <Tooltip
        sx={{ cursor: 'pointer' }}
        title={player?.userId === userId ? 'You' : player?.username}
      >
        <Avatar alt={player?.username} src={getImageUrl(player?.avatarUrl)} />
      </Tooltip>
      {gainedFigures && (
        <Stack direction="row" spacing="-6px">
          {gainedFigures.map(x => (
            <Typography>{figureIconMapping[x][gainedFiguresColor]}</Typography>
          ))}
        </Stack>
      )}
      <Typography
        sx={{
          ml: 'auto !important',
          fontWeight: time < 60000 ? 'bold' : 'normal',
          color: isPlayerMove && isGameStarted ? '#ea5555' : '#736969',
          transform: isPlayerMove && isGameStarted ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.3s ease-in-out',
          fontSize: '20px',
        }}
      >
        {toMMSS(time)}
      </Typography>
    </Stack>
  );
};

export default PlayerSide;
