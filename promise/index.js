/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-13 14:07:21
<<<<<<< HEAD
 * @LastEditTime: 2020-12-23 22:12:10
=======
 * @LastEditTime: 2020-12-14 00:30:13
>>>>>>> c736f6fa92b9d7cb1602af11f5c4ab6bc378ed7b
 * @Description: file content
 */

const nextTask = cb => setTimeout(cb, 0)

class MyPromise {
    state = 'pending'
    fulfillQueue = []
    rejectQueue = []
    value

    constructor(execution) {
        const resolve = (x) => {
            if (this.state !== 'pending')
                return

            nextTask(() => {
                for (const cb of this.fulfillQueue) {
                    cb(x)
                }
                this.value = x
                this.state = 'fulfilled'
                this.fulfillQueue = []
            })
        }

        const reject = (x) => {
            if (this.state !== 'pending')
                return

            setTimeout(() => {
                for (const cb of this.rejectQueue) {
                    cb(x)
                }
                this.value = x
                this.state = 'rejected'
                this.rejectQueue = []
            }, 0)
        }

        execution(resolve, reject)
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            const linkedFulfillCb = x => {
                if (typeof onFulfilled !== 'function')
                    return resolve(x)

                try {
                    const rst = onFulfilled(x)
                    MyPromise.isPromise(rst) ? rst.then(resolve, reject) : resolve(rst)
                } catch (e) {
                    reject(e)
                }
            }

            if (this.state === 'fulfilled')
                return linkedFulfillCb(this.value)


            const linkedRejectCb = x => {
                if (typeof onRejected !== 'function')
                    return reject(x)

                try {
                    const rst = onRejected(x)
                    MyPromise.isPromise(rst) ? rst.then(resolve, reject) : resolve(rst)
                } catch (e) {
                    reject(e)
                }
            }

            if (this.state === 'rejected')
                return linkedRejectCb(this.value)

            // this.state === 'pending'
            this.fulfillQueue.push(linkedFulfillCb)
            this.rejectQueue.push(linkedRejectCb)
        })
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }

    static isPromise(promise) {
        return promise && typeof promise.then === 'function'
    }

    static resolve(x) {
        return new MyPromise(resolve => resolve(x))
    }

    static reject(x) {
        return new MyPromise((_, reject) => reject(x))
    }


    static all(list) {
        let count = list.length
        const rstList = []
        return new MyPromise((resolve, reject) => {
            for (let i = 0, len = list.length; i < len; i++) {
                const onFulfilled = (x) => {
                    count--
                    rstList[i] = x
                    if (count === 0) {
                        resolve(rstList)
                    }
                }
                list[i].then(onFulfilled, reject)
            }
        })
    }

    static race(list) {
        return new MyPromise((resolve, reject) => {
            for (const promise of list) {
                promise.then(resolve, reject)
            }
        })
    }

    static chain(fnList) {
        return fnList.reduce((a, c) => a.then(c), MyPromise.resolve())
    }

    static chainClever(fnList) {
        /* 流程类似于
        (async () => {
            await (async () => {
                await Promise.resolve().then(fnList[0])
            })().then(fnList[1])
        })().then(() => console.log(new Date().getTime(), 'end'))
        /**/
        return fnList.reduce(async (a, c) => await a.then(c), MyPromise.resolve())

        // 这里值不会被传递，因为 a 始终返回 undefined
        // return fnList.reduce(async (a, c) => {await a.then(c)} , MyPromise.resolve())
    }

    static async chainAsync(fnList) {
        let t
        for (const cb of fnList) {
            t = await cb(t)
        }
    }

    static allThreshold(threshold, fnList) {
        return new MyPromise((resolve, reject) => {
            let current = 0
            let count = fnList.length
            const rstList = []

            const errCb = (i) => (x) => {
                rstList[i] = x
                reject(rstList)
            }

            const next = (i) => (x) => {
                count--
                rstList[i] = x

                if (count === 0) {
                    resolve(rstList)
                    return
                }

                if (current < fnList.length) {
                    fnList[current](x).then(next(current), errCb(current))
                    current++
                }
            }

            while (current < threshold) {
                fnList[current]().then(next(current), errCb(current))
                current++
            }
        })
    }

}


const sleep = wait => new MyPromise(resolve => setTimeout(resolve, wait))

MyPromise.resolve(10)
    .then(v => {
        console.log('已完成1', v)
        return 8
    })
    .then(() => {
        console.log('已完成2')
        return sleep(500)
    })
    .then(() => {
        console.log('已完成3')
        return sleep(500)
    })
    .then()
    .then(() => {
        console.log('已完成4')
        return sleep(500)
    })
    .then(() => MyPromise.reject(2))
    .then()
    .then(v => {
        console.log('已完成5', v)
    }, v => {
        console.log('已拒绝5', v)
        return 5
    })
    .then(v => {
        console.log1('已完成6', v)
    }, v => {
        console.log('已拒绝7', v)
    })
    .catch(v => {
        console.log('已拒绝8')
        return sleep(500)
    })
    .then(v => console.log('已完成9'))


MyPromise.chain1(
    [
        () => sleep(1000).then(() => (console.log(0), 1)),
        (x) => sleep(1000).then(() => (console.log(x), x + 1)),
        (x) => sleep(1000).then(() => (console.log(x), x + 1)),
        (x) => sleep(1000).then(() => (console.log(x), x + 1)),
        (x) => sleep(1000).then(() => (console.log(x), x + 1)),
        (x) => sleep(1000).then(() => (console.log(x), x + 1)),
        (x) => sleep(1000).then(() => (console.log(x), x + 1)),
        (x) => sleep(1000).then(() => (console.log(x), x + 1)),
    ]
)


