// pages/testmobileverify/index.js
Page({
  data: {
    codeRequestText: '发送验证码',
    notifyMessage: '手机号码输入有误'
  },
  onLoad: function (options) {
  },
  onCodeRequest: function (e) {
    let that = this;

    let codeRequestText = that.data.codeRequestText;
    if (codeRequestText == '发送验证码') {
      let reserveSecond = 60;
      this.setData({
        codeRequestText: reserveSecond + '秒后重发'
      })

      let timer = setInterval(function () {
        let reserveSecond = parseInt(that.data.codeRequestText)
        reserveSecond = reserveSecond - 1
        if (reserveSecond == 0) {
          that.setData({
            codeRequestText: '发送验证码'
          })
          clearInterval(timer)
        } else {
          if(reserveSecond<10) reserveSecond = '0' + reserveSecond
          that.setData({
            codeRequestText: reserveSecond + '秒后重发'
          })
        }
      }, 1000)

    }
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
  }
})