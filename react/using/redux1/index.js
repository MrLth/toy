/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-07 13:49:07
 * @LastEditTime: 2021-02-07 16:23:03
 * @Description: file content
 */
import React from 'react'
import ReactDom from 'react-dom'

// import { Provider } from 'react-redux'
import { Provider } from '../../realize/react-redux'
import store from './store'

import Count from './Count'
import Color from './Color'
import Color1 from './Color1'

ReactDom.render(
  <Provider store={store}>
    <Count />
    <Color />
    <Color1 />
  </Provider>,
  document.querySelector('#root')
)