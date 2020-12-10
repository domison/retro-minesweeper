import React, { ReactNode } from 'react';
import { CellState, CellValue } from '../../types';
import './Field.scss';

interface IField {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
}

const Field: React.FC<IField> = ({ row, col, state, value }) => {
  const renderContent = (): ReactNode => {
    if (state === CellState.revealed) {
      if (value === CellValue.bomb) {
        return (
          <span role="img" aria-label="bomb">
            {'💣'}
          </span>
        );
      }
      return value;
    } else if (state === CellState.flagged) {
      return (
        <span role="img" aria-label="flag">
          {'🚩'}
        </span>
      );
    }
    return null;
  };

  return (
    <div
      className={`Field ${state === CellState.hidden ? 'hidden' : 'revealed'}`}
    >
      {renderContent()}
    </div>
  );
};

export default Field;
