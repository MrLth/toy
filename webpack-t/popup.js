/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-04 16:15:16
 * @LastEditTime: 2021-01-04 16:42:33
 * @Description: file content
 */


// require.ensure(['./module.js'], function (require) {
import module from './module'
import subModule from './subModule'
// const module = require('./module')
// const subModule = require('./subModule')
subModule()
module()
console.log('popup');
// })

