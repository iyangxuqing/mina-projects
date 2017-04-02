import { TopTips } from "../../template/toptips/toptips.js"
import { Address } from "../../template/address/address.js"

let app = getApp()

Page({

  data: {
    addressEdit: 1
  },

  onLoad: function (e) {
    console.log(getCurrentPages())
    app.listener.on('user', this.onUserNotify)
    app.listener.on('addressUpdated', this.onAddressUpdated)
    app.listener.on('addressEditCancel', this.onAddressEditCancel)
    this.topTips = new TopTips()
    this.address = new Address(app.user && app.user.address)
  },

  onShow: function () {
    this.address.update(app.user && app.user.address)
  },

  onUserNotify: function (user) {
    this.address.update(user.address)
  },

  onAddressEditCancel: function () {
    setTimeout(function () {
      wx.navigateBack()
    }, 100)
  },

  onAddressUpdated: function (address) {
    console.log(address)
    // this.topTips.show({
    //   text: '地址保存成功',
    //   type: 'success',
    // })
    let pages = getCurrentPages()
    console.log(pages)
    wx.navigateBack()
    // wx.switchTab({
    //   url: '/pages/wode/wode',
    //   success: function(res){
    //     // success
    //   },
    //   fail: function(res) {
    //     // fail
    //   },
    //   complete: function(res) {
    //     // complete
    //   }
    // })
    // setTimeout(function () {
    // }, 1900)
  },

  testtap: function () {
    console.log('222')
    wx.switchTab({
      url: '/pages/wode/wode',
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  }

})