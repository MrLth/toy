/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-06 20:49:44
 * @LastEditTime: 2021-02-07 16:53:37
 * @Description: file content
 */

import store from './store'
import React from 'react'

import { INCREASE } from './store/actionType'

class Count extends React.Component {
  componentDidMount() {
    this.clear = store.subscribe(() => {
      this.setState({})
    })
  }
  add() {
    store.dispatch({ type: INCREASE })
  }
  render() {
    const { count } = store.getState().count
    return <>
      <h1>{count}</h1>
      <button onClick={this.add}>increment</button>
    </>
  }
}

export default Count