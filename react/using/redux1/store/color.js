/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-07 16:44:00
 * @LastEditTime: 2021-02-07 16:57:34
 * @Description: file content
 */
import { CHANGE_COLOR } from './actionType'

const initialState = {
  color: 'rgb(0,0,0)'
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COLOR:
      return { ...state, color: action.payload }
    default:
      return state
  }
}

export default reducer