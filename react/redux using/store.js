/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-06 20:30:13
 * @LastEditTime: 2021-02-06 20:57:11
 * @Description: file content
 */
import { createStore } from 'redux'

const initialState = {
  count: 0
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'increase':
      return { ...state, count: state.count + 1 };
    case 'decrease':
      return { ...state, count: state.count - 1 };
    case 'reset':
      return { ...state, count: action.payload };
    default:
      return state
  }
}

export default createStore(reducer)
