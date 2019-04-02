import React from 'react';
import Block from '../Block';
import styles from './Grid.module';

const Grid = () => {
  return (
    <div className={styles.grid}>
      {Array(10)
        .fill()
        .map((value, index) => (
          <Block key={`Number${index}`} digit={index} />
        ))}
    </div>
  );
};

export default Grid;
