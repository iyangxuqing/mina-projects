import { TopTips } from '../../template/toptips/toptips.js'
import { UserInfo } from '../../template/userinfo/userinfo.js'
import { Mobile } from '../../template/mobile/mobile.js'

import { user } from '../../utils/user.js'

let app = getApp()

Page({
  data: {
    user: {},

    navbars: [
      {
        url: '',
        label: '装修地址',
        icon: '/images/icon/address.png',
        mark: '/images/icon/arrow-right.png',
      },
      {
        url: '',
        label: '我的收藏',
        icon: '/images/icon/address.png',
        mark: '/images/icon/arrow-right.png',
      },
      {
        url: '',
        label: '定金（以一抵二）',
        icon: '/images/icon/address.png',
        mark: '/images/icon/arrow-right.png',
      },
      {
        url: '',
        label: '活动通知',
        icon: '/images/icon/address.png',
        mark: '/images/icon/arrow-right.png',
      },
      {
        url: '',
        label: '关于东鹏',
        icon: '/images/icon/address.png',
        mark: '/images/icon/arrow-right.png',
      },
      {
        url: '',
        label: '联系客服',
        icon: '/images/icon/address.png',
        mark: '/images/icon/arrow-right.png',
      },
    ],

  },

  hide: function(e){
    console.log(e)
    wx.hideNavigationBarLoading();
  },

  onLoad: function (options) {
    app.listener.on('user', this.onUserNotify)
    this.topTips = new TopTips()
    this.userInfo = new UserInfo(app.user)
    this.mobile = new Mobile(app.user)
    console.log(this)
  },

  onUserNotify: function(user){
    this.userInfo.update(user)
  },

  onShow: function () {
    if (app.user) {
      let a = app.user.address
      console.log(app.user, a)
      let longAddress = a.province + a.city + a.district + a.detail
      this.setData({
        'user.address.longAddress': longAddress
      })
    }
  }

})