// pages/city/city.js

import { cityPicker } from "city-picker.js"

Page({
  data: {
  },

  testtap: function (e) {
    this.cityPicker.show()
  },

  onLoad: function (options) {
    cityPicker()
  },

  getAddress: function (value) {
    let i = value[0]
    let j = value[1]
    let k = value[2]
    let that = this
    let provinces = that.data.cityPicker.citys
    let province = provinces[i] || { name: '', code: '' }
    let citys = province && province.sub || []
    let city = citys && citys[j] || { name: '', code: '' }
    let districts = city && city.sub || []
    let district = districts && districts[k] || { name: '', code: '' }
    let provinceNames = []
    let cityNames = []
    let districtNames = []
    for (let i in provinces) {
      provinceNames.push(provinces[i].name)
    }
    for (let i in citys) {
      cityNames.push(citys[i].name)
    }
    for (let i in districts) {
      if (districts[i].name == '市辖区') continue
      districtNames.push(districts[i].name)
    }
    return {
      addressList: [
        provinceNames,
        cityNames,
        districtNames
      ],
      addressItem: {
        province: province.name,
        city: city.name,
        district: district.name
      }
    }
  },

  bindChange: function (e) {
    let that = this
    let value = e.detail.value
    console.log(value)
    let data = that.data.cityPicker.citys
    let lastValue = that.data.cityPicker.value
    let address = that.getAddress(value)
    console.log(address)
    that.setData({
      'cityPicker.items': address.addressList,
    })

    // if (lastValue[0] != value[0]) {
    //   value[1] = 0
    //   value[2] = 0
    // } else if (lastValue[1] != value[1]) {
    //   value[2] = 0
    // }

    setTimeout(function () {
      that.setData({
        'cityPicker.value': value,
      })
    }, 0)

  },

})