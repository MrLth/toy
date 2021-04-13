/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-04-13 13:57:55
 * @LastEditTime: 2021-04-13 14:01:21
 * @Description: file content
 */

const net = require('net')

const server = net.createServer((socket)=>{
  socket.on('data', (buffer)=>{
    console.log(`data received form client: ${buffer.toString()}`)
    socket.write(buffer)
  })

  socket.on('end', ()=>{
    console.log('session closed')
  })
})

server.listen(3001, ()=>{
  console.log('socket server is running at 3001')
})
