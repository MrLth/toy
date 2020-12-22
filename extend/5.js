/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-22 08:41:51
 * @LastEditTime: 2020-12-22 09:42:39
 * @Description: file content
 */

function extend(child, parent) {
    // child.prototype = Object.create(parent.prototype, Object.getOwnPropertyDescriptors(child.prototype))
    child.prototype = Object.create(parent.prototype)
    child.prototype.constructor = child
}
function Parent() {
    this.parent = 'parent'
    this.arr = [1, 2, 3]
}
Parent.prototype.parentMethod = function () { }
extend(Child, Parent)
function Child() {
    Parent.call(this)
    this.child = 'child'
}
Child.prototype.childMethod = function () { }

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
