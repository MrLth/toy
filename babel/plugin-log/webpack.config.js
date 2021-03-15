/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-24 09:25:23
 * @LastEditTime: 2021-03-01 08:50:54
 * @Description: file content
 */
module.exports = {
  mode: 'development',
  devtool: false,
  entry: './entry.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
}