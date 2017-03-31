import { TopTips } from "../../template/toptips/toptips.js"
import { Address } from "../../template/address/address.js"

Page({

  data: {},

  localAddress: {
    province: '浙江省',
    city: '金华市',
    district: '义乌市',
  },

  onLoad: function (e) {

    let user = getApp().user
    let address = user.address
    if(!address.province) address = this.localAddress
    this.topTips = new TopTips()
    this.address = new Address(address)
    let system = wx.getSystemInfoSync()

  }

})