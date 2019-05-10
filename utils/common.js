// 加载中Toast
const showLoading = (text) => {
  wx.showToast({
    title: text ? text : '加载中',
    icon: 'loading',
    duration: 120000
  })
}

const showLoadFailToast = () => {
  wx.showToast({
    title: "ƪ(‾ε‾“)ʃ 抱歉～加载失败 请稍后再试",
    icon: 'none',
    duration: 3000
  })
}

// 提示Toast
const showMsgToast = (text, icon, duration) => {
  wx.showToast({
    title: text ? text : '',
    icon: icon ? icon : 'none',
    duration: duration ? duration : 3000
  })
}

// 隐藏Toast
const hideLoading = () => {
  wx.hideToast()
}

module.exports = {
  showLoading: showLoading,
  showLoadFailToast: showLoadFailToast,
  showMsgToast: showMsgToast,
  showMsgToast: showMsgToast
}