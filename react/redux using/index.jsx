/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-06 20:49:44
 * @LastEditTime: 2021-02-06 20:58:36
 * @Description: file content
 */

import store from './store'
import React from 'react'


class Count extends React.Component {
  componentDidMount() {
    this.clear = store.subscribe(() => {
      this.setState({})
    })
  }
  add() {
    store.dispatch({ type: 'increment' })
  }
  render() {
    const count = store.getState()
    return <>
      <h1>{count}</h1>
      <button onClick={this.add().bind(this)}>increment</button>
    </>
  }
}

export default Count