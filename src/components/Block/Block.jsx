import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import styled from 'styled-components';

class Block extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: '#fff',
    };

    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  }

  componentDidMount() {
    const color = localStorage.getItem(`${this.props.digit}_color`);

    if (color) {
      this.setState({ color });
    }
  }

  handleChangeComplete(color, event) {
    this.setState({ color: color.hex });
    localStorage.setItem(`${this.props.digit}_color`, color.hex);
  }

  render() {
    return (
      <div className="Block">
        <h2>{this.props.digit}</h2>
        <SketchPicker
          color={this.state.color}
          disableAlpha
          presetColors={[]}
          onChangeComplete={this.handleChangeComplete}
        />
      </div>
    );
  }
}

export default Block;
