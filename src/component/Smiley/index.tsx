import React from 'react';
import './Smiley.scss';

import { Emoji } from '../../types';

interface ISmiley {
  emoji: Emoji;
  onClick: () => void;
}

const Smiley: React.FC<ISmiley> = ({ emoji, onClick }) => {
  return (
    <div className="Smiley" onClick={onClick}>
      <span role="img" aria-label="emoji">
        {emoji}
      </span>
    </div>
  );
};

export default Smiley;
