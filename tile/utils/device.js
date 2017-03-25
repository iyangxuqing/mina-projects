function getDeviceInfo(app, cb) {
  let deviceInfo = wx.getStorageSync('deviceInfo')
  if (deviceInfo) {
    wx.setStorageSync('deviceInfo', deviceInfo)
    app.globalData.deviceInfo = deviceInfo
    cb && cb(deviceInfo)
  } else {
    wx.getSystemInfo({
      success: function (res) {
        let deviceInfo = res
        wx.setStorageSync('deviceInfo', deviceInfo)
        app.globalData.deviceInfo = deviceInfo
        cb && cb(deviceInfo)
      }
    })
  }
}

export var device = {
  getDeviceInfo: getDeviceInfo
}