/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-09-25 21:30:10
 * @LastEditTime: 2020-10-02 21:03:25
 * @Description: file content
 */

const RENDER_TO_DOM = Symbol('render to dom')

export class Component {
    constructor() {
        this.props = Object.create(null)
        this.children = []
        this._root = null
        this._range = null
    }
    setAttribute(name, value) {
        this.props[name] = value
    }
    appendChild(child) {
        this.children.push(child)
    }
    get vdom() {
        return this.render().vdom
    }

    [RENDER_TO_DOM](range) {
        this._range = range
        this._vdom = this.vdom
        this._vdom[RENDER_TO_DOM](range)
    }

    update() {
        const isSameNode = (oldNode, newNode) => {
            // type
            if (oldNode.type !== newNode.type)
                return false
            // props length
            if (Object.keys(oldNode).length !== Object.keys(newNode).length)
                return false
            // props value
            for (const name in newNode.props) {
                if (newNode.props[name] !== oldNode.props[name])
                    return false
            }
            // text node content
            if (newNode.type === '#text' && newNode.content !== oldNode.content)
                return false
            // default
            return true
        }

        const update = (oldNode, newNode) => {
            if (!isSameNode(oldNode, newNode)) {
                // 非精细更新，直接replace
                newNode[RENDER_TO_DOM](oldNode._range)
                return
            }
            newNode._range = oldNode._range

            const newChildren = newNode.vchildren
            const oldChildren = oldNode.vchildren

            if (!Array.isArray(newChildren) || newChildren.length === 0 || !Array.isArray(oldChildren) || oldChildren.length === 0)
                return

            const newChildrenLength = newChildren.length
            const oldChildrenLength = oldChildren.length

            let tailRange = oldChildren[oldChildrenLength - 1]._range

            for (let i = 0; i < newChildrenLength; i++) {
                const newChild = newChildren[i]
                const oldChild = oldChildren[i]

                if (i < oldChildrenLength) {
                    update(oldChild, newChild)
                } else {
                    const range = document.createRange()
                    range.setStart(tailRange.endContainer, tailRange.endOffset)
                    range.setEnd(tailRange.endContainer, tailRange.endOffset)
                    newChild[RENDER_TO_DOM](range)
                    tailRange = range
                }
            }
        }

        const vdom = this.vdom
        update(this._vdom, vdom)
        this._vdom = vdom
    }

    setState(newState) {
        if (newState === null && typeof this.state !== 'object') {
            this.state = newState
            this.reRender()
            return
        }
        const deepMerge = (oldState, newState) => {
            for (let k in newState) {
                if (oldState[k] === null || typeof oldState[k] !== 'object') {
                    oldState[k] = newState[k]
                } else {
                    deepMerge(oldState[k], newState[k])
                }
            }
        }
        deepMerge(this.state, newState)
        this.update()
    }
}

function replaceContent(range, node) {
    range.insertNode(node)
    range.setStartAfter(node)
    range.deleteContents()
    range.setStartBefore(node)
    range.setEndAfter(node)
}
class Element extends Component {
    constructor(type) {
        super(type)
        this.type = type
    }
    get vdom() {
        this.vchildren = this.children.map(v => v.vdom)
        return this
    }

    [RENDER_TO_DOM](range) {
        this._range = range
        const root = document.createElement(this.type)

        for (const name in this.props) {
            const value = this.props[name]
            if (name.match(/^on([\s\S]+)$/)) {
                root.addEventListener(RegExp.$1.replace(/^[\s\S]/, v => v.toLowerCase()), value)
            } else {
                if (name === 'className') {
                    root.setAttribute('class', value)
                } else {
                    root.setAttribute(name, value)
                }
            }
        }

        if (!this.vchildren)
            this.vchildren = this.children.map(v => v.vdom)

        for (const child of this.vchildren) {
            const childRange = document.createRange()
            childRange.setStart(root, root.childNodes.length)
            childRange.setEnd(root, root.childNodes.length)
            child[RENDER_TO_DOM](childRange)
        }

        replaceContent(range, root)
    }
}

class Text extends Component {
    constructor(content) {
        super(content)
        this.type = '#text'
        this.content = content
    }
    [RENDER_TO_DOM](range) {
        this._range = range

        replaceContent(range, document.createTextNode(this.content))

    }
    get vdom() {
        return this
    }
}



export const ce = (type, attributes, ...children) => {
    let e = typeof type === 'string' ? new Element(type) : new type()

    for (let v in attributes) {
        e.setAttribute(v, attributes[v])
    }

    let insertChildren = (children) => {
        for (let child of children) {
            if (child === null) continue
            if (typeof child === 'string') child = new Text(child)
            if (Array.isArray(child)) insertChildren(child)
            else e.appendChild(child)
        }
    }
    insertChildren(children)

    return e
}

export const render = (component, dom) => {
    const range = document.createRange()
    range.setStart(dom, 0)
    range.setEnd(dom, dom.childNodes.length)
    range.deleteContents()
    component[RENDER_TO_DOM](range)
}