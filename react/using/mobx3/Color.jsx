import React, { Component } from 'react'
import store from './store'
import { observer } from '@realize/mobx-react'

@observer
class Color extends Component {
  render() {
    console.log('Color reRender')

    const { color, changeColor } = store
    return <>
      <h1 style={{ color }}>新年快乐</h1>
      <button onClick={changeColor}>changeColor</button>
    </>
  }
}

export default Color