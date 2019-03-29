import React from 'react';
import Block from '../Block';
import styled from 'styled-components';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 260px 260px 260px;
  grid-gap: 10px;
  background-color: #fff;
  color: #ddd;
`;

const Grid = () => {
  return (
    <StyledGrid>
      {Array(10)
        .fill()
        .map((digit, index) => (
          <Block key={`Number${index}`} digit={index} />
        ))}
    </StyledGrid>
  );
};

export default Grid;
