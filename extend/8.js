/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-23 10:25:22
 * @LastEditTime: 2020-12-23 10:28:51
 * @Description: file content
 */
function extend(child, parent) {
    // child.prototype = Object.create(parent.prototype, Object.getOwnPropertyDescriptors(child.prototype))
    child.prototype = Object.create(parent.prototype)
    child.prototype.constructor = child
}

extend(Es5MyArray, Array)
function Es5MyArray(){
    Array.call(this)
}
class Es6MyArray extends Array{
    constructor(){
        super()
    }
}
console.log(new Es5MyArray(), new Es6MyArray())
// Es5MyArray {} Es6MyArray(0) []