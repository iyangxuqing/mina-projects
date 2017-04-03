let http = require("../../utils/http.js")
import { TopTips } from "../../template/toptips/toptips.js"

let app = getApp()

Page({

  data: {
    address: {
      province: '浙江省',
      city: '金华市',
      district: '义乌市',
      detail: '',
    },
    cityPicker: {
      visible: false,
      title: '请选择',
      cancelText: '取消',
      confirmText: '确定',
      items: [],
      value: [10, 6, 7],
      maskAnimateCss: 'animate-fade-out',
      pickerAnimateCss: 'animate-slide-down'
    }
  },

  onLoad: function (e) {
    this.topTips = new TopTips()
    app.listener.on('user', this.onUserNotify)

    let address = this.data.address
    if (app.user && app.user.address.province) {
      address = app.user.address
    }
    this.setData({
      address: address
    })
    this.cityPickerInit(address)
  },

  onUserNotify: function (user) {
    let address = user.address
    if (!address.province) {
      address = this.data.address
    }
    this.setData({
      address: address
    })
    this.cityPickerInit(address)
    console.log(address)
  },

  onAddressCityPicker: function (e) {
    this.cityPickerShow()
  },

  onAddressDetailInputBlur: function (e) {
    let detail = e.detail.value
    this.setData({
      'address.detail': detail
    })
  },

  onAddressCancel: function (e) {
    wx.navigateBack()
  },

  onAddressConfirm: function (e) {
    let address = this.data.address
    http.post({
      url: 'user/setAddress.php',
      data: address,
      success: function (res) {
        if (!res.error) {
          app.user.address = address
          app.listener.trigger('user', app.user)
          this.topTips.show({
            type: 'success',
            text: '编辑的地址已经保存',
            success: function () {
              wx.navigateBack()
            }
          })
        } else {
          this.topTips.show({
            text: '保存地址出错，请重试'
          })
        }
      }.bind(this)
    })
  },

  onCityPickerChange: function (e) {
    let value = e.detail.value
    let items = this.getCityPickerItems(value)
    this.setData({
      'cityPicker.value': value,
      'cityPicker.items': items
    })
  },

  onCityPickerConfirm: function (e) {
    this.cityPickerHide()
    let value = this.data.cityPicker.value
    let items = this.data.cityPicker.items
    let province = items[0][value[0]]
    let city = items[1][value[1]]
    let district = items[2][value[2]]
    this.setData({
      'address.province': province,
      'address.city': city,
      'address.district': district
    })
  },

  onCityPickerCancel: function (e) {
    this.cityPickerHide()
  },

  cityPickerInit: function (options) {
    let province = options.province
    let city = options.city
    let district = options.district
    let value = this.getCityPickerValue({ province, city, district })
    let items = this.getCityPickerItems(value)
    this.setData({
      'cityPicker.value': value,
      'cityPicker.items': items
    })
  },

  cityPickerShow: function () {
    this.setData({
      'cityPicker.visible': true,
      'cityPicker.maskAnimateCss': 'animate-fade-in',
      'cityPicker.pickerAnimateCss': 'animate-slide-up'
    })
  },

  cityPickerHide: function () {
    this.setData({
      'cityPicker.maskAnimateCss': 'animate-fade-out',
      'cityPicker.pickerAnimateCss': 'animate-slide-down'
    })
    setTimeout(function () {
      this.setData({
        'cityPicker.visible': false
      })
    }.bind(this), 300)
  },

  getCityPickerItems: function (value = [0, 0, 0]) {
    let i = value[0]
    let j = value[1]
    let k = value[2]
    let provinces = wx.getStorageSync('citys')
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
      districtNames.push(districts[i].name)
    }
    return [provinceNames, cityNames, districtNames]
  },

  getCityPickerValue: function (address) {
    let iProvince = 0
    let provinces = wx.getStorageSync('citys')
    for (let i in provinces) {
      if (provinces[i].name == address.province) {
        iProvince = i
        break
      }
    }
    let iCity = 0
    let citys = provinces[iProvince].sub
    for (let i in citys) {
      if (citys[i].name == address.city) {
        iCity = i
        break
      }
    }
    let iDistrict = 0
    let districts = citys[iCity].sub
    for (let i in districts) {
      if (districts[i].name == address.district) {
        iDistrict = i
        break
      }
    }
    let value = [iProvince, iCity, iDistrict]
    return value
  }

})