import React, { Component } from 'react'
import store from './store'
import { observer } from '@realize/mobx-react'

@observer
class Count extends Component {
  render() {
    console.log('Count reRender')
    const { count, add } = store
    return <>
      <h1>{count}</h1>
      <button onClick={add}>add</button>
    </>
  }
}

export default Count