import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('colorStore')
@observer
class Color extends Component {
  render() {
    const { color, changeColor } = this.props.colorStore
    return <>
      <h1 style={{ color }} >新年快乐</h1>
      <button onClick={changeColor}>change</button>
    </>
  }
}

export default Color