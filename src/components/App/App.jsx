import React, { Fragment, useEffect, useRef } from 'react';
import * as styles from './App.module';
import Grid from '../Grid';
import NumberInput from '../NumberInput';
import init from '~package/synesthete';

const App = () => {
  const wasmRef = useRef(null);

  const handleInputChange = (colors, inputValue) => {
    if (!wasmRef.current) {
      console.warn('WASM module not ready yet');
      return;
    }

    const canvas = document.getElementById('drawing');
    const ctx = canvas.getContext('2d');

    wasmRef.current.draw(ctx, 400, 600, colors, inputValue);
  };

  useEffect(() => {
    const runWasm = async () => {
      wasmRef.current = await init();
    };
    runWasm();
  }, []);

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
