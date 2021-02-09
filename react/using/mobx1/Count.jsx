/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-08 10:12:14
 * @LastEditTime: 2021-02-09 16:45:15
 * @Description: file content
 */

import React, { Component } from 'react'
import store from './store'
import { observer } from 'mobx-react'

@observer
class Count extends Component {
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