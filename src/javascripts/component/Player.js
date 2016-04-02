"use strict";

import d3 from 'd3'
import React, { PropTypes } from 'react'
import update from 'react-addons-update'

export default React.createClass({

  propTypes: {
    points: PropTypes.array.isRequired,
    animationFlag: PropTypes.bool.isRequired,
    drawChart: PropTypes.func,
    clearGraph: PropTypes.func,
    setAnimationFlag: PropTypes.func
  },

  getInitialState() {
    return {
      animationPointIndex: 0
    }
  },

  clickHandlerStart(e) {
    const { setAnimationFlag } = this.props

    this.timer = setInterval(() => { this.play() }, 1000)
    setAnimationFlag(true)
  },

  clickHandlerStop(e) {
    const { points, drawChart, setAnimationFlag } = this.props
    let { animationPointIndex } = this.state
    
    clearInterval(this.timer)
    for (let i = animationPointIndex; i < points.length; i++) drawChart(i)
    
    setAnimationFlag(false)
    this.setState({ animationPointIndex: 0 })
  },

  play() {
    let { animationPointIndex } = this.state
    const { clearGraph } = this.props


    if (!animationPointIndex || animationPointIndex == this.props.points.length) {
      this.setState({ animationPointIndex: 0 })
      clearGraph()
    }

    this.props.drawChart(animationPointIndex)
    this.setState({ animationPointIndex: ++animationPointIndex })
  },

  render() {
    return (
      <div className='mdl-grid'>
        <div className='mdl-cell mdl-cell--12-col'>
          <p className='mdl-typography--title mdl-typography--font-thin'>После проставления точек, можно включить просмотр их истории.</p>
        </div>
        <div className='mdl-cell mdl-cell--12-col'>
          <button 
            id='start'
            testRef='startButton'
            className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'
            type='button'
            disabled={this.props.animationFlag || this.props.points.length < 2 ? 'disabled' : false}
            onClick={this.clickHandlerStart}
          >Начать</button>

          &nbsp;

          <button 
            id='stop'
            testRef='stopButton'
            className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'
            type='button'
            disabled={!this.props.animationFlag ? 'disabled' : false}
            onClick={this.clickHandlerStop}
          >Остановить</button>
        </div>
      </div>
    )
  }

})