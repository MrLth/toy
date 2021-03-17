/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-03-17 23:39:19
 * @LastEditTime: 2021-03-18 01:37:04
 * @Description: file content
 */

class Dep {
  constructor() {
    /**
     * @type {Set<function>}
     */
    this.effects = new Set()
  }

  /**
   * @method
   */
  depend() {
    if (Dep.currentEffect) {
      this.effects.add(Dep.currentEffect)
    }
  }

  /**
   * @method
   */
  notify() {
    if (this.effects.size) {
      this.effects.forEach(func => func())
    }
  }
}

/**
 * @type {function}
 */
Dep.currentEffect = null

/**
 * @param {function} func
 */
function effect(func) {
  Dep.currentEffect = func
  func()
  Dep.currentEffect = null
}


/**
 * @type {Map<object, Map<string, Dep>>}
 */
const targetMap = new Map()
/**
 * @param {object} target
 * @param {string} prop
 */
function getDep(target, prop) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(prop)
  if (!dep) {
    dep = new Dep()
    depsMap.set(prop, dep)
  }
  return dep
}

/**
 * @param {object} target
 */
function reactive(target) {
  return new Proxy(target, {
    get(target, prop) {

      getDep(target, prop).depend()

      /**
       * 官方推荐，等价于 target[key]
       * 好处：
       * * 函数式写法
       * * 易识别
       */
      return Reflect.get(target, prop)
    },
    set(target, prop, newVal) {

      const rst = Reflect.set(target, prop, newVal)

      getDep(target, prop).notify()

      return rst
    }
  })
}

/**
 * @param {object} source
 */
function isObject(source) {
  return source !== null && typeof source === 'object' && !Array.isArray(source)
}

/**
 * @type {Map<object, proxy>}
 */
const proxyMap = new Map()
function getProxy(source, get, set) {
  let proxy = proxyMap.get(source)
  if (!proxy) {
    proxy = new Proxy(source, { get, set })
    proxyMap.set(source, proxy)
  }
  return proxy
}

/**
 * @param {object} target
 * @returns {proxy}
 */
function reactiveDeep(target) {
  /**
   * @param {object} target
   * @param {string} prop
   * @param {unknown} newVal
   */
  function set(target, prop, newVal) {

    const rst = Reflect.set(target, prop, newVal)

    getDep(target, prop).notify()

    return rst
  }

  /**
   * @param {object} target
   * @param {string} prop
   */
  function get(target, prop) {
    getDep(target, prop).depend()

    const source = Reflect.get(target, prop)

    return isObject(source) ? getProxy(source, get, set) : source
  }

  return new Proxy(target, { get, set })
}

const p = reactiveDeep({ a: { b: 1 } })
let e
effect(() => {
  e = p.a.b + 1
  console.log('e reactivated')
})

p.a.b = 2

console.log('e', e)
console.log('p', p)
