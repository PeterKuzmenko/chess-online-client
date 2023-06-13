import { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Stack } from '@mui/material';
import { SocketEvent, useSocketListener } from 'utils/providers/SocketProvider';
import {
  Color,
  GameOverMessage,
  GameState,
  RoomInfoMessage,
  UpdateBoardMessage,
} from 'pages/Room/types';
import ChessBoard from 'pages/Room/Board';

import { useAuthContext } from 'utils/providers/AuthProvider';
import { useMoveFigures, useRoomInit, useRoomPlayersInfo, useRoomTimers } from 'pages/Room/hooks';
import PlayerSide from 'pages/Room/PlayerSide';
import { BOARD_SIZE } from 'pages/Room/Board/helpers';
import PawnPromDialog from 'pages/Room/PawnPromDialog';

const Room: FC = () => {
  useRoomInit();

  const { userId } = useAuthContext();
  const navigate = useNavigate();

  const [playerColor, setPlayerColor] = useState<Color>(Color.White);
  const [opponentPlayerColor, setOpponentPlayerColor] = useState<Color>(Color.White);
  const [gameState, setGameState] = useState<GameState | null>();
  const [opponentUserId, setOpponentUserId] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const { roomTimers, setRoomTimers } = useRoomTimers(
    !!gameState?.gameStarted,
    gameState?.currentPlayerId,
  );
  const { isPawnProm, turnPawnInto, setTurnPawnInto, ...moveFiguresState } = useMoveFigures(
    playerColor,
    gameState?.board,
  );
  const playersInfo = useRoomPlayersInfo(opponentUserId);

  const updateCallback = useCallback(
    ({ timers, ...rest }: UpdateBoardMessage) => {
      setGameState(rest);
      setRoomTimers(timers);
    },
    [setRoomTimers],
  );

  const joinRoomWrongPasswordCallback = useCallback(() => {
    alert('Wrong password!');
    navigate('/');
  }, [navigate]);

  const gameOverCallback = useCallback(
    ({ winnerUserId }: GameOverMessage) => {
      alert(winnerUserId === userId ? 'You won!' : 'You loose');
      setIsGameOver(true);
      // navigate('/');
    },
    [userId],
  );

  const roomInfoCallback = useCallback(
    ({ playersColors }: RoomInfoMessage) => {
      setPlayerColor(playersColors[userId ?? '']);

      const opponentUserId = Object.keys(playersColors).find(x => x !== userId) ?? '';
      setOpponentPlayerColor(playersColors[opponentUserId]);
      setOpponentUserId(opponentUserId);
    },
    [userId],
  );

  const roomNotFoundCallback = useCallback(() => {
    alert('Room does not exist!');
    navigate('/');
  }, [navigate]);

  useSocketListener(SocketEvent.Update, updateCallback);
  useSocketListener(SocketEvent.RoomInfo, roomInfoCallback);
  useSocketListener(SocketEvent.JoinRoomWrongPassword, joinRoomWrongPasswordCallback);
  useSocketListener(SocketEvent.RoomDoesNotExist, roomNotFoundCallback);
  useSocketListener(SocketEvent.GameOver, gameOverCallback);

  if (!gameState || !opponentUserId) return null;

  const { board, currentPlayerId, lastMove, gameStarted } = gameState;

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', pt: 5 }}>
      <Stack width={BOARD_SIZE}>
        <PlayerSide
          player={playersInfo[opponentUserId]}
          isPlayerMove={currentPlayerId === opponentUserId}
          isGameStarted={gameStarted}
          time={roomTimers[opponentUserId]}
          gainedFigures={gameState?.defeatedFigures[opponentPlayerColor]}
          gainedFiguresColor={opponentPlayerColor}
        />
        <ChessBoard
          disabled={isGameOver}
          playerColor={playerColor}
          lastMove={lastMove}
          board={board}
          isCurrentPlayerMove={currentPlayerId === userId}
          {...moveFiguresState}
        />
        <PlayerSide
          player={playersInfo[userId!]}
          isPlayerMove={currentPlayerId === userId}
          isGameStarted={gameStarted}
          time={roomTimers[userId!]}
          gainedFigures={gameState?.defeatedFigures[playerColor]}
          gainedFiguresColor={playerColor}
        />
      </Stack>

      <PawnPromDialog
        opened={isPawnProm}
        setPawnTurnInto={setTurnPawnInto}
        playerColor={playerColor}
      />
    </Container>
  );
};

export default Room;
