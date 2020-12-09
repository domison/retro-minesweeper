import React from 'react';
import './NumberDisplay.scss';

interface INumberDisplay {
  value: number;
}

const NumberDisplay: React.FC<INumberDisplay> = ({ value }) => {
  return (
    <div className="NumberDisplay">{value.toString().padStart(3, '0')}</div>
  );
};

export default NumberDisplay;
