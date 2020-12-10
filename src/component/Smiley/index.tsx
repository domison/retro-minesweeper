import React from 'react';
import './Smiley.scss';

import { Emoji } from '../../types';

interface ISmiley {
  emoji: Emoji;
}

const Smiley: React.FC<ISmiley> = ({ emoji }) => {
  return (
    <div className="Smiley">
      <span role="img" aria-label="emoji">
        {emoji}
      </span>
    </div>
  );
};

export default Smiley;
