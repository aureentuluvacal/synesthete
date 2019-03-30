import React from 'react';
import Block from '../Block';
import styled from 'styled-components';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 60px 60px 60px;
  grid-gap: 10px;
`;

const Grid = () => {
  return (
    <StyledGrid>
      {Array(10)
        .fill()
        .map((value, index) => (
          <Block key={`Number${index}`} digit={index} />
        ))}
    </StyledGrid>
  );
};

export default Grid;
