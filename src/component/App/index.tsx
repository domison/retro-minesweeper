import React, { useState, useEffect } from 'react';
import NumberDisplay from '../NumberDisplay';
import Smiley from '../Smiley';
import './App.scss';

import { generateCells } from '../../utils';
import Field from '../Field';
import { Cell, Emoji } from '../../types';

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [smiley, setSmiley] = useState<Emoji>(Emoji.reverse);
  const [time, setTime] = useState<number>(0);
  const [timeRuns, setTimeRuns] = useState<boolean>(false);

  const handleEvent = (event: React.MouseEvent): void => {
    event.preventDefault();
    if (event.type === 'mousedown') {
      setSmiley(Emoji.nervous);
    }

    if (event.type === 'mouseup') {
      setSmiley(Emoji.smile);
    }
  };
  const handleCellClick = (row_: number, col_: number) => (
    event: React.MouseEvent
  ): void => {
    if (!timeRuns) {
      setTimeRuns(true);
    }
  };

  const handleSmileyClick = (): void => {
    if (timeRuns) {
      setSmiley(Emoji.bored);
      setTimeRuns(false);
    }
    if (smiley === Emoji.bored) {
      setTimeRuns(false);
      setTime(0);
      setCells(generateCells());
      setSmiley(Emoji.reverse);
    }
  };

  useEffect(() => {
    if (timeRuns) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [timeRuns, time]);

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Field
          key={`${rowIndex}-${colIndex}`}
          row={rowIndex}
          col={colIndex}
          state={cell.state}
          value={cell.value}
          onClick={handleCellClick}
          onMouseDown={handleEvent}
          onMouseUp={handleEvent}
        />
      ))
    );
  };

  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={0} />
        <Smiley emoji={smiley} onClick={handleSmileyClick} />
        <NumberDisplay value={time} />
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default App;
