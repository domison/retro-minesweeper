import React, { useState, useEffect } from 'react';
import NumberDisplay from '../NumberDisplay';
import Smiley from '../Smiley';
import './App.scss';

import { generateCells, openMultipleCells } from '../../utils';
import Field from '../Field';
import { Background, Cell, CellState, CellValue, Emoji } from '../../types';
import { MAX_COLS, MAX_ROWS } from '../../constants';

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [smiley, setSmiley] = useState<Emoji>(Emoji.reverse);
  const [time, setTime] = useState<number>(0);
  const [timeRuns, setTimeRuns] = useState<boolean>(false);
  const [flags, setFlags] = useState<number>(10);
  const [hasLost, setHasLost] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);

  // TODO: Test win condition and scenario
  // TODO: Refactor code: Custom hooks, more DRY, faster function, more components
  // TODO: Rethink state management
  // TODO: Add high score pane
  // TODO: Add difficulties
  // TODO: Add Option tab
  // TODO: Implement React Router for Menu

  const handleEvent = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    event.preventDefault();
    if (event.type === 'mousedown' && !(smiley === Emoji.angry)) {
      setSmiley(Emoji.nervous);
    }

    if (event.type === 'mouseup' && !(smiley === Emoji.angry)) {
      setSmiley(Emoji.smile);
    }
  };

  const handleCellClick = (row_: number, col_: number) => (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    event.preventDefault();

    const clickedCell = cells[row_][col_];

    if (clickedCell.state !== CellState.hidden || hasLost) {
      return;
    }

    if (!timeRuns) {
      setTimeRuns(true);
    }

    let newCells = cells.slice();

    if (clickedCell.value === CellValue.bomb) {
      setHasLost(true);
      newCells[row_][col_].bgColor = Background.red;
      newCells = showAllBombs();
      setCells(newCells);
      return;
    } else if (clickedCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, row_, col_);
      return;
    } else {
      newCells[row_][col_].state = CellState.revealed;
    }

    // Check to see if you have won
    let safeOpenCellsExists = false;
    for (let row = 0; row < MAX_ROWS; row++) {
      for (let col = 0; col < MAX_COLS; col++) {
        const currentCell = newCells[row][col];

        if (
          currentCell.value !== CellValue.bomb &&
          currentCell.state === CellState.hidden
        ) {
          safeOpenCellsExists = true;
          break;
        }
      }
    }

    if (!safeOpenCellsExists) {
      newCells = newCells.map((row) =>
        row.map((cell) => {
          if (cell.value === CellValue.bomb) {
            return {
              ...cell,
              state: CellState.flagged,
            };
          }
          return cell;
        })
      );
      setHasWon(true);
    }

    setCells(newCells);
  };

  const handleCellContext = (row_: number, col_: number) => (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    event.preventDefault();

    if (flags < 1) {
      return;
    }

    if (!timeRuns) {
      setTimeRuns(true);
    }

    const newCells = cells.slice();
    const clickedCell = cells[row_][col_];

    if (clickedCell.state === CellState.revealed) {
      return;
    }

    if (clickedCell.state === CellState.flagged) {
      newCells[row_][col_].state = CellState.hidden;
      setFlags(flags + 1);
    } else {
      newCells[row_][col_].state = CellState.flagged;
      setFlags(flags - 1);
    }
    setCells(newCells);
  };

  const handleSmileyClick = (): void => {
    if (timeRuns) {
      setSmiley(Emoji.bored);
      setTimeRuns(false);
    }
    if (smiley === Emoji.bored || hasLost || hasWon) {
      setTimeRuns(false);
      setTime(0);
      setFlags(10);
      setCells(generateCells());
      setHasLost(false);
      setHasWon(false);
      setSmiley(Emoji.reverse);
    }
  };

  useEffect(() => {
    if (timeRuns && time < 999) {
      const timer = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [timeRuns, time]);

  useEffect(() => {
    if (hasLost) {
      setSmiley(Emoji.angry);
      setTimeRuns(false);
    }
  }, [hasLost]);

  useEffect(() => {
    if (hasWon) {
      setSmiley(Emoji.cool);
      setTimeRuns(false);
    }
  }, [hasWon]);

  const renderCells = (): React.ReactNode => {
    // let winCount = 0;
    // let probeWin = 0;

    const newCells = cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        // if (cell.value === 0) {
        //   winCount++;
        // }
        // if (
        //   cell.value === CellValue.none &&
        //   cell.state === CellState.revealed
        // ) {
        //   probeWin++;
        // }

        return (
          <Field
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            state={cell.state}
            value={cell.value}
            bgColor={cell.bgColor}
            onClick={handleCellClick}
            onContextMenu={handleCellContext}
            onMouseDown={handleEvent}
            onMouseUp={handleEvent}
          />
        );
      })
    );
    // if (winCount === probeWin) {
    //   setHasWon(true);
    // }
    return newCells;
  };

  const showAllBombs = (): Cell[][] => {
    const currentCells = cells.slice();
    return currentCells.map((row) =>
      row.map((cell) => {
        if (cell.value === CellValue.bomb && cell.state === CellState.flagged) {
          cell = {
            ...cell,
            bgColor: Background.green,
          };
        }

        if (cell.value === CellValue.bomb) {
          cell = { ...cell, state: CellState.revealed };
        }

        return cell;
      })
    );
  };

  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={flags} />
        <Smiley emoji={smiley} onClick={handleSmileyClick} />
        <NumberDisplay value={time} />
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default App;
