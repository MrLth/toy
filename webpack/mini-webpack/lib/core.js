/**
 * 今天分享的最最最最最主要的东西就在这里了，信 TC39，得永生
 */
const child = require('child_process')
const fs = require('fs')
const p = require('path')

const babel = require('@babel/core')
const types = require('@babel/types')
const traverse = require('@babel/traverse').default

const cache = require('./cache')
const tpl = require('./tpl')

// 解析所有的 import 构建依赖图
function generateDepencies (filePath, isRoot = false) {
  // 图就是矩阵，矩阵就是图
  const imports = {
    depend: [],
    local: []
  }

  // 拿到文件内容字符串
  const context = fs.readFileSync(filePath, 'utf-8')

  // babel 是好搭档，帮我们搞定词法分析、AST部分，还提供了一些文档上找不到的 API 可以做一些处理（文档就是这么烂，服不服）
  const transform = babel.transform(context)
  const ast = babel.parseSync(transform.code)

  // 就是字符串替换，没那么骚
  const _template = babel.template(`window.%%name%% = %%name%%`)
  const _render = babel.template(`ReactDOM.render(React.createElement(%%name%%,{},{}), document.getElementById('root'))`)

  // DFS
  traverse(ast, {

    // 处理 import
    ImportDeclaration(path) {
      // import React from 'react'
      // 竟然有代码提示，我顶
      const { source, specifiers } = path.node
      const { value } = source // react
      const names = specifiers.map(e => e.local.name)
       // React
      // 如果不是本地引入的，本地引入的，比如 import Foo from './foo', 我们就粗暴的用 . 来做判断，合理
      if (!~value.indexOf('.')) {

        // 加入我们的图
        imports.depend.push(value)

        // 坑，ESM 最大的坑我觉得就是 default
        const isFuckDefault = specifiers.some(e => e.type === 'ImportDefaultSpecifier')
        if (isFuckDefault) {
          path.remove()
        }
        else {
          path.replaceWith(babel.template(`const { %%define%% } = %%name%%`.replace('%%name%%', value).replace('%%define%%', names.join(', ')))())
        }
      }
      else {
        // 本地引入的
        // 这里可以处理多种文件格式，本 demo 就处理个 js 就行了
        const localFilePath = getExtFilePath(p.join(filePath, '..', value))
        imports.local.push(localFilePath)

        if (p.extname(localFilePath) === '.js') {

          // 递归，这样所有的文件都被处理了
          const ret = generateDepencies(localFilePath, isRoot)
          imports.depend = imports.depend.concat(ret.depend)
          imports.local = imports.local.concat(ret.local)

          path.remove()
        }
        else {
          cache.addCache(localFilePath, fs.readFileSync(localFilePath, 'utf-8'))
          // 先不处理这些了
          path.remove()
        }
      }
    },

    // 导出 export default  方式的哦
    ExportDefaultDeclaration(path) {
      const { declaration } = path.node
      const { id } = declaration
      const { name } = id // 只处理具名的导出哦，匿名的没空弄

      path.replaceWith(declaration)
      if (isRoot) {
        path.parent.body.push(_template({ name: types.identifier(name) }))
        path.parent.body.push(_render({ name: types.identifier(name) }))
      }
      else {
        path.parent.body.push(_template({ name: types.identifier(name) }))
      }
    }
  })

  const txt = babel.transformFromAstSync(ast, transform.code)

  // 缓存一下，为了更快、更高、更强
  cache.addCache(filePath, txt.code)
  cache.addDepent(filePath, imports)
  return imports
}

// 走迷宫了
function travel (config) {

  // 这里省略一万多行的校验
  const { input, output = 'dist', external } = config

  if (fs.existsSync(output)) {
    // 先清空原来的 output，帮你把这事儿干了，主要我是写 demo，不然应该是你的事情
    child.execSync('rm -rf ' + output)
  }

  // 然后建一个
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output)
    fs.mkdirSync(output + '/static')
  }

  // 思考》》》》
  // 1.入口文件  -> 遍历所有的文件，而且是用到的文件
  //

  // 读取入口文件
  fs.readdirSync(input).forEach(file => {
    const filePath = p.join(input, file, 'index.js')
    // 生成某一种数据结构，存取我们要的一些信息
    const imports = generateDepencies(filePath, true)

    // 本地文件写到打包的路径下去
    imports.local.unshift(filePath)
    imports.local.forEach(f => {
      const target = p.join(process.cwd(), output)
      const destination = p.join(target, f)
      mkdir(target, f)
      // console.log('------------', destination, cache.getCache(f))
      fs.writeFileSync(destination, cache.getCache(f), 'utf-8')
    })

    // TODO 这里有点问题，但是不影响演示
    const html = tpl.getBuildTpl(imports, external)
    const _path = p.join(output, 'static')
    if (!fs.existsSync(_path)) {
      fs.mkdirSync(_path)
    }
    fs.writeFileSync(p.join(_path, 'index.html'), html, 'utf-8')
  })
}

function getExtFilePath (path) {
  const ext = p.extname(path)
  if (ext === '') {
    const a = p.join(path) + '.js'
    const b = p.join(p.join(path), 'index.js')
    const r = [a, b].find(i => fs.existsSync(i))
    return r || path
  }
  return path
}

function mkdir(target,dir) {
  const dirs = dir.split('/').filter((e)=>e.indexOf('.') == -1)
  dirs.forEach((e,i)=>{
    let dirPath = p.join(target,dirs.slice(0, i + 1).join('/'))
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath)
    }
  })
}

function getFileName(path) {
  switch (path) {
    case '/':
      return 'Index'
    default:
      return path.slice(0, 1).toUpperCase() + path.slice(1)
  }
}

function getFilePath(path,url) {
  const filePath = p.join(path,getFileName(url))
  const react = p.join(filePath, 'index.js')
  const vue = p.join(filePath, 'index.vue')
  if (fs.existsSync(react)) {
    return react
  }else {
    return vue
  }
}

module.exports = {
  travel,
  generateDepencies,
  getFileName,
  getFilePath
}
