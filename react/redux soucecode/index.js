/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-06 20:40:03
 * @LastEditTime: 2021-02-06 20:47:34
 * @Description: file content
 */
function createStore(reducer) {
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