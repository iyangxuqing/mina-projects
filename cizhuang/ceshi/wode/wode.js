import { TopTip } from '../../template/toptip/toptip.js'
import { UserInfo } from '../../template/userinfo/userinfo.js'

Page({
  data: {

    navbars: [
      {
        url: 'message/message',
        label: '我的信息',
        // icon: '/images/icon/address.png',
        mark: '/images/icon/arrow-right.png',
      },
      {
        url: 'Collection/Collection',
        label: '我的收藏',
        // icon: '/images/icon/address.png',
        mark: '/images/icon/arrow-right.png',
      },
      {
        url: 'dingjin/dingjin',
        label: '定金（以一抵二）',
        // icon: '/images/icon/address.png',
        mark: '/images/icon/arrow-right.png',
      },
      {
        url: 'notice/notice',
        label: '活动通知',
        // icon: '/images/icon/address.png',
        mark: '/images/icon/arrow-right.png',
      },
      {
        url: 'dongpeng/dongpeng',
        label: '关于东鹏',
        // icon: '/images/icon/address.png',
        mark: '/images/icon/arrow-right.png',
      }
    ],  
        url: '',
        label: '联系客服',
        // icon: '/images/icon/address.png',
        mark: '/images/icon/arrow-right.png',

  },

  onLoad: function (options) {
    this.topTip = new TopTip()
    this.userInfo = new UserInfo()
  },

})