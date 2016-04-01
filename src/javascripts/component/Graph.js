"use strict";

import d3 from 'd3'
import React, { PropTypes } from 'react'
import Player from 'component/Player'
import getRandomColor from 'utils/getRandomColor'


export default React.createClass({

  propTypes: {
    // Функция добавляет новую точку и возвращает текущий массив точек
    points: PropTypes.func.isRequired,
    // Текущий цвет
    color: PropTypes.string.isRequired,
    // Текущее кол-во точек для соединения
    number: PropTypes.number.isRequired,
    // КолБэк на изменение цвета
    handleChangeColor: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      animationFlag: false
    }
  },

  componentDidMount() {
    this.graph = d3.select('svg')
  },

  clickHandlerSvg(e) {
    const { points, number } = this.props

    if (this.state.animationFlag) {
      alert('Остановите показ, чтобы начать рисовать!')
      return
    }

    points({
      x: parseInt(e.clientX - this.graph[0][0].getBoundingClientRect().left),
      y: parseInt(e.clientY - this.graph[0][0].getBoundingClientRect().top),
      color: this.props.color,
      number: points().length < number ? points().length : number
    }, () => {
      // Рисуем точки и линии
      this.drawChart()
      // Обновляем зывисимости
      this.updateDependence()
    })

  },

  drawChart(index = this.props.points().length - 1) {
    const { points } = this.props
    const dotRadius = 5
    const dotRadii = [dotRadius/5, dotRadius/1.25, dotRadius/2, dotRadius*1.25, dotRadius]
    const point = points()[index]
    const duration = 100

    // Рисуем кружочки
    let circle = this.graph.append('circle')
      .style('fill', point.color)
      .attr('r', dotRadii[0])
      .attr('cx', point.x)
      .attr('cy', point.y)

    // Анимируем кружочки
    dotRadii.forEach((val, i) => { 
      circle
        .transition()
        .duration(duration)
        .delay(i * duration)
        .attr('r', val)
    })

    // Рисуем линии
    for (let i = 0; i < point.number; i++) {
      const prevPoint = points()[index-i-1]
      this.graph.append('line')
        .style('stroke', point.color)
        .style('stroke-width', dotRadius / 2)
        .attr({
          x1: prevPoint.x,
          y1: prevPoint.y,
          x2: prevPoint.x,
          y2: prevPoint.y
        })
        .transition()
        .duration(duration * 5)
        .attr({
          x2: point.x,
          y2: point.y
        })
    }
  },

  updateDependence() {
    this.props.handleChangeColor( getRandomColor() )
  },

  clearGraph() {
    this.graph.selectAll('*').remove()
  },

  setAnimationFlag(status) {
    this.setState({ animationFlag: status })
  },

  render() {
    return (
      <div>
        <svg testRef='svg' className='sd' onClick={this.clickHandlerSvg} />
        <Player 
          points={this.props.points()} 
          drawChart={this.drawChart}
          clearGraph={this.clearGraph} 
          animationFlag={this.state.animationFlag}
          setAnimationFlag={this.setAnimationFlag}
        />
      </div>
    )
  }
})