'use strict';

import d3 from 'd3'
import React from 'react'

export default React.createClass({

  handleChangeNumber: function(e) {
    this.props.handleChangeNumber(e.target.value)
  },

  render: function() {
    return (
      <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
        <input id='number' className='mdl-textfield__input' type='number' value={this.props.number.current} min={this.props.number.min} max={this.props.number.max} onChange={this.handleChangeNumber} />
        <label className='mdl-textfield__label' htmlFor='number'>Кол-во точек</label>
      </div>
    )
  }

})