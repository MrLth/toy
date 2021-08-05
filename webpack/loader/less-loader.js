const less = require('less');

// loader

// webpack -> compile -> 'loader'(资源)
// aloader <- bloader <- cloader

// instance -> bind(webpackResource)
// 处理异步的方式 callback

// setTimeout(() => {
//   // ...
//   // callback();
// }, 1000);
module.exports = function loader(source) {
  const callback = this.async();

  less.render(source, {sourceMap: {}}, function (err, res) {
    let { css, map } = res;
    callback(null, css, map);
  })
}
