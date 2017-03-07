// pages/device/device.js
Page({
  data: {
    deviceInfo: [
      {
        key: '',
        value: ''
      }
    ]
  },
  onLoad: function (options) {
    let res = wx.getSystemInfoSync()
    var deviceInfo = []
    for (let i in res) {
      deviceInfo.push({
        key: i,
        value: res[i]
      })
    }
    this.setData({
      deviceInfo: deviceInfo
    })
    // 页面初始化 options为页面跳转所带来的参数
    // let that = this
    // let deviceInfo = wx.getSystemInfoSync()
    // this.setData({
    //   deviceInfo: deviceInfo
    // })
    // wx.getSystemInfo({
    //   success: function(res) {
    //     console.log(res);
    //     var deviceInfo = []
    //     for(let i in res){
    //       deviceInfo.push({
    //         key: i,
    //         value: res[i]
    //       })
    //     }
    //     that.setData({
    //       deviceInfo: deviceInfo
    //     })
    //   }
    // })
  },
  onReady: function () {
    // 页面渲染完成
    let res = wx.getSystemInfoSync()
    var deviceInfo = []
    for (let i in res) {
      deviceInfo.push({
        key: i,
        value: res[i]
      })
    }
    this.setData({
      deviceInfo: deviceInfo
    })
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