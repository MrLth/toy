/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-01 23:27:48
 * @LastEditTime: 2021-02-02 10:04:20
 * @Description: file content
 */
import React from 'react'

const createForm = (Comp) => {
  return class Wrapper extends React.Component {
    constructor() {
      super()
      this.state = {}
      this.getFieldsVal = this.getFieldsVal.bind(this)
      this.setField = this.setField.bind(this)
      this.clear = this.clear.bind(this)
      this.inputCbs = new Map()
    }
    getFieldsVal() {
      return this.state
    }
    setField(name, options = {}) {
      const value = this.state[name] ?? options.initialValue ?? ''

      if (!this.inputCbs.has(name)) {
        this.inputCbs.set(name, (e) => {
          this.setState({ [name]: e.target.value })
        })
      }
      const onInput = this.inputCbs.get(name)

      return {
        value,
        onInput
      }
    }
    clear() {
      this.setState(Object.keys(this.state).reduce((a, c) => { a[c] = ''; return a }, {}))
    }
    render() {
      const form = {
        setField: this.setField,
        getFieldsVal: this.getFieldsVal,
        clear: this.clear
      }
      return <Comp form={form} />
    }
  }
}

const Form = ({ form }) => {
  return <>
    <input type="text" {...form.setField('name')} />
    <input type="text" {...form.setField('age')} />
    <button onClick={() => console.log(form.getFieldsVal())}>getFieldsVal</button>
    <button onClick={() => form.clear()}>clear</button>
  </>
}

export default createForm(Form)