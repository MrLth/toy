import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('countStore')
@observer
class Count extends Component {
  render() {
    const { count, doubleCount, add } = this.props.countStore
    return <>
      <h1>{count}</h1>
      <h2>{doubleCount}</h2>
      <button onClick={add}>add</button>
    </>
  }
}

export default Count