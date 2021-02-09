/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-08 16:54:11
 * @LastEditTime: 2021-02-09 10:08:02
 * @Description: file content
 */
import { observable, action, makeObservable } from 'mobx'

class Color {
  @observable color = 'rgb(0,0,0)'

  constructor() {
    makeObservable(this)
  }

  @action.bound changeColor() {
    const r = Math.random() * 255 | 0
    const b = Math.random() * 255 | 0
    const g = Math.random() * 255 | 0
    this.color = `rgb(${r},${g},${b})`
  }
}

export default new Color()