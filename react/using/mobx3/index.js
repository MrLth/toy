/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-09 10:23:57
 * @LastEditTime: 2021-02-09 16:35:51
 * @Description: file content
 */


import React from 'react'
import ReactDom from 'react-dom'

import Count from './Count'
import Color from './Color'

ReactDom.render(
  <>
    <Count />
    <Color />
  </>,
  document.querySelector('#root')
)