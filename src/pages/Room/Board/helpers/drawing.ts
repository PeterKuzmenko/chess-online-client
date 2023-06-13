import { Board, Cell, Move } from 'pages/Room/types';
import { forEachCell, getAxisNumber } from 'pages/Room/Board/helpers/common';
import { figureColorMap, figureIconMapping } from 'pages/Room/Board/mappings';
import {
  BOARD_BORDER_SIZE,
  BOARD_SIZE,
  CELL_SIZE,
  FIRST_CELL_COLOR,
  SECOND_CELL_COLOR,
} from 'pages/Room/Board/helpers/contsants';

const drawBorderForBoard = (ctx: CanvasRenderingContext2D, opposite: boolean) => {
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);
  ctx.fillStyle = '#e6bb7c';
  ctx.fillRect(28, 28, 324, 324);

  const startNumber = opposite ? 9 : 0;

  ctx.fillStyle = '#e6bb7c';
  ctx.font = 'bold 30px serif';

  for (let i = 8; i >= 1; i--) {
    ctx.fillText(Math.abs(startNumber - i).toString(), 5, CELL_SIZE * 9 - i * CELL_SIZE + 20);
    ctx.fillText(
      Math.abs(startNumber - i).toString(),
      CELL_SIZE * 9,
      CELL_SIZE * 9 - i * CELL_SIZE + 20,
    );
  }

  for (let i = 0; i < 8; i++) {
    const charCode = 65 + getAxisNumber(i, opposite);

    ctx.fillText(String.fromCharCode(charCode), i * CELL_SIZE + CELL_SIZE, 25);
    ctx.fillText(String.fromCharCode(charCode), i * CELL_SIZE + CELL_SIZE, CELL_SIZE * 9 + 17);
  }
};

const drawCells = (ctx: CanvasRenderingContext2D) => {
  let color = FIRST_CELL_COLOR;

  for (let i = 0; i < 8; i++) {
    if (color === FIRST_CELL_COLOR) color = SECOND_CELL_COLOR;
    else color = FIRST_CELL_COLOR;

    for (let y = 0; y < 8; y++) {
      if (color === SECOND_CELL_COLOR) color = FIRST_CELL_COLOR;
      else color = SECOND_CELL_COLOR;

      ctx.fillStyle = color;
      ctx.fillRect(
        i * CELL_SIZE + BOARD_BORDER_SIZE,
        y * CELL_SIZE + BOARD_BORDER_SIZE,
        CELL_SIZE,
        CELL_SIZE,
      );
    }
  }
};

const drawFigures = (ctx: CanvasRenderingContext2D, board: Board, opposite: boolean) => {
  forEachCell(({ x, y }) => {
    const figure = board[y][x];

    if (figure) {
      ctx.fillStyle = figureColorMap[figure.color];
      ctx.font = 'bold 40px serif';
      ctx.fillText(
        figureIconMapping[figure.type][figure.color],
        getAxisNumber(x, opposite) * CELL_SIZE + 29,
        (getAxisNumber(y, opposite) + 1) * CELL_SIZE + 25,
      );
    }
  });
};

const drawPossibleStepsHighlight = (
  ctx: CanvasRenderingContext2D,
  board: Board,
  selectedCell: Cell | null,
  opposite: boolean,
) => {
  if (selectedCell) {
    const selectedFigureCell = board[selectedCell.y][selectedCell.x];
    if (!selectedFigureCell) return;

    selectedFigureCell.possibleSteps.forEach(cell => {
      drawCellHighlight(ctx, opposite, cell);
    });
  }
};

const drawLastMove = (ctx: CanvasRenderingContext2D, lastMove: Move | null, opposite: boolean) => {
  if (lastMove) {
    drawCellHighlight(ctx, opposite, lastMove.from, 'rgba(129,255,236, 0.5)');
    drawCellHighlight(ctx, opposite, lastMove.to, 'rgb(129,255,236, 0.5)');
  }
};

const drawCellHighlight = (
  ctx: CanvasRenderingContext2D,
  opposite: boolean,
  cell?: Cell,
  color = 'rgba(124,252,0, 0.8)',
) => {
  if (cell) {
    ctx.fillStyle = color;
    ctx.fillRect(
      getAxisNumber(cell.x, opposite) * CELL_SIZE + BOARD_BORDER_SIZE,
      getAxisNumber(cell.y, opposite) * CELL_SIZE + BOARD_BORDER_SIZE,
      CELL_SIZE,
      CELL_SIZE,
    );
  }
};

export const renderBoard = (
  ctx: CanvasRenderingContext2D,
  board: Board,
  selectedCell: Cell | null,
  lastMove: Move | null,
  opposite: boolean,
) => {
  drawBorderForBoard(ctx, opposite);
  drawCells(ctx);
  drawLastMove(ctx, lastMove, opposite);
  drawFigures(ctx, board, opposite);
  drawPossibleStepsHighlight(ctx, board, selectedCell, opposite);
};
