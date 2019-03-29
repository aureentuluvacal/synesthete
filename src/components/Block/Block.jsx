import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import styled from 'styled-components';

const StyledBlock = styled.div`
  background-color: #ddd;
  border-radius: 5px;
  padding: 20px;
  font-size: 150%;
`;

const StyledHeader = styled.h2`
  margin: 0px 0px 0px 10px;
  text-align: center;
  color: #333;
`;

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
      <StyledBlock>
        <StyledHeader>{this.props.digit}</StyledHeader>
        <SketchPicker
          color={this.state.color}
          disableAlpha
          presetColors={[]}
          onChangeComplete={this.handleChangeComplete}
        />
      </StyledBlock>
    );
  }
}

export default Block;
