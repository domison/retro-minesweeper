import React, { ReactNode } from 'react';
import { CellState, CellValue } from '../../types';
import './Field.scss';

interface IField {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
  onClick: (event: React.MouseEvent) => void;
  onMouseDown: (event: React.MouseEvent) => void;
  onMouseUp: (event: React.MouseEvent) => void;
}

const Field: React.FC<IField> = ({
  row,
  col,
  state,
  value,
  onClick,
  onMouseDown,
  onMouseUp,
}) => {
  const renderContent = (): ReactNode => {
    if (state === CellState.revealed) {
      if (value === CellValue.bomb) {
        return (
          <span role="img" aria-label="bomb">
            {'💣'}
          </span>
        );
      } else if (value === CellValue.none) {
        return null;
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
      className={`Field ${
        state === CellState.hidden ? 'hidden' : 'revealed'
      } value-${value}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {renderContent()}
    </div>
  );
};

export default Field;
