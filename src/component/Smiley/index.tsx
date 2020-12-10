import React from 'react';
import './Smiley.scss';

interface ISmiley {
  value: string;
}
// TODO: Write enums for changing smiley expressions during game later

const Smiley: React.FC<ISmiley> = ({ value }) => {
  return (
    <div className="Smiley">
      <span role="img" aria-label="emoji">
        🙃
      </span>
    </div>
  );
};

export default Smiley;
