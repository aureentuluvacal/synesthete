import React, { Fragment } from 'react';
import styles from './App.module';
import Grid from '../Grid/';
import NumberInput from '../NumberInput';

const wasm = import('~build/synesthete');

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
        <div className={styles.appColumn}>
          <Grid />
        </div>
        <div className={styles.appColumn}>
          <NumberInput handleInputChange={handleInputChange} />
        </div>
        <div className={styles.appColumn}>
          <canvas id="drawing" width="400" height="600" />
        </div>
      </div>
    </Fragment>
  );
};

export default App;
