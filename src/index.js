import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Grid from './components/Grid';
import NumberInput from './components/NumberInput';

const wasm = import('../build/synesthete');

const StyledHeader = styled.header`
  height: 75px;
  font-size: 36px;
  font-family: sans-serif;
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
`;

const handleInputChange = (colors, inputValue) => {
  wasm.then(wasm => {
    const canvas = document.getElementById('drawing');
    const ctx = canvas.getContext('2d');
    wasm.draw(ctx, 400, 600, colors, inputValue);
  });
};

const App = () => {
  return (
    <Fragment>
      <StyledHeader>Synesthete</StyledHeader>
      <Columns>
        <div>
          <Grid />
        </div>
        <NumberInput handleInputChange={handleInputChange} />
        <div>
          <canvas id="drawing" width="400" height="600" />
        </div>
      </Columns>
    </Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
