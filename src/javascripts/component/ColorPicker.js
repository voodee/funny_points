"use strict";

import d3 from 'd3'
import React from 'react'
import ColorPicker from 'react-colors-picker'

export default React.createClass({

  handleChangeColor({color, alpha}) {
    this.props.handleChangeColor(color, alpha / 100)
  },

  render() {
    return (
      <div className='mdl-textfield' style={{ textAlign: 'center' }}>
        <ColorPicker
            animation="slide-up"
            color={this.props.color.rgb}
            alpha={this.props.color.opacity * 100}
            onChange={this.handleChangeColor}
          />
      </div>    
    )
  }

})