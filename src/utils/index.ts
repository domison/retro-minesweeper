import { MAX_COLS, MAX_ROWS, NO_OF_BOMBS } from '../constants';
import { Cell, CellValue, CellState } from '../types';

export const generateCells = (): Cell[][] => {
  const cells: Cell[][] = [];

  // generates all cells
  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);

    for (let col = 0; col < MAX_COLS; col++) {
      cells[row].push({
        value: CellValue.none,
        state: CellState.revealed,
      });
    }
  }

  // randomly adds bombs
  let bombsPlaced = 0;
  while (bombsPlaced < NO_OF_BOMBS) {
    const row = Math.floor(Math.random() * MAX_ROWS);
    const col = Math.floor(Math.random() * MAX_COLS);

    if (cells[row][col].value === CellValue.bomb) {
      continue;
    }
    cells[row][col].value = CellValue.bomb;
    bombsPlaced++;
  }

  return cells;
};
