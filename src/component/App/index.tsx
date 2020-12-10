import React, { useState } from 'react';
import NumberDisplay from '../NumberDisplay';
import Smiley from '../Smiley';
import './App.scss';

import { generateCells } from '../../utils';
import Field from '../Field';

const App: React.FC = () => {
  const [cells, setCells] = useState(generateCells());

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => <Field key={`${rowIndex}-${colIndex}`} />)
    );
  };

  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={0} />
        <Smiley value={';D'} />
        <NumberDisplay value={23} />
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default App;
