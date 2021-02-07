/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-07 13:49:12
 * @LastEditTime: 2021-02-07 16:55:54
 * @Description: file content
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    'redux1': path.resolve(__dirname, './using/redux1/index.js')
  },

  resolve: {
    extensions: [".jsx", ".js"],
    alias:{
      '@realize':path.resolve(__dirname, 'realize')
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
              '@babel/plugin-proposal-class-properties'
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
  ]
}