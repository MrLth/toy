import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { connect } from '@realize/react-redux'

import { CHANGE_COLOR } from './store/actionType'

class Color extends Component {
  constructor() {
    super()
    this.state = {}

    //#region methods bind this
    this.changeColor = this.changeColor.bind(this)
    //#endregion
  }

  changeColor() {
    let r = Math.random() * 256 | 0
    let g = Math.random() * 256 | 0
    let b = Math.random() * 256 | 0
    this.props.dispatch({ type: CHANGE_COLOR, payload: `rgb(${r}, ${g}, ${b})` })
  }

  render() {
    const { color } = this.props
    return <>
      <h2 style={{ color }}>新年快乐</h2>
      <button onClick={this.changeColor}>change color</button>
    </>
  }
}

export default connect(s => s.color)(Color)
