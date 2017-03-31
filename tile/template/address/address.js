let http = require("../../utils/http.js")
import { CityPicker } from "../../template/citypicker/citypicker.js"

let page = null

let data = {}

let methods = {
    onDistrictSelect: function (e) {
        this.cityPicker.show({
            address: this.address,
            success: function (address) {
                Object.assign(this.address, address)
                let province = address.province
                let city = address.city
                let district = address.district
                let districts = province + ' ' + city + ' ' + district
                page.setData({
                    'address.districts': districts,
                })
            }.bind(this)
        })
    },

    onDetailInputBlur: function (e) {
        let detail = e.detail.value
        this.address.detail = detail
        page.setData({
            'address.detail': detail
        })
    },

    onConfirm: function (e) {
        http.post({
            url: 'user/setAddress.php',
            data: this.address,
            success: function (res) {
                if (!res.error) {
                    getApp().user.address = this.address
                    wx.showToast({
                        title: '地址已保存',
                        icon: 'success',
                        mask: true,
                        success: function () {
                            setTimeout(function () {
                                wx.navigateBack()
                            }, 1500)
                        }
                    })
                    // page.topTips.show({
                    //     type: 'success',
                    //     text: '编辑的地址已经保存',
                    //     success: function () {
                    //         wx.navigateBack()
                    //     }
                    // })
                } else {
                    wx.showModal({
                        title: '保存地址',
                        content: '在保存地址的过程中出错了，请重试...',
                        showCancel: false
                    })
                    // page.topTips.show({
                    //     text: '保存地址出错，请重试'
                    // })
                }
            }.bind(this)
        })
    },

    onCancel: function (e) {
        wx.navigateBack()
    }
}

export class Address {
    constructor(options = {}) {
        page = getCurrentPages().pop()
        this.address = JSON.parse(JSON.stringify(options));
        this.init()
    }

    init() {
        let province = this.address.province
        let city = this.address.city
        let district = this.address.district
        let detail = this.address.detail
        let districts = province + ' ' + city + ' ' + district
        page.setData({
            'address.districts': districts,
            'address.detail': detail
        })
        for (let key in methods) {
            page['address.' + key] = methods[key].bind(this)
            page.setData({
                ['address.' + key]: 'address.' + key
            })
        }
        let options = {
            parentScope: 'address',
            address: this.address
        }
        this.cityPicker = new CityPicker(options)
    }
}