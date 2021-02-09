/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-07 13:49:12
 * @LastEditTime: 2021-02-09 10:26:42
 * @Description: file content
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    'redux1': path.resolve(__dirname, './using/redux1/index.js'),
    'mobx1': path.resolve(__dirname, './using/mobx1/index.js'),
    'mobx2': path.resolve(__dirname, './using/mobx2/index.js'),
    'mobx3': path.resolve(__dirname, './using/mobx3/index.js'),
  },

  resolve: {
    extensions: [".jsx", ".js"],
    alias: {
      '@realize': path.resolve(__dirname, 'realize')
    }
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-react-jsx',
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }]
            ]
          }
        }]
      },
    ],

  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['redux1'],
      filename: 'redux1.html',
      template: path.resolve(__dirname, 'index.html')
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['mobx1'],
      filename: 'mobx1.html',
      template: path.resolve(__dirname, 'index.html')
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['mobx2'],
      filename: 'mobx2.html',
      template: path.resolve(__dirname, 'index.html')
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['mobx3'],
      filename: 'mobx3.html',
      template: path.resolve(__dirname, 'index.html')
    }),
  ]
}