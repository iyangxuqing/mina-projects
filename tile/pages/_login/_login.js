// pages/_login/_login.js
var http = require("../../utils/http.js");

Page({
  data: {},
  onLoad: function (options) {
    // this.login({
    //   success: function (res) {
    //     console.log(res);
    //   },
    //   fail: function (res) {
    //     console.log(res);
    //   }
    // })
    // this.getUserInfo({
    //   success: function (res) {
    //     console.log(res);
    //   },
    //   fail: function (res) {
    //     console.log(res);
    //   }
    // })
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

  login: function (option) {
    var apiBaseUrl = 'https://yixing02.applinzi.com/api/';
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: apiBaseUrl + 'login/login.php',
            data: {
              code: res.code
            },
            success: function (res) {
              if (res.data.token) {
                wx.setStorageSync('token', res.data.token)
                if (option && option.success) {
                  option.success({
                    errNo: 0,
                    errMsg: '',
                    token: res.data.token,
                    data: res.data
                  })
                }
              } else {
                wx.setStorageSync('token', '')
                if (option && option.fail) {
                  option.fail({
                    errNo: 1,
                    errMsg: 'login error for get openId and session_key'
                  })
                }
              }
            },
            fail: function (error) {
              wx.setStorageSync('token', '')
              if (option && option.fail) {
                option.fail({
                  errNo: 2,
                  errMsg: 'login error for wx.login api'
                })
              }
            }
          })
        }
      }
    })
  },

  getUserInfo_2: function (cb) {
    wx.login({
      success: function (res) {
        if (res.code) {
          var code = res.code;
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo;
              var data = {
                code: code,
                raw_data: res.rawData,
                signature: res.signature,
                encrypted_data: res.encryptedData,
                "iv": res.iv
              };
              var apiBaseUrl = 'https://yixing02.applinzi.com/api/';
              wx.request({
                url: apiBaseUrl + 'decrypt/wx_decrypt.php',
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'token': wx.getStorageSync('token')
                },
                data: data,
                method: 'POST',
                success: function (res) {
                  console.log(res.data);
                },
                fail: function(error) {
                  console.log(error);
                }
              });
            }
          })
        }
      }
    })
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo;

        // 微信加密信息解密例程
        // var data = {
        //   "raw_data": res.rawData,
        //   "signature": res.signature,
        //   "encrypted_data": res.encryptedData,
        //   "iv": res.iv
        // };
        // var apiBaseUrl = 'https://yixing02.applinzi.com/api/';
        // wx.request({
        //   url: apiBaseUrl + 'decrypt/wx_decrypt.php',
        //   header: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     'token': wx.getStorageSync('token')
        //   },
        //   data: data,
        //   method: 'POST',
        //   success: function (res) {
        //     console.log(res.data);
        //   },
        //   fail: function(error) {
        //     console.log(error);
        //   }
        // });

      },
      fail: function (error) {
        if (option && option.fail) {
          option.fail({
            errNo: 1,
            errMsg: 'wx.getUserInfo api error'
          })
        }
      }
    });

  },

})