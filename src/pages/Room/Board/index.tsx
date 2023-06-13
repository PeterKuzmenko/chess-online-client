import {
  Dispatch,
  FC,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { getAxisNumber, getCellNumber, isInArray, renderBoard } from 'pages/Room/Board/helpers';
import { Board, Cell, Color, Move } from 'pages/Room/types';
import { BOARD_SIZE } from 'pages/Room/Board/helpers/contsants';

type ChessBoardProps = {
  board: Board;
  selectedCell: Cell | null;
  setSelectedCell: Dispatch<SetStateAction<Cell | null>>;
  moveToCell: Cell | null;
  setMoveToCell: Dispatch<SetStateAction<Cell | null>>;
  isCurrentPlayerMove: boolean;
  playerColor: Color;
  lastMove: Move | null;
  disabled: boolean;
};

const ChessBoard: FC<ChessBoardProps> = ({
  board,
  setMoveToCell,
  setSelectedCell,
  selectedCell,
  moveToCell,
  isCurrentPlayerMove,
  playerColor,
  lastMove,
  disabled,
}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const opposite = useMemo(() => playerColor === Color.Black, [playerColor]);

  const chessBoardClickHandler = useCallback(
    (e: MouseEvent<HTMLCanvasElement>) => {
      if ((selectedCell && moveToCell) || !isCurrentPlayerMove || disabled) return;

      const offsetX = e.nativeEvent.offsetX;
      const offsetY = e.nativeEvent.offsetY;

      if (!isInArray(offsetX, offsetY)) return;

      const cellX = getAxisNumber(getCellNumber(offsetX), opposite);
      const cellY = getAxisNumber(getCellNumber(offsetY), opposite);

      if (selectedCell) {
        const isPossibleStep = board[selectedCell.y][selectedCell.x]?.possibleSteps.find(
          ({ x, y }) => x === cellX && y === cellY,
        );

        if (isPossibleStep) {
          return setMoveToCell({ x: cellX, y: cellY });
        }
      }

      setSelectedCell(board[cellY][cellX] ? { x: cellX, y: cellY } : null);
    },
    [
      board,
      disabled,
      isCurrentPlayerMove,
      moveToCell,
      opposite,
      selectedCell,
      setMoveToCell,
      setSelectedCell,
    ],
  );

  useEffect(() => {
    if (ref.current) {
      const canvas = ref.current;
      const context = canvas.getContext('2d');

      if (context) {
        renderBoard(context, board, selectedCell, lastMove, opposite);
      }
    }
  }, [selectedCell, board]);

  return (
    <canvas onClick={chessBoardClickHandler} width={BOARD_SIZE} height={BOARD_SIZE} ref={ref} />
  );
};

export default ChessBoard;
