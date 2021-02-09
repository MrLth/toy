/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-08 10:12:14
 * @LastEditTime: 2021-02-08 16:05:27
 * @Description: file content
 */

import React, { Component } from 'react'
import store from './store'
import { autorun } from 'mobx'

class Count extends Component {
  componentWillMount() {
    autorun(() => {
      // 添加对 store.count 的依赖
      console.log(store.count)
      this.setState({})
    })
  }
  render() {
    const { count, doubleCount } = store
    return <>
      <h1>{count}</h1>
      <h2>{doubleCount}</h2>
      <button onClick={store.add}>add</button>
    </>
  }
}

export default Count