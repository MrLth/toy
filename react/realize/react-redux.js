/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-07 14:42:38
 * @LastEditTime: 2021-02-07 16:25:17
 * @Description: file content
 */
import React, { Component, createContext } from 'react'

const Context = createContext('defaultValue')

export class Provider extends Component {
  render() {
    const { store, children } = this.props
    return <Context.Provider value={store}>
      {children}
    </Context.Provider>
  }
}

export const connect = (mapStateToProps = () => { }, mapDispatchToProps = dispatch => ({ dispatch })) => Com => {
  return class Temp extends Component {
    static contextType = Context
    constructor(props, context) {
      super(props)
      this.context = context
      this.state = mapStateToProps(context.getState())
      this.dispatch = mapDispatchToProps(context.dispatch)
    }
    componentDidMount() {
      this.context.subscribe(() => this.setState(mapStateToProps(this.context.getState())))
    }
    render() {
      return <Com {...this.props} {...this.state} {...this.dispatch} />
    }
  }
}