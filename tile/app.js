//app.js
// let {WeToast} = require('template/wetoast/wetoast.js')

App({
  // WeToast: WeToast,
  
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // this.login();
    // this._getUserInfo();
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  login: function () {
    wx.login({
      success: function (res) {
        var apiBaseUrl = 'https://yixing02.applinzi.com/api/';
        wx.request({
          url: apiBaseUrl + 'login/login.php',
          data: { code: res.code },
          success: function (res) {
            var token = res.data.sessionId;
            wx.setStorageSync('token', token);
          }
        });
      }
    })
  },
  _getUserInfo: function (cb) {
    var apiBaseUrl = 'https://yixing02.applinzi.com/api/';
    wx.login({
      success: function () {

        wx.getUserInfo({
          success: function (res) {
            var userInfo = res.userInfo;
            var data = {
              "raw_data": res.rawData,
              "signature": res.signature,
              "encrypted_data": res.encryptedData,
              "iv": res.iv
            };
            wx.request({
              url: apiBaseUrl + 'decrypt/decrypt2.php',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'token': wx.getStorageSync('token')
              },
              data: data,
              method: 'POST',
              success: function (res) {
                console.log(res.data);
              }
            });
          },

          fail: function (error) {
            console.log('error:', error);
          }

        });

      },
      fail: function (error) {
        console.log('error:', error);
      }
    })

  },

  globalData: {
    userInfo: null
  }
})