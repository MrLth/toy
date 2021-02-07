/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-07 16:44:05
 * @LastEditTime: 2021-02-07 16:52:11
 * @Description: file content
 */
import { INCREASE, DECREASE, RESET } from './actionType'

const initialState = {
  count: 0,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return { ...state, count: state.count + 1 };
    case DECREASE:
      return { ...state, count: state.count - 1 };
    case RESET:
      return { ...state, count: action.payload };
    default:
      return state
  }
}

export default reducer