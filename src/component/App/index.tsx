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

  const handleEvent = (event: React.MouseEvent): void => {
    event.preventDefault();
    if (event.type === 'mousedown') {
      setSmiley(Emoji.nervous);
    }

    if (event.type === 'mouseup') {
      setSmiley(Emoji.smile);
    }
  };

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Field
          key={`${rowIndex}-${colIndex}`}
          row={rowIndex}
          col={colIndex}
          state={cell.state}
          value={cell.value}
          onClick={(e) => handleEvent(e)}
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
        <Smiley emoji={smiley} />
        <NumberDisplay value={23} />
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default App;
