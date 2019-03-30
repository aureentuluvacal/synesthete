import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Grid from './components/Grid';

const StyledHeader = styled.header`
  height: 75px;
  font-size: 36px;
  font-family: sans-serif;
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
`;

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
          <div>
            <input type="text" name="digits" />
          </div>
          <div>BACON</div>
        </Columns>
      </Fragment>
    );
  };

  ReactDOM.render(<App />, document.getElementById('root'));
});
