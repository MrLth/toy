/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-01 23:27:48
 * @LastEditTime: 2021-02-01 23:51:49
 * @Description: file content
 */
import React from 'react'

const createForm = (Comp) => {
  return class Wrapper extends React.Component {
    constructor() {
      super()
      this.fields = {}
      this.getFieldsVal = this.getFieldsVal.bind(this)
      this.setField = this.setField.bind(this)
    }

    getFieldsVal() {
      return this.fields
    }

    setField(name, options = {}) {
      this.fields[name] = options.initialValue ?? ''
      return {
        key: name,
        onInput: (e) => {
          this.fields[name] = e.target.value
        }
      }
    }

    render() {
      const form = {
        setField: this.setField,
        getFieldsVal: this.getFieldsVal
      }
      return <Comp form={form} />
    }
  }
}

const Form = ({ form }) => {
  return <>
    <input type="text" {...form.setField('name')} />
    <button onClick={() => console.log(form.getFieldsVal())}>getFieldsVal</button>
  </>
}

export default createForm(Form)