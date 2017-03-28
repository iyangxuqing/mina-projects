import { TopTips } from '../../template/toptips/toptips.js'
import { UserInfo } from '../../template/userinfo/userinfo.js'
import { Mobile } from '../../template/mobile/mobile.js'
import { CityPicker } from '../../template/citypicker/citypicker.js'

import { user } from '../../utils/user.js'

let app = getApp()

Page({
  data: {

    user: {
      gender: false,
      age: 23
    },

    navbars: [
      {
        url: '',
        label: '我的信息',
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

  updateData: function (scope, data) {
    let page = getCurrentPages().pop()
    for (let key in data) {
      page.setData({
        [`${scope}.${key}`]: data[key]
      })
    }
  },

  onLoad: function (options) {
    this.topTips = new TopTips()
    this.userInfo = new UserInfo(app.user)
    this.mobile = new Mobile(app.user)

    console.log(getApp())
  },

})