import React, { useState } from 'react'

const initSchema = {
  properties: {
    name: {
      initialValue: 'mrlth'
    },
    age: {
      props: {
        type: 'number',
        disabled: '{{ state.name === "lth" }}',
      }
    },
  }
}

function computeSchema(schema, state) {
  return Object.keys(schema).reduce((object, key) => {
    const v = schema[key]
    object[key] = typeof v === 'object'
      ? computeSchema(v, state)
      : typeof v === 'string' && /^\{\{([\s\S]*)\}\}$/.test(v)
        ? new Function('state', `return ${RegExp.$1}`)(state) // eslint-disable-line
        : schema[key]
    return object
  }, {})
}

const useForm = (_schema) => {
  const [state, setState] = useState({})
  const [schema, setSchema] = useState(() => computeSchema(_schema, state))
  const { properties } = schema

  const fields = Object.keys(properties).reduce((object, name) => {
    object[name] = {
      value: state[name] ?? properties[name]?.initialValue ?? '',
      onInput: (e) => {
        const newState = { ...state, [name]: e.target.value }
        setSchema(computeSchema(_schema, newState))
        setState(newState)
      }
    }
    return object
  }, {})

  return { fields, schema, state }
}

const FormHook = () => {
  const { fields, state, schema } = useForm(initSchema)
  console.log('Form render', state)
  return <>
    {
      Object.keys(fields).map(name =>
        <input key={name} type="text" {...schema.properties[name]?.props} {...fields[name]} />
      )
    }
  </>
}

export default FormHook