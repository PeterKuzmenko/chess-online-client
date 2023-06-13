import { Cell, Color } from 'pages/Room/types';
import { BOARD_BORDER_SIZE, CELL_COUNT, CELL_SIZE } from 'pages/Room/Board/helpers/contsants';

export const forEachCell = (cb: (cell: Cell) => void) => {
  for (let y = 0; y <= 7; y++) {
    for (let x = 0; x <= 7; x++) {
      cb({ y, x });
    }
  }
};

export const isInArray = (x: number, y: number) =>
  x > BOARD_BORDER_SIZE &&
  x <= CELL_SIZE * CELL_COUNT + BOARD_BORDER_SIZE &&
  y > BOARD_BORDER_SIZE &&
  y <= CELL_SIZE * CELL_COUNT + BOARD_BORDER_SIZE;

export const getCellNumber = (offset: number) =>
  makeNumberDivisibleBy(offset - BOARD_BORDER_SIZE, CELL_SIZE) / CELL_SIZE;

export const makeNumberDivisibleBy = (num: number, dividedBy: number) => num - (num % dividedBy);

export const getAxisNumber = (num: number, opposite: boolean) => Math.abs((opposite ? 7 : 0) - num);

export const getOppositeColor = (color: Color) => [Color.Black, Color.White][color];
