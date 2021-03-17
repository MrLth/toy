

class Dep {
  constructor() {

    this.effects = new Set()
  }


  depend() {
    if (Dep.currentEffect) {
      this.effects.add(Dep.currentEffect)
    }
  }


  notify() {
    if (this.effects.size) {
      this.effects.forEach(func => func())
    }
  }
}


Dep.currentEffect = null


function effect(func) {
  Dep.currentEffect = func
  func()
  Dep.currentEffect = null
}



const targetMap = new Map()

function getDep(target, prop) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(prop)
  if (!depsMap) {
    dep = new Dep()
    depsMap.set(prop, dep)
  }
  return dep
}


function reactive(target) {
  return new Proxy(target, {
    get: function get(target, prop) {

      getDep(target, prop).depend()

      return Reflect.get(target, key)
    },
    set() {

      const rst = Reflect.set(target, key)

      getDep(target, prop).notify()

      return rst
    }
  })
}