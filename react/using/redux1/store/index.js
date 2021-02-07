/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-07 16:44:20
 * @LastEditTime: 2021-02-07 16:56:28
 * @Description: file content
 */
import { combineReducers, createStore } from '@realize/redux'

import count from './count'
import color from './color'

export default createStore(combineReducers({
  count,
  color
}))
