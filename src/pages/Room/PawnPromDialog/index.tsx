import { FC, useState } from 'react';
import {
  Box,
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from '@mui/material';
import { Color, FigureType, PawnCanBeTurnInto } from 'pages/Room/types';
import { figureIconMapping } from 'pages/Room/Board/mappings';

const figuresPawnCanBeTurnInto: PawnCanBeTurnInto[] = [
  FigureType.Horse,
  FigureType.Rook,
  FigureType.Bishop,
  FigureType.Queen,
];

type PawnPromDialogProps = {
  playerColor: Color;
  opened: boolean;
  setPawnTurnInto: (type: PawnCanBeTurnInto) => void;
};

const PawnPromDialog: FC<PawnPromDialogProps> = ({ setPawnTurnInto, playerColor, opened }) => {
  const [selected, setSelected] = useState<PawnCanBeTurnInto | null>(null);

  const promote = () => selected && setPawnTurnInto(selected);

  return (
    <Dialog open={opened}>
      <DialogTitle>Select figure you want your pawn turn into</DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={3} justifyContent="center">
          {figuresPawnCanBeTurnInto.map(x => (
            <Box
              key={x}
              onClick={() => setSelected(x)}
              sx={{
                cursor: 'pointer',
                width: 80,
                height: 80,
                fontSize: 40,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: '0.3s',

                border: selected === x ? '1px solid #036ffc' : '1px solid transparent',
                background: selected === x ? '#00a2ff30' : 'none',
                '&:hover': {
                  background: '#00a2ff40',
                },
              }}
            >
              {figureIconMapping[x][playerColor]}
            </Box>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={promote} variant="contained" disabled={!selected}>
          Promote
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PawnPromDialog;
