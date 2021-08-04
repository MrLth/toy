/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-04 11:43:19
 * @LastEditTime: 2021-08-04 11:52:57
 * @Description: file content
 */

import fs from 'fs'
import cp from 'child_process'
import path from 'path'

export default (config) => {
  const { input, output = 'dist' } = config
  if (fs.existsSync(output)) {
    cp.execSync(`rm -rf ${output}`)
  }

  if (!fs.existsSync(output)) {
    fs.mkdirSync(output)
    fs.mkdirSync(`${output}/static`)
  }

  fs.readFileSync(input).forEach(file => {
    const path = path.join(input, file, 'index.js')
    
  })

}