import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './components/Grid';

const wasm = import('../build/synesthete');

wasm.then(wasm => {
  const App = () => {
    return (
      <div>
        <h1>Synesthete</h1>
        <Grid />
        <button onClick={wasm.big_computation}>Run Computation</button>
      </div>
    );
  };

  ReactDOM.render(<App />, document.getElementById('root'));
});
