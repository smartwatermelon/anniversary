import React from 'react';

const ScrabbleHeader = ({ letter }) => {
  const letters = Array(5).fill(letter);
  
  return (
    <div className="scrabble-header">
      {letters.map((l, index) => (
        <button
          key={index}
          className="scrabble-tile"
          disabled
        >
          {l}
        </button>
      ))}
    </div>
  );
};

export default ScrabbleHeader;
