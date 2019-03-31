import React from 'react';

const NumberInput = ({ onKeyUp }) => {
  return (
    <div>
      <textarea
        maxLength="200"
        cols="70"
        rows="30"
        placeholder="Enter numbers here!"
        name="digits"
        onKeyUp={() => onKeyUp()}
      />
    </div>
  );
};

export default NumberInput;
