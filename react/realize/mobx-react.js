/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-09 15:21:20
 * @LastEditTime: 2021-02-09 21:03:41
 * @Description: file content
 */
import { depsManager, DependsCollector, isFunction } from './mobx'

const dependsCollector = Symbol('depend key')
const forceUpdateCb = Symbol('Force update cb')

function baseObserver(isStaticComponent = true, target) {
  const nativeRender = target.prototype.render

  target.prototype.render = function () {
    if (isStaticComponent && this[dependsCollector]) {
      return nativeRender.call(this)
    }

    this[dependsCollector] = new DependsCollector()
    this[dependsCollector].collectStart()
    if (!this[forceUpdateCb]) {
      this[forceUpdateCb] = () => {
        this.forceUpdate()
      }
    }

    const jsxElement = nativeRender.call(this)

    this[dependsCollector].collectEnd(this[forceUpdateCb])
    return jsxElement
  }
}

export const observer = (arg1) => {
  return typeof arg1 === 'boolean'
    ? baseObserver.bind(null, arg1)
    : baseObserver(undefined, arg1)
}