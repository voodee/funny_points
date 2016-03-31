'use strict';

const d3 = require('d3')


export default class Graph {
  constructor(el) {
    this.el = el
    this.points = []
    this.navigation = {}

    this.graph = d3.select(this.el)
      .append('svg')

    this.handleChangeColor()
    this.handleChangeNumber()
    this.handleClickOnGraph()
    this.handlePlayer()
  }

  handleClickOnGraph() {
    this.animationFlag = true

    this.graph.on('click', () => { 
      const coordinates = d3.mouse(this.graph.node())

      if (this.animationFlag == true) {
        this.points.push({
          x: coordinates[0] || d.pageX,
          y: coordinates[1] || d.pageY,
          color: this.getColor(),
          number: this.points.length < this.number ? this.points.length : this.number
        })

        this.updateDependence()
        this.drawChart()
      } else {
        alert('If you wanna draw line, you should click stop button!')
      }
    })

  }

  handleChangeColor() {
    this.navigation.color = document.getElementById('color')
    this.color = {
      is_change: true,
      data: '#000000'
    }

    this.navigation.color.value = this.color.data
    this.navigation.color.addEventListener('change', () => {
      this.color = {
        isChange: true,
        data: this.navigation.color.value
      }
    })
  }

  handleChangeNumber() {
    this.navigation.number = document.getElementById('number')
    this.number = 2

    this.navigation.number.value = this.number
    this.navigation.number.addEventListener('change', () => {
      const max = Math.max(this.points.length - 1, 2)
      this.number = Math.max( 1, Math.min(max, this.navigation.number.value) ) 
    })
  }

  handlePlayer() {
    const startButton = document.getElementById('start')
    const stopButton = document.getElementById('stop')
    let timer

    startButton.addEventListener('click', () => {
      if (this.points.length > 1) {
        this.animationFlag = false
        stopButton.removeAttribute('disabled')
        timer = setInterval(() => { this.timerPlayer() }, 1000)
      } else {
        alert("First of all, you should draw lines!");
      }
    })

    // $('.stop').click(function(){
    stopButton.addEventListener('click', () => {
      clearInterval(timer)
      this.animationFlag = true
 
      stopButton.setAttribute('disabled', true)
      for(var k = this.animationIndex; k < this.points.length; k++) {
        this.drawChart(k)
      }
      this.animationIndex = 0
    });

  }

  drawChart(index = this.points.length - 1) {
    const dotRadius = 5
    const dotRadii = [dotRadius/5, dotRadius/1.25, dotRadius/2, dotRadius*1.25, dotRadius]
    // const point = this.points.slice(-1)[0]
    const point = this.points[index]
    let duration = 100

    // Рисуем кружочки
    let circle = this.graph.append('circle')
      .style('fill', point.color)
      .attr('r', 1)
      .attr('cx', point.x)
      .attr('cy', point.y)

    // Анимируем кружочки
    dotRadii.forEach((val, i) => { 
      circle.transition().duration(duration).delay(i * duration)
        .attr('r', val)
    })

    // Рисуем линии
    for (let i = 0; i < point.number; i++) {
      let currentPoint = this.points[index-i-1]
      this.graph.append('line')
        .style('stroke', point.color)
        .style('stroke-width', dotRadius / 2)
        .attr({
          x1: currentPoint.x,
          y1: currentPoint.y,
          x2: currentPoint.x,
          y2: currentPoint.y
        })
        .transition()
        .duration(duration * 5)
        .attr({
          x2: point.x,
          y2: point.y
        })
    }
  }

  updateDependence() {
    this.navigation.number.setAttribute('max', Math.max(this.points.length - 1, 2))
    this.color.isChange = false
  }

  getColor() {
    return this.navigation.color.value = this.color.isChange ? this.color.data : this._getRandomColor() 
  }

  _getRandomColor() {
    return `#${('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)}`
  }

  timerPlayer() {
    if (!this.animationIndex || this.animationIndex == this.points.length) {
      this.animationIndex = 0
      this.graph.selectAll('*').remove()
    }

    this.drawChart(this.animationIndex)

    this.animationIndex++
  }

}
