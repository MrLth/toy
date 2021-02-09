/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-09 09:58:09
 * @LastEditTime: 2021-02-09 10:12:06
 * @Description: file content
 */
import React, { Component } from 'react'

import Color from './Color'
import Count from './Count'

import store from './store'
import { Provider, observer } from 'mobx-react'


@observer
class App extends Component {
  render() {
    return <Provider {...store}>
      <Count />
      <Color />
    </Provider>
  }
}

export default App