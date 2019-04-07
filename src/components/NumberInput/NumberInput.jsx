import React, { Component } from 'react';
import styles from './NumberInput.module';

class NumberInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  getAllColors() {
    const colors = {
      zero: null,
      one: null,
      two: null,
      three: null,
      four: null,
      five: null,
      six: null,
      seven: null,
      eight: null,
      nine: null,
    };

    Object.keys(colors).map((key, index) => {
      colors[key] = localStorage.getItem(`${index}_color_rgb`);
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
