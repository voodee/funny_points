"use strict";

import React from 'react'
import { render } from 'react-dom'
import SimpleEditor from 'component/SimpleEditor'


export default class Editor {

  constructor(el) {
    render(
      <SimpleEditor />,
      el
    )
  }
}