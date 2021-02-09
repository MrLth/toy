/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-09 10:16:51
 * @LastEditTime: 2021-02-09 21:04:11
 * @Description: file content
 */

export const isFunction = source => typeof source === 'function'

const map = new Map()
let isCollect = 0

window.map = map

const dependsStack = []

export class DependsCollector {
  constructor() {
    this.reactivates = new Set()
  }

  collectStart() {
    dependsStack.push(this)
  }

  collectEnd(handler) {
    for (const reactive of this.reactivates) {
      if (!map.has(reactive)) {
        map.set(reactive, new Set())
      }
      map.get(reactive).add(handler)
    }

    dependsStack.pop()
  }
}
export const depsManager = {
  subscribe(observer) {
    if (dependsStack.length) {
      const currentDependsCollector = dependsStack[dependsStack.length - 1]

      currentDependsCollector.reactivates.add(observer)
    }
  },

  dispatch(observer) {
    if (isCollect) return
    const reactivates = map.get(observer)
    if (!reactivates) return
    for (const reactive of reactivates) {
      isFunction(reactive) && reactive()
    }
  }
}

class Observer {
  constructor(value) {
    this.value = value
  }

  get() {
    depsManager.subscribe(this)
    return this.value
  }

  set(value) {
    this.value = value
    depsManager.dispatch(this)
  }
}

// descriptor property
export function observable(target, key, descriptor) {
  // 返回一个描述对象
  const observer = new Observer(descriptor.initializer.call(this))
  return {
    get() {
      return observer.get()
    },
    set(v) {
      observer.set(v)
    },
    enumerable: true,
    configurable: true
  }

}

export function autorun(handler) {
  const dependsCollector =  new DependsCollector()
  dependsCollector.collectStart()
  handler()
  dependsCollector.collectEnd(handler)
}


const storeKey = Symbol('mobx store key')

export const action = {
  bound(target, key, descriptor) {

    target[storeKey] = target[storeKey] ?? []
    target[storeKey].push(key)

    return descriptor
  }
}


export function makeObservable(that) {
  for (const key of that[storeKey]) {
    that[key] = that[key].bind(that)
  }
}