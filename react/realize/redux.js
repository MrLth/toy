/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-06 20:40:03
 * @LastEditTime: 2021-02-07 16:40:58
 * @Description: file content
 */
export function createStore(reducer) {
  let state = reducer(undefined, {})
  let subscriber = new Set()
  return {
    getState() {
      return state
    },
    dispatch(action) {
      state = reducer(state, action)
      for (const fn of subscriber) {
        fn()
      }
    },
    subscribe(fn) {
      if (typeof fn !== 'function') {
        return
      }
      subscriber.add(fn)
      return () => {
        subscriber.remove(fn)
      }
    }
  }
}

export function combineReducers(reducers) {
  return (state={}, action) => {
    for (const [k, reducer] of Object.entries(reducers)) {
      state[k] = reducer(state[k], action)
    }
    return state
  }
}

