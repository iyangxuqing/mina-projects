import { Toast } from "../../template/toast/toast.js"
import { User } from "../../utils/user.js"

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
    this.toast = new Toast()
    app.listener.on('userUpdate', this.onUserUpdate)
    this.onUserUpdate()
  },

  onUserUpdate: function () {
    let user = wx.getStorageSync('user') || {}
    let address = user.address || {}
    if (!address.province) address = this.data.address
    this.setData({
      address: address
    })
    this.cityPickerInit(address)
  },

  onAddressCityPicker: function (e) {
    this.cityPickerShow()
  },

  onAddressCancel: function (e) {
    wx.navigateBack()
  },

  onAddressSubmit: function (e) {
    let address = this.data.address
    address.detail = e.detail.value.addressDetail
    User.setUser({ address: address })
    this.toast.show({
      icon: 'success',
      title: '地址已保存',
      success: function () {
        wx.navigateBack()
      }
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
    if (!provinces) return

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