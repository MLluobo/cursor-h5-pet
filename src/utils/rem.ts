// 基准大小改回 37.5
const baseSize = 37.5

// 设置 rem 函数
function setRem() {
  // 基准宽度改回 375，因为使用 Vant 组件库
  const scale = document.documentElement.clientWidth / 375
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}

// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}

export {}
