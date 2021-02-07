/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-08 14:12:23
 * @LastEditTime: 2021-01-08 16:59:42
 * @Description: file content
 */
const App = () => {
    const [s1, set_s1] = useState(0)
    const [s2, set_s2] = useState(10)

    console.log('s1', s1)
    console.log('s2', s2)

    return {
        fn1() {
            set_s1(s1 + 1)
            set_s2(s2 => s2 + 10)
            set_s2(s2 => s2 + 10)
            set_s2(s2 => s2 + 10)

        },
        fn2() {
            set_s2(s2 + 10)
        }
    }
}



const fiber = {
    memoizedState: null,
    stateNode: App,
    isMount: true
}


let workInProgressHook = null
let isSchedule = true

function schedule() {
    isSchedule = true

    workInProgressHook = fiber.memoizedState
    const dom = fiber.stateNode()
    fiber.isMount = false

    return dom
}

function useState(initialState) {
    let hook

    if (fiber.isMount) {
        hook = {
            memoizedState: initialState,
            next: null,
            queue: {
                pending: null,
                dispatch: null
            }
        }

        if (!fiber.memoizedState) {
            fiber.memoizedState = hook
        } else {
            workInProgressHook.next = hook
        }

        hook.queue.dispatch = dispatchAction.bind(null, hook.queue)

        workInProgressHook = hook
    } else {
        hook = workInProgressHook
        workInProgressHook = hook.next
    }

    let baseState = hook.memoizedState
    if (hook.queue.pending) {
        let startUpdate = hook.queue.pending.next
        let nextUpdate = startUpdate
        do {
            const action = nextUpdate.action
            baseState = typeof action === 'function' ? action(baseState) : action
            nextUpdate = nextUpdate.next
        } while (nextUpdate !== startUpdate)

        hook.queue.pending = null
    }

    hook.memoizedState = baseState
    return [baseState, hook.queue.dispatch]
}

function dispatchAction(queue, action) {
    let update = {
        action,
        next: null
    }

    if (!queue.pending) {
        update.next = update
    } else {
        update.next = queue.pending.next
        queue.pending.next = update
    }

    queue.pending = update

    reRender()
}

function reRender() {
    if (isSchedule) {
        isSchedule = false
        setTimeout(schedule, 0)
    }
}

const { fn1, fn2 } = schedule()
fn1()
debugger