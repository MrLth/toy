/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-21 16:25:37
 * @LastEditTime: 2020-12-21 17:03:08
 * @Description: file content
 */

Parent.prototype.parentMethod = function(){}
function Parent() {
    this.parent = 'parent'
    this.arr = [1, 2, 3]
}
Child.prototype = new Parent()
Child.prototype.constructor = Child
Child.prototype.childMethod = function(){}
function Child() {
    Parent.call(this)
    this.child = 'child'
}


var a = new Child()
var b = new Child()
a.arr.pop()
console.log(a, b)
console.log(a.parent, b.parent)
console.log(a.child, b.child)
console.log(a.arr, b.arr)
console.log(a.parentMethod, b.parentMethod)
console.log(a.childMethod, b.childMethod)
console.log(a instanceof Child, b instanceof Child)
console.log(a instanceof Parent, b instanceof Parent)
console.log(a.constructor, b.constructor)