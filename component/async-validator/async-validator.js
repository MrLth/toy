/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-01 11:49:59
 * @LastEditTime: 2021-02-02 10:28:13
 ? https://github.com/yiminghe/async-validator
 */

const AsyncValidator = require('async-validator').default

const descriptor = {
  age: {
    type: 'number',
    asyncValidator(rule, value) {
      return new Promise((resolve, reject) => {
        if (value < 18) {
          reject('too young');  // reject with error message
        } else {
          resolve();
        }
      });
    }
  },
  username: [
    {
      required: true,
      message: "username require"
    },
    {
      min: 2,
      max: 20,
      message: 'username 2 - 20'
    },
    {
      type: 'string',
      message: 'you must type a string!'
    },
    {
      validator(rule, value) {
        return value !== 'happy'
      },
      message: 'cant be happy!!'
    },
  ],

}

const validator = new AsyncValidator(descriptor)

const data = {
  username: 1,
  age: 10
}

validator
  .validate(data)
  .then(() => console.log('passed'))
  .catch(err => console.log(err))














