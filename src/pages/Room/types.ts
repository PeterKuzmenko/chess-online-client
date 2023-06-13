export type Cell = {
  x: number;
  y: number;
};

export enum Color {
  White,
  Black,
}

export enum FigureType {
  Pawn,
  Horse,
  Rook,
  Bishop,
  Queen,
  King,
}

export type PawnCanBeTurnInto =
  | FigureType.Horse
  | FigureType.Rook
  | FigureType.Bishop
  | FigureType.Queen;

export type Figure = {
  color: Color;
  type: FigureType;
  possibleSteps: Cell[];
};

export type Board = (Figure | null)[][];

export type Move = {
  from: Cell;
  to: Cell;
};

export type Timers = Record<string, number>;

export type UpdateBoardMessage = {
  board: Board;
  defeatedFigures: Record<Color, FigureType[]>;
  currentPlayerId: string;
  lastMove: Move;
  timers: Timers;
  gameStarted: boolean;
};

export type GameState = Omit<UpdateBoardMessage, 'timers'>;

export type GameOverMessage = {
  winnerUserId: string | null;
};

export type RoomInfoMessage = {
  playersColors: Record<string, Color>;
};
