//app.js
var user = require("utils/user.js");

App({

  globalData: {
    userInfo: null
  },

  login: user.login,
  getUserInfo: user.getUserInfo,
  getCryptUserInfo: user.getCryptUserInfo,

  onLaunch: function () {
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    this.login();
  }

})