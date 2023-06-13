import { Color, FigureType } from "pages/Room/types";

export const figureColorMap = {
  [Color.White]: "white",
  [Color.Black]: "black",
};

export const figureIconMapping = {
  [FigureType.Pawn]: {
    [Color.White]: "♙",
    [Color.Black]: "♟",
  },
  [FigureType.Horse]: {
    [Color.White]: "♘",
    [Color.Black]: "♞",
  },
  [FigureType.Rook]: {
    [Color.White]: "♖",
    [Color.Black]: "♜",
  },
  [FigureType.Bishop]: {
    [Color.White]: "♗",
    [Color.Black]: "♝",
  },
  [FigureType.Queen]: {
    [Color.White]: "♕",
    [Color.Black]: "♛",
  },
  [FigureType.King]: {
    [Color.White]: "♔",
    [Color.Black]: "♚",
  },
}
