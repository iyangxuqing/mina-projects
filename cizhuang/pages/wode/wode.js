import { User } from '../../utils/user.js'
import { TopTip } from '../../template/toptip/toptip.js'
import { Toast } from '../../template/toast/toast.js'
import { UserInfo } from '../../template/userinfo/userinfo.js'
import { Mobile } from '../../template/mobile/mobile.js'

let app = getApp()

Page({
  data: {
    pageLoading: true,
    navbars: [
      {
        label: ''
      },
      {
        url: '#',
        label: '我的收藏',
        icon: '/images/icon/address.png',
      },
      {
        url: '#',
        label: '定金（以一抵二）',
        icon: '/images/icon/address.png',
      },
      {
        url: '#',
        label: '活动通知',
        icon: '/images/icon/address.png',
      },
      {
        label: ''
      },
      {
        url: '#',
        label: '关于东鹏',
        icon: '/images/icon/address.png',
      },
      {
        label: ''
      },
    ],
    contact: {
      label: '客服服务', 
      icon: '/images/icon/address.png',
    
    }
              
  },

  onLoad: function (e) {
    app.listener.on('tip', this.onTip)
    app.listener.on('userUpdate', this.onUserUpdate)
    this.topTip = new TopTip()
    this.toast = new Toast()
    this.userInfo = new UserInfo()
    this.mobile = new Mobile()
    this.addressUpdate()
    setTimeout(() => {
      this.setData({
        pageLoading: false
      })
    }, 300)
  },

  onTip: function (options) {
    this.topTip.show(options)
  },

  onUserUpdate: function () {
    this.userInfo.update()
    this.mobile.update()
    this.addressUpdate();
  },

  addressUpdate() {
    let user = wx.getStorageSync('user') || {}
    let address = user.address || {}
    let lAddress = ''
    if (address.detail) {
      lAddress = address.district + address.detail
    }
    this.setData({
      'address.lAddress': lAddress
    })
  }

})