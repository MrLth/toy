/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-06 16:37:36
 * @LastEditTime: 2021-08-06 16:39:09
 * @Description: file content
 */
function isInArray(target, arr) {
  if (!target && target === document.documentElement) {
    return false
  } else if (arr.indexOf(target) > -1) {
    return true
  } else {
    // return isInArray(target.parentElement,arr)
  }
}
function isScreen(target) {
  if (!target || !target.getBoundingClientRect) return false;
  var domTarget = target.getBoundingClientRect(), screenWidth = window.innerWidth, screenHeight = window.innerHeight;
  return domTarget.left >= 0 && domTarget.right < screenWidth && domTarget.top >= 0 && domTarget.bottom < screenHeight
}
var detailAll = []
new Promise(function (resolve, reject) {
  var observeDom = new MutationObserver(function (mutation) {
    if (!mutation.length) return;
    var detail = {
      time: performance.now(),
      rooList: []
    }
    mutation.forEach(function (ele) {
      if (!ele || !ele.addedNodes || !ele.addedNodes.forEach) return;
      ele.addedNodes.forEach(function (eleChild) {
        if (eleChild.nodeType === 1 && eleChild.nodeName !== "SCRIPT" && !isInArray(eleChild, detail.rooList)) {
          detail.rooList.push(eleChild)
        }
      })
    })
    if (detail.rooList.length) {
      detailAll.push(detail)
    }
  })
  observeDom.observe(document, {
    childList: true,
    subtree: true
  })
  setTimeout(function () {
    observeDom.disconnect()
    resolve(detailAll)
  }, 3000)
}).then(function (res) {
  var resultTime
  res.forEach(function (item) {
    for (var i = 0; i < item.rooList.length; i++) {
      if (isScreen(item.rooList[i])) {
        resultTime = item.time
      }
    }
  })
  window.performance.getEntriesByType('resource').forEach(function (it) {
    if (it.initiatorType === "img" && it.requestStart < resultTime && it.responseEnd > resultTime) {
      resultTime = it.responseEnd
    }
  })
  console.log(resultTime)
})