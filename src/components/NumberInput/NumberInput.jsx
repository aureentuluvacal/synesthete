import React, { Component } from 'react';
import * as styles from './NumberInput.module';

class NumberInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  getAllColors() {
    const defaultColors = {
      zero: '0,0,0',
      one: '255,0,0',
      two: '0,255,0',
      three: '0,0,255',
      four: '255,255,0',
      five: '255,0,255',
      six: '0,255,255',
      seven: '128,128,128',
      eight: '255,128,0',
      nine: '128,0,255',
    };

    const colors = {};
    Object.keys(defaultColors).forEach((key, index) => {
      const stored = localStorage.getItem(`${index}_color_rgb`);
      colors[key] = stored || defaultColors[key];
    });

    return colors;
  }

  handleOnChange(e) {
    this.setState({
      value: e.target.value,
    });

    const colors = this.getAllColors();
    const { handleInputChange } = this.props;

    handleInputChange(colors, this.state.value);
  }

  render() {
    return (
      <div className={styles.numberInput}>
        <textarea
          cols="70"
          rows="30"
          placeholder="Enter numbers here!"
          name="digits"
          onChange={e => this.handleOnChange(e)}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default NumberInput;
