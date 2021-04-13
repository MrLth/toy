/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-03-17 23:47:21
 * @LastEditTime: 2021-03-17 23:47:57
 * @Description: file content
 */
function ref(val) {
  return {
    get value() {
      return val
    },
    set value(newVal) {
      val = newVal
    }
  }
}