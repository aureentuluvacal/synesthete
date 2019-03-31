import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import styled from 'styled-components';
import hexToRgb from '../../utils';

const StyledBlock = styled.div`
  background-color: #fafafa;
  border-radius: 8px;
  margin: 0 auto;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 4px 0px;
`;

const Header = styled.h2`
  margin: 10px;
  text-align: center;
  color: #333;
  font-family: sans-serif;
`;

const Popover = styled.div`
  position: absolute;
  z-index: 2;
`;

const Cover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

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
      <StyledBlock>
        <Header>{this.props.digit}</Header>
        <div style={swatchStyles} onClick={() => this.handleClick()} />
        {this.state.displayColorPicker && (
          <Popover>
            <Cover onClick={() => this.handleClose()} />
            <ChromePicker
              color={this.state.color}
              disableAlpha
              onChangeComplete={this.handleChangeComplete}
            />
          </Popover>
        )}
      </StyledBlock>
    );
  }
}

export default Block;
