/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-08 09:42:59
 * @LastEditTime: 2021-02-09 09:45:40
 * @Description: file content
 */
import { computed, observable, action, makeObservable } from 'mobx'

class Counter {
  @observable count = 0

  constructor() {
    makeObservable(this)
  }

  @computed get doubleCount() {
    return this.count * 2
  }

  // 绑定 this
  @action.bound add() {
    this.count++
  }
}

export default new Counter()