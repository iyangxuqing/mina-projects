// pages/test/test.js
import { Toast } from "../../template/toast/toast.js"
import { Loading } from "../../template/loading/loading.js"
import { TopTip } from "../../template/toptip/toptip.js"

Page({
  data: {
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.toast = new Toast()
    this.loading = new Loading()
    this.topTip = new TopTip()
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
  show: function (e) {
    wx.getUserInfo({
      // withCredentials: false,
      success: function(res){
        console.log(res)
      }
    })
    
    // wx.openSetting({
    //   success: function(res){
    //     console.log(res)
    //   }
    // })

    // wx.getLocation({
    //   success: function(res){
    //     console.log(res)
    //   }
    // })
    // wx.chooseLocation({
    //   success: function(res){
    //     console.log(res)
    //   }
    // })
    // wx.startRecord({
    //   success: function(res){
    //     console.log(res)
    //   }
    // })
  }
})