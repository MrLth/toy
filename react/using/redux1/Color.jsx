import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { connect } from '@realize/react-redux'
import { CHANGE_COLOR } from './store/actionType'

class Color extends Component {
  render() {
    const { color, changeColor } = this.props
    return <>
      <h2 style={{ color }}>新年快乐</h2>
      <button onClick={changeColor}>change color</button>
    </>
  }
}

export default connect(s => s.color, dispatch => (
  {
    changeColor() {
      let r = Math.random() * 255 | 0
      let g = Math.random() * 255 | 0
      let b = Math.random() * 255 | 0
      dispatch({ type: CHANGE_COLOR, payload: `rgb(${r}, ${g}, ${b})` })
    }
  }
))(Color)