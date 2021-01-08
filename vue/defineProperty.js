/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-08 12:21:30
 * @LastEditTime: 2021-01-08 14:11:56
 * @Description: file content
 */

const arr = [0, 1, 2, 3, 4, 5]

const a = []

arr.forEach((item, i) =>
    Object.defineProperty(a, i, {
        set(v) {
            console.log('set', i)
            arr[i] = v
        },
        get() {
            console.log('get', i)
            return arr[i]
        }
    }) 
)

debugger