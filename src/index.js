import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styles from './App.module';
import Grid from './components/Grid';
import NumberInput from './components/NumberInput';

const wasm = import('../build/synesthete');

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
      <h1 className={styles.appHeader}>Synesthete</h1>
      <div className={styles.appColumns}>
        <div>
          <Grid />
        </div>
        <NumberInput handleInputChange={handleInputChange} />
        <div>
          <canvas id="drawing" width="400" height="600" />
        </div>
      </div>
    </Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
