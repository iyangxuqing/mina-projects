//app.js
var user = require("utils/user.js")
import { device } from 'utils/util.js'
import { debug } from 'utils/debug.js'

App({

  globalData: {
    token: null,
    userInfo: null,
    deviceInfo: null
  },

  debug: debug,
  login: user.login,
  getUserInfo: user.getUserInfo,
  getCryptUserInfo: user.getCryptUserInfo,

  onLaunch: function () {
    wx.clearStorage()
    this.login()
    device.getDeviceInfo(this)
  }

})