import React from 'react';
import ReactDOM from 'react-dom';
import Block from './components/Block.jsx';

const wasm = import('../build/synesthete');

wasm.then(wasm => {
  const App = () => {
    return (
      <div>
        <h1>Synesthete</h1>
        <Block digit="0" />
        <button onClick={wasm.big_computation}>Run Computation</button>
      </div>
    );
  };

  ReactDOM.render(<App />, document.getElementById('root'));
});
