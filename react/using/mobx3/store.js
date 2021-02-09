/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-09 10:24:28
 * @LastEditTime: 2021-02-09 19:14:56
 * @Description: file content
 */
import { observable, action, makeObservable } from '@realize/mobx'

class Counter {
  constructor() {
    makeObservable(this)
  }
  @observable count = 0
  @action.bound add() {
    this.count++
  }

  @observable color = 'rgb(0,0,0)'
  @action.bound changeColor() {
    const r = Math.random() * 255 | 0
    const b = Math.random() * 255 | 0
    const g = Math.random() * 255 | 0
    this.color = `rgb(${r},${g},${b})`
  }
}

export default new Counter()