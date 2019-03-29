import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Grid from './components/Grid';

const StyledHeader = styled.header`
  background-color: #282c34;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;
const wasm = import('../build/synesthete');

wasm.then(wasm => {
  const App = () => {
    return (
      <div>
        <StyledHeader>Synesthete</StyledHeader>
        <Grid />
        <button onClick={wasm.load_colors}>Load Colors</button>
        <div />
      </div>
    );
  };

  ReactDOM.render(<App />, document.getElementById('root'));
});
