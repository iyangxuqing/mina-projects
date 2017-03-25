import { TopTips } from '../../template/toptips/toptips.js'
import { UserInfo } from '../../template/userinfo/userinfo.js'

Page({
  data: {

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

  onLoad: function (options) {
    this.topTips = new TopTips()
    this.userInfo = new UserInfo()
  },

})