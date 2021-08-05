# 如何写一个打包工具

前置知识点：

1. 模块化
2. 浏览器渲染原理
3. HMR 原理

如何实现？

入口文件：entry input ....

```js
require(`${name}/foo.js`);

import xxx from `${xxx}/foo.js`;
```

e.g. 走迷宫

入口 -> 遍历所有路径 -> 依赖图 -> 编译（babel） -> 打包 -> 输出 -> 页面请求 -> 吐对应的 chunk 过去 -> 渲染 -> 代码变更 -> 通知 -> reload -> 渲染

compiler

webpack? 

- 配置复杂 .dev.js .st.js prod.js, happypack... (作用？) -> 提速 <- webpack 配置工程师
- 慢 开发体验

webpack5 <- 进程级缓存 redis 空间换时间

巨型应用优化
- 微前端 百度云
- ESM （今天的内容），vite、snowpack 等...


ESM 核心的优点？

- 快 （为什么快？）

入口 -> 转换 -> 输出 -> 页面请求 -> 吐对应的 chunk 过去 -> 渲染 -> 代码变更 -> 通知 -> reload -> 渲染
