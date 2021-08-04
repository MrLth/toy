/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-04 11:51:46
 * @LastEditTime: 2021-08-04 14:40:27
 * @Description: file content
 */
import fs from 'fs'

import babel from 'babel'

export default (path, isRoot = false) => {
  const imports = {
    depend: [],
    local: []
  }

  const content = fs.readFileSync(path, 'utf-8')
  const transform = babel.transform(content)
  const ast = babel.parseAsync(transform.code)

  traverse(ast, {
    // import React from 'react'
    ImportDeclaration(path) {
      const { source, specifiers } = path.node
      const { value } = source // 'react'
      const names = specifiers.map(e => e.local.name) // ['React']
      
    }
  })
}