import React from 'react';
import Block from '../Block';

const Grid = () => {
  return (
    <div className="Grid">
      {Array(10)
        .fill()
        .map((digit, index) => (
          <Block key={`Number${index}`} digit={index} />
        ))}
    </div>
  );
};

export default Grid;
