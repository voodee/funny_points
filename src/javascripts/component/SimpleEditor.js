"use strict";

import React from 'react'
import update from 'react-addons-update'
import Graph from 'component/Graph'
import ColorPicker from 'component/ColorPicker'
import NumberPicker from 'component/NumberPicker'

export default React.createClass({

  getInitialState() {
    return {
      points: [],
      color: { 
        rgb: '#000000',
        opacity: 1,
      },
      number: {
        current: 2,
        min: 1,
        max: 2
      }
    }
  },

  render() {
    return (
      <div className='mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop'>
        <h1 className="mdl-typography--display-2 mdl-typography--font-thin">Простой графический редактор</h1>
        <form className='mdl-grid' action='#'>
          <div className='mdl-cell mdl-cell--1-col'>
            <ColorPicker color={this.state.color} handleChangeColor={this.handleChangeColor} />
          </div>
          <div className='mdl-cell mdl-cell--6-col mdl-cell--3-col-phone'>
            <NumberPicker number={this.state.number} handleChangeNumber={this.handleChangeNumber} />
          </div>
        </form>
        <Graph  
          points={this.points} 
          color={this.state.color} 
          number={this.state.number.current} 
          handleChangeColor={this.handleChangeColor}
        />
      </div>
    )
  },

  handleChangeColor(value, opacity = 1) {
    this.setState({
      color: {
        rgb: value,
        opacity: opacity
      }
    })
  },

  handleChangeNumber(value) {
    const max = Math.max(this.state.points.length, 2)
    const min = this.state.number.min
    const current = Math.min( Math.max(Number(value), this.state.number.min), max )

    this.setState({
      number: {
        current: current,
        min: min,
        max: max
      }
    })
  },

  points(point, callback = () => {}) {
    if (point) {
      this.setState(update(this.state, {
        points : {
          $push : [point]
        }
      }), callback)
    }
    return this.state.points
  }
 
})