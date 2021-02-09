/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-09 15:21:20
 * @LastEditTime: 2021-02-09 16:25:08
 * @Description: file content
 */
import { depsManager } from './mobx'

export function observer(target) {
  const nativeWill = target.prototype.componentWillMount
  const nativeDid = target.prototype.componentDidMount

  target.prototype.componentWillMount = function () {
    nativeWill && nativeWill.call(this)
    depsManager.collectStart()
  }

  target.prototype.componentDidMount = function () {
    nativeDid && nativeDid.call(this)
    depsManager.collectEnd(()=>{
      this.forceUpdate()
    })
  }
}