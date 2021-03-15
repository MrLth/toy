/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-23 21:23:11
 * @LastEditTime: 2020-12-23 21:57:18
 * @Description: file content
 */

/**
 * @description: 
 * @param {number} maxRunning
 * @param {function[]} list
 */

function threshold(maxRunning, list) {
    let runningCount = 0

    const next = () => {
        if (runningCount >= maxRunning || threshold.stop) return

        const task = list.shift()

        if (typeof task === 'function') {
            runningCount++
            task().then((x) => {
                runningCount--
                setTimeout(() => {
                    list.push(task)
                    next()
                }, x)
                next()
            })
        }
    }

    for (let i = 0; i < maxRunning; i++) {
        next()
    }
}



const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

threshold(3, [
    () => sleep(100).then(() => (console.log(1), 5000)),
    () => sleep(100).then(() => (console.log(2), 5000)),
    () => sleep(100).then(() => (console.log(3), 5000)),
    () => sleep(100).then(() => (console.log(4), 5000)),
    () => sleep(100).then(() => (console.log(5), 5000)),
    () => sleep(100).then(() => (console.log(6), 5000)),
    () => sleep(100).then(() => (console.log(7), 5000)),
    () => sleep(100).then(() => (console.log(8), 5000)),
])