// pages/testmobileverify/index.js
let http = require('../../utils/http.js')

Page({
  data: {
    mobileVerified: false
  },
  onLoad: function (options) {
  },

  onMobileInputBlur: function (e) {
    let mobile = e.detail.value
    this.setData({
      mobileVerifyNumber: mobile
    })
  },

  onMobileInputFocus: function (e) {
    this.setData({
      notifyMessage: ''
    })
  },

  onCodeInput: function (e) {
    let code = e.detail.value
    this.setData({
      mobileVerifyCode: code
    })
  },

  onCodeInputBlur: function (e) {
    let code = e.detail.value
    this.setData({
      mobileVerifyCode: code
    })
  },

  onCodeRequest: function (e) {
    let that = this
    let reserveSecond = that.data.reserveSecond || ''
    if (reserveSecond != '') return
    let mobile = that.data.mobileVerifyNumber || ''
    if (mobile == '') return

    var reg = /^1[3|4|5|7|8]\d{9}$/
    if (!reg.test(mobile)) {
      that.setData({
        notifyMessage: '手机号码有误'
      })
      return
    }

    http.get({
      url: 'sms/codeRequest.php',
      data: {
        tplId: 29922,
        mobile: that.data.mobileVerifyNumber
      },
      success: function (res) {
        console.log('sms/codeRequest success', res)
      },
      fail: function (res) {
        console.log('sms/codeRequest fail', res)
      }
    })

    this.setData({
      reserveSecond: '60秒后重发'
    })
    let timer = setInterval(function () {
      let reserveSecond = parseInt(that.data.reserveSecond)
      reserveSecond = reserveSecond - 1
      if (reserveSecond == 0) {
        that.setData({
          reserveSecond: 0
        })
        clearInterval(timer)
      } else {
        if (reserveSecond < 10) reserveSecond = '0' + reserveSecond
        that.setData({
          reserveSecond: reserveSecond + '秒后重发'
        })
      }
    }, 1000)
  },

  onCodeConfirm: function (e) {
    let that = this
    let mobile = that.data.mobileVerifyNumber || ''
    let code = that.data.mobileVerifyCode || ''
    if (code == '') return;
    http.get({
      url: 'sms/codeVerify.php',
      data: {
        code: code,
        mobile, mobile
      },
      success: function (res) {
        if (!res.error) {
          that.setData({
            mobileVerifyCode: '',
            mobileVerified: true
          })
        }
      }
    })
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