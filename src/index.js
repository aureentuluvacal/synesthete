import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Grid from './components/Grid';
import NumberInput from './components/NumberInput';

const StyledHeader = styled.header`
  height: 75px;
  font-size: 36px;
  font-family: sans-serif;
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
`;

const handleOnKeyUp = () => {
  // TODO handle redraw
  console.log('TIS I, THE FRENCHIEST FRY');
};

const wasm = import('../build/synesthete');

wasm.then(wasm => {
  const App = () => {
    return (
      <Fragment>
        <StyledHeader>Synesthete</StyledHeader>
        <Columns>
          <div>
            <Grid />
            <button onClick={wasm.load_colors}>Load Colors</button>
          </div>
          <NumberInput onKeyUp={handleOnKeyUp} />
          <div>BACON</div>
        </Columns>
      </Fragment>
    );
  };

  ReactDOM.render(<App />, document.getElementById('root'));
});
