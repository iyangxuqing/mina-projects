import { TopTips } from '../../template/toptips/toptips.js'
import { UserInfo } from '../../template/userinfo/userinfo.js'
import { Mobile } from '../../template/mobile/mobile.js'

let app = getApp()

Page({
  data: {

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

  onLoad: function (options) {
    app.listener.on('user', this.onUserNotify)
    this.topTips = new TopTips()
    this.userInfo = new UserInfo(app.user)
    this.mobile = new Mobile(app.user)
  },

  onUserNotify: function (user) {
    this.userInfo.update(user)
    this.mobile.update(user)
    let a = user.address
    let longAddress = a.province + a.city + a.district + a.detail
    this.setData({
      'user.address.longAddress': longAddress
    })
  },

  onShow: function () {
    this.userInfo.update(app.user)
    this.mobile.update(app.user)
    if (app.user) {
      let a = app.user.address
      let longAddress = a.province + a.city + a.district + a.detail
      this.setData({
        'user.address.longAddress': longAddress
      })
    }
  }

})