import React, { useState } from 'react'
import Schema from 'async-validator'

const useForm = (config) => {
  const [state, setState] = useState({ fields: {}, errors: {} })

  const { fields, errors } = state

  const field = (name, options = {}) => {
    return {
      value: fields[name] ?? options.initialValue ?? '',
      onInput: (e) => {
        const value = e.target.value
        if (config?.validator) {
          new Schema(config.validator)
            .validate({ [name]: value })
            .then(() =>
              setState({
                fields: { ...fields, [name]: value },
                errors: { ...errors, [name]: null }
              })
            )
            .catch(err =>
              setState({
                fields: { ...fields, [name]: value },
                errors: { ...errors, [name]: err.fields[name] }
              })
            )
        } else {
          setState({
            fields: { ...fields, [name]: value },
            errors
          })
        }
      }
    }
  }

  const fieldsVal = () => {
    return state
  }

  const clear = () => {
    setState(Object.keys(state).reduce((a, c) => { a[c] = ''; return a }, {}))
  }

  console.log('Hook render')

  return { field, fieldsVal, clear, errors }
}


const descriptor = {
  age: {
    min: 2,
    max: 20,
    message: 'username 2 - 20'
  }
}
const FormHook = () => {
  const { field, fieldsVal, clear, errors } = useForm({ validator: descriptor })
  console.log('Form render')
  return <>
    <input type="text" {...field('name')} />
    <input type="text" {...field('age')} />
    <input type="text" {...field('birth')} />
    <input type="text" {...field('city')} />
    <input type="text" {...field('job')} />
    <input type="text" {...field('sex')} />
    {JSON.stringify(errors)}
    <button onClick={() => console.log(fieldsVal())}>getFieldsVal</button>
    <button onClick={() => clear()}>clear</button>
  </>
}

export default FormHook