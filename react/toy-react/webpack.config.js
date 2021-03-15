/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-09-25 21:18:38
 * @LastEditTime: 2020-10-02 15:14:49
 * @Description: file content
 */
module.exports = {
    entry: {
        main: './main.js'
    },
    mode: 'development',
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['@babel/plugin-transform-react-jsx', {pragma:'ce'}]]
                    }
                }

            }
        ]
    }

}