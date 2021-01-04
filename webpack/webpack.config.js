/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-04 15:56:01
 * @LastEditTime: 2021-01-04 17:03:59
 * @Description: file content
 */
const path = require('path');

module.exports = {
    // mode:'development',
    entry: {
        index: './index.js',
        popup: './popup.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [['@babel/preset-env', {
                        "targets": {
                            "browsers": "> 0.1%"
                        }
                    }]]
                }
            }
        }]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxSize: 0
        }
    }
}