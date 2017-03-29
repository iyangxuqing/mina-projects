// pages/city/city.js
import { Address } from "../../template/address/address.js"

Page({
  data: {
  },

  onLoad: function (e) {

    let options = {
      address: {
        province: '浙江省',
        city: '金华市',
        district: '东阳市',
        detail: '江东南路750号'
      }
    }

    this.address = new Address(options)
    let system = wx.getSystemInfoSync()
  }

})