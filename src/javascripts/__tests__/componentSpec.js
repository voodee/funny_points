"use strict";

import { expect } from 'chai'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import * as ShallowTestUtils from 'react-shallow-testutils'
import testTree from 'react-test-tree'

import SimpleEditor from 'component/SimpleEditor'
import Graph from 'component/Graph'
import ColorPicker from 'component/ColorPicker'
import NumberPicker from 'component/NumberPicker'
import Player from 'component/Player'


describe('Начало BDD тестов', () => {
  it('успешно!', () => {
    expect(true).to.be.true
  })
})


describe('<Player /> — анимация уже нарисованных линий', () => {

  let points = []
  let animationFlag = false


  describe('Если точек нет, то кнопки отключены', () => {
    let player = testTree(<Player points={points} animationFlag={animationFlag} />)

    it('включить анимацию нельзя', () => {
      expect(player.get('startButton').getProp('disabled')).to.equal('disabled')
    })

    it('выключить анимацию нельзя', () => {
      expect(player.get('stopButton').getProp('disabled')).to.equal('disabled')
    })
  })

  describe('Если есть данные и флаг анимации отключён', () => {
    let points = [{}, {}]
    let player = testTree(<Player points={points} animationFlag={animationFlag} />)

    it('можно включить анимацию', () => {
      expect(player.get('startButton').getProp('disabled')).to.be.false
    })
    it('нельзя выключить анимацию', () => {
      expect(player.get('stopButton').getProp('disabled')).to.equal('disabled')
    })
  })

  describe('Если есть данные и флаг анимации включён, то можно отключить анимацию', () => {
    let animationFlag = true
    let player = testTree(<Player points={points} animationFlag={animationFlag} />)

    it('включить анимацию нельзя', () => {
      expect(player.get('startButton').getProp('disabled')).to.equal('disabled')
    })
    it('можно выключить анимацию', () => {
      expect(player.get('stopButton').getProp('disabled')).to.be.false
    })
  })

  describe('Нажатие на кнопки', () => {
    let points = [{}, {}]
    let animationFlag = false
    let setAnimationFlag = (status) => {
      animationFlag = status
    }

    it('при нажатие на старт вызывается setAnimationFlag и в неё передаёться true', () => {
      animationFlag = false
      let player = testTree(<Player points={points} animationFlag={animationFlag} setAnimationFlag={setAnimationFlag} />)
      
      player.get('startButton').click()
      expect(animationFlag).to.be.true
    })

    it('при нажатие на стоп вызывается setAnimationFlag и в неё передаёться false', () => {
      animationFlag = true
      let drawChart = () => {}
      let player = testTree(<Player points={points} animationFlag={animationFlag} setAnimationFlag={setAnimationFlag} drawChart={drawChart} />)
      
      player.get('stopButton').click()
      expect(animationFlag).to.be.false
    })

  })

})




describe('Структура проекта', () => {

  let renderer, editor

  beforeEach(() => {
    renderer = TestUtils.createRenderer()
    renderer.render(<SimpleEditor />)

    editor = renderer.getRenderOutput()
  })

  it('разметка Material Design Lite', () => {
    expect(editor.props.className.split(' ')).to.include('mdl-cell')
  })

  it('рендер редактора', () => {
    expect(ShallowTestUtils.findAllWithType(editor, Graph).length).to.equal(1)
  })

  it('рендер выбора цвета', () => {
    expect(ShallowTestUtils.findAllWithType(editor, ColorPicker).length).to.equal(1)
  })

  it('рендер выбора кол-ва линий', () => {
    expect(ShallowTestUtils.findAllWithType(editor, NumberPicker).length).to.equal(1)
  })

  it('рендер плеера', () => {
    const graph = ShallowTestUtils.findWithType(editor, Graph)
    const renderer = TestUtils.createRenderer()
    renderer.render(graph)
    expect(ShallowTestUtils.findAllWithType(renderer.getRenderOutput(), Player).length).to.equal(1)
  })

})


describe('Работа редактора', () => {

  let renderer, editor

  beforeEach(() => {
    renderer = TestUtils.createRenderer()
    renderer.render(<SimpleEditor />)
    editor = renderer.getRenderOutput()
  })

  it('добавление точек при клике на рабочей области', () => {
    const graph = ShallowTestUtils.findWithType( editor, Graph )
    const graphTree = testTree( graph )

    for (let i = 1; i <= 5; i++) {
      graphTree.get('svg').click()
      expect(graph.props.points().length).to.equal(i)
    }  
  })

  it('генерация нового цвета для новой точки', () => {
    let _points = []
    let points = (point = false, callBack = () => {}) => {
      if (point) _points.push(point)
      callBack()
      return _points
    } 
    const handleChangeColor = sinon.spy()

    testTree(
      <Graph  
        points={points} 
        color={'#000000'}
        number={2}
        handleChangeColor={handleChangeColor} 
      />
    ).get('svg').click()

    expect(handleChangeColor.called).to.be.true
  })

})