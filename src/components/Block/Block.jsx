import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import styles from './Block.module';
import hexToRgb from '../../utils';

class Block extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: '#fff',
      displayColorPicker: false,
    };

    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  }

  componentDidMount() {
    const color = localStorage.getItem(`${this.props.digit}_color_hex`);

    if (color) {
      this.setState({ color });
    }
  }

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  handleClose() {
    this.setState({ displayColorPicker: false });
  }

  handleChangeComplete(color, event) {
    const hexColor = color.hex;
    const rgbColor = hexToRgb(hexColor);
    this.setState({ color: hexColor });

    localStorage.setItem(`${this.props.digit}_color_hex`, hexColor);
    localStorage.setItem(
      `${this.props.digit}_color_rgb`,
      Object.values(rgbColor).toString(),
    );
  }

  render() {
    const swatchStyles = {
      width: '50px',
      height: '35px',
      display: 'inline-block',
      cursor: 'pointer',
      background: `${this.state.color}`,
    };

    return (
      <div className={styles.block}>
        <h2 className={styles.blockHeader}>{this.props.digit}</h2>
        <div style={swatchStyles} onClick={() => this.handleClick()} />
        {this.state.displayColorPicker && (
          <div className={styles.blockPopover}>
            <div
              className={styles.blockCover}
              onClick={() => this.handleClose()}
            />
            <ChromePicker
              color={this.state.color}
              disableAlpha
              onChangeComplete={this.handleChangeComplete}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Block;
