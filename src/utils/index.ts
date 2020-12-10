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
        state: CellState.hidden,
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

  // calculates bombs in direct neighborhood, adds number of bombs as CellValue
  for (let row = 0; row < MAX_ROWS; row++) {
    for (let col = 0; col < MAX_COLS; col++) {
      const currentCell = cells[row][col];

      if (currentCell.value === CellValue.bomb) {
        continue;
      }

      let numberOfBombs = checkDirectNeighborhood(cells, col, row);
      currentCell.value = numberOfBombs;
    }
  }
  return cells;
};

function checkDirectNeighborhood(
  cells: Cell[][],
  col: number,
  row: number
): number {
  let numberOfBombs = 0;

  const topLeft = row > 0 && col > 0 ? cells[row - 1][col - 1] : null;
  const top = row > 0 ? cells[row - 1][col] : null;
  const topRight =
    row > 0 && col < MAX_COLS - 1 ? cells[row - 1][col + 1] : null;
  const left = col > 0 ? cells[row][col - 1] : null;
  const right = col < MAX_COLS - 1 ? cells[row][col + 1] : null;
  const bottomLeft =
    row < MAX_ROWS - 1 && col > 0 ? cells[row + 1][col - 1] : null;
  const bottom = row < MAX_ROWS - 1 ? cells[row + 1][col] : null;
  const bottomRight =
    row < MAX_ROWS - 1 && col < MAX_COLS - 1 ? cells[row + 1][col + 1] : null;
  const hood = [
    topLeft,
    top,
    topRight,
    left,
    right,
    bottomLeft,
    bottom,
    bottomRight,
  ];

  hood.forEach((bomb) => {
    if (bomb?.value === CellValue.bomb) {
      numberOfBombs++;
    }
  });

  return numberOfBombs;
}
