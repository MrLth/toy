/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-08 10:12:14
 * @LastEditTime: 2021-02-08 16:45:51
 ? @Description: 将 store 直接写入组件，缺点是无法共享，优点是我在 react 组件里写 vue🤣
 */

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { computed, observable, action, makeObservable } from 'mobx'

@observer
class Count extends Component {
  @observable count = 0

  constructor() {
    super()
    makeObservable(this)
  }

  @computed get doubleCount() {
    return this.count * 2
  }

  // 绑定 this
  @action.bound add() {
    this.count++
  }

  render() {
    const { count, doubleCount } = this
    return <>
      <h1>{count}</h1>
      <h2>{doubleCount}</h2>
      <button onClick={this.add}>add</button>
    </>
  }
}

export default Count