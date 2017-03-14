// pages/testmobileverify/index.js
let http = require('../../utils/http.js')

Page({
  data: {
    codeRequestText: '发送验证码',
    notifyMessage: '手机号码输入有误',
    verifyMobile: '',
    mobileTestError: false,
  },
  onLoad: function (options) {
  },

  onMobileInputBlur: function(e){
    let mobile = e.detail.value
    this.data.verifyMobile = mobile
    this.data.mobileVerifyNumber = mobile
  },
  onCodeInputBlur: function(e){
    let code = e.detail.value
    this.data.mobileVerifyCode = code
  },
  onMobileVerifyConfirm: function(e){
    let that = this
    let mobile = that.data.mobileVerifyNumber
    let code = that.data.mobileVerifyCode
    console.log(mobile, code)
    http.get({
      url: 'sms/codeVerify.php',
      data: {
        code: code,
        mobile, mobile
      },
      success: function(res){
        console.log(res)
      }
    })
  },

  onCodeRequest: function (e) {
    let that = this;
    let verifyMobile = that.data.verifyMobile
    if(verifyMobile == ''){
      return
    }

    var reg = /^1[3|4|5|7|8]\d{9}$/
    if(!reg.test(verifyMobile)){
      that.setData({
        mobileTestError: true
      })
      return
    } else {
      that.setData({
        mobileTestError: false
      })
    }
    let codeRequestText = that.data.codeRequestText;
    if (codeRequestText != '发送验证码') return;

    http.get({
      url: 'sms/codeRequest.php',
      data: {
        tplId: 29922,
        mobile: that.data.mobileVerifyNumber
      },
      success: function(res){
        console.log('sms/codeRequest success', res)
      },
      fail: function(res){
        console.log('sms/codeRequest fail', res)
      }
    })

    // wx.request({
    //   url: 'https://yixing02.applinzi.com/api/sms/sendCode.php',
    //   data:{
    //     tplId: 29922,
    //     mobile: that.data.verifyMobile
    //   },
    //   success: function(res){
    //     if(res.data.code){
    //       //验证码发送成功后，用户手机接收到还需要一段时间，也可能接收不到
    //       //所以这里不需要任何处理，只需静等用户输入验证码
    //     } else {
    //       console.log('sms send code error')
    //       console.log(res)
    //     }
    //   },
    //   fail: function(res){
    //     console.log('sms send code fail')
    //     //直接静默，用户可以重复验证码或退出到其它页面
    //   }
    // })

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