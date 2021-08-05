const zlib = require('zlib');

// webpack 执行
// opts -> let i = new YourPlugin(opts) -> i.apply(compiler)

module.exports = class GzipPlugin {

  // 插件配置的参数
  constructor(option = {}) {
    this.option = option;
  }

  // 固定的
  apply(compiler) {
    compiler.hooks.emit.tap('myPlugin', compilation => {
      const assets = compilation.getAssets();
      for (const file of assets) {
        if (/\.js$/.test(file.name)) {
          const gzipFile = zlib.gzipSync(file.source._value, {
            level: this.option.level || 7
          });

          compilation.assets[file.name + '.gz'] = {
            source: function () {
              return gzipFile;
            },
            size: function () {
              return gzipFile.length
            }
          }
        }
      }
    })
  }
}