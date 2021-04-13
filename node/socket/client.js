/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-04-13 14:01:37
 * @LastEditTime: 2021-04-13 14:06:41
 * @Description: file content
 */

const net = require('net')
const socket = net.Socket()

socket.connect('3001', '127.0.0.1')

socket.on('connect', () => {
  socket.write('hello')
})

socket.on('data', (buffer) => {
  console.log(`data received form server: ${buffer.toString()}`)
})