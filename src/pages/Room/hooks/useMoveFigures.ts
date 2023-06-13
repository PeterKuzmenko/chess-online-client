import { useEffect, useMemo, useState } from 'react';
import { Board, Cell, Color, FigureType, PawnCanBeTurnInto } from 'pages/Room/types';
import { SocketEvent, useSocketEmit } from 'utils/providers/SocketProvider';
import { useParams } from 'react-router-dom';

export const useMoveFigures = (currentPlayerColor: Color, board?: Board) => {
  const { id } = useParams();
  const emit = useSocketEmit();

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [moveToCell, setMoveToCell] = useState<Cell | null>(null);
  const [turnPawnInto, setTurnPawnInto] = useState<PawnCanBeTurnInto | null>(null);

  const isPawnProm = useMemo(() => {
    if (board && moveToCell && selectedCell) {
      const { x, y } = selectedCell;
      const pawnPromCellY = currentPlayerColor === Color.White ? 0 : 7;

      return board[y][x]?.type === FigureType.Pawn && moveToCell.y === pawnPromCellY;
    }

    return false;
  }, [board, currentPlayerColor, moveToCell, selectedCell]);

  useEffect(() => {
    if (selectedCell && moveToCell && (!isPawnProm || turnPawnInto)) {
      emit(SocketEvent.Step, {
        from: selectedCell,
        to: moveToCell,
        roomId: id,
        turnInto: turnPawnInto,
      });
      setSelectedCell(null);
      setMoveToCell(null);
      setTurnPawnInto(null);
    }
  }, [selectedCell, moveToCell, emit, id, isPawnProm, turnPawnInto]);

  return {
    selectedCell,
    setSelectedCell,
    moveToCell,
    setMoveToCell,
    isPawnProm,
    turnPawnInto,
    setTurnPawnInto,
  };
};
