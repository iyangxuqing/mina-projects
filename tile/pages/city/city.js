// pages/city/city.js
import { TopTips } from "../../template/toptips/toptips.js"
import { Address } from "../../template/address/address.js"

Page({
  data: {
  },

  onLoad: function (e) {

    setTimeout(function () {

      let user = getApp().user
      let address = {
        address: {
          province: user.address_province || '浙江省',
          city: user.address_city || '金华市',
          district: user.address_district || '义乌市',
          detail: user.address_detail || ''
        }
      }

      this.topTips = new TopTips()
      this.address = new Address(address)
      let system = wx.getSystemInfoSync()

    }.bind(this), 1000)

  }

})