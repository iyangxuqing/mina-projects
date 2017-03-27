//app.js
import { user } from 'utils/user.js'
import { debug } from 'utils/debug.js'
import { device } from 'utils/device.js'

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