"use strict";

import d3 from 'd3'
import React from 'react'

export default React.createClass({

  handleChangeColor(e) {
    this.props.handleChangeColor(e.target.value)
  },

  render() {
    return (
      <div className='mdl-textfield'>
        <input type='color' value={this.props.color} onChange={this.handleChangeColor} />
      </div>
    )
  }

})