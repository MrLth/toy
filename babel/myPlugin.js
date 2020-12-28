/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-28 15:55:54
 * @LastEditTime: 2020-12-28 16:55:57
 * @Description: file content
 */
module.exports = ({ types: t }) => ({
    visitor: {
        BinaryExpression(path, state) {
            console.log(state.opts)
            path.node.operator = '-'
        }
    }
})