// pages/test/test.js
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  open: function () {
    wx.showToast({
      title: 'abc'
    })
  },
  open2: function () {
    setTimeout(function () {
      wx.showToast({
        title: 'abcd'
      })
    }, 1000)
  },
})