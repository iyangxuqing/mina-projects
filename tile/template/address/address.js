let http = require("../../utils/http.js")
import { CityPicker } from "../../template/citypicker/citypicker.js"

let data = {
    address: {
        province: '浙江省',
        city: '金华市',
        district: '义乌市',
        detail: ''
    }
}

let methods = {
    onDistrictSelect: function (e) {
        let page = getCurrentPages().pop()
        this.cityPicker.show({
            address: this.address,
            success: function (address) {
                this.update(address)
            }.bind(this)
        })
    },

    onDetailInputBlur: function (e) {
        let detail = e.detail.value
        this.address.detail = detail
        // page.setData({
        //     'address.detail': detail
        // })
    },

    onConfirm: function (e) {
        // wx.showToast({
        //     title: '地址已保存',
        //     icon: 'success',
        //     mask: true,
        // })
        // return;

        http.post({
            url: 'user/setAddress.php',
            data: this.address,
            success: function (res) {
                if (!res.error) {
                    let app = getApp()
                    app.listener.trigger('addressUpdated', this.address)
                    // getApp().user.address = this.address
                    // wx.showToast({
                    //     title: '地址已保存',
                    //     icon: 'success',
                    //     mask: true,
                    // })
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
        // wx.navigateBack()
        let app = getApp()
        app.listener.trigger('addressEditCancel')
    }
}

export class Address {
    constructor(options = {}) {
        this.address = {
            province: options.province || data.address.province,
            city: options.city || data.address.city,
            district: options.district || data.address.district,
            detail: options.detail || data.address.detail
        }
        this.init()
    }

    init() {
        let page = getCurrentPages().pop()
        this.update(this.address)
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

    update(options = {}) {
        let page = getCurrentPages().pop()
        this.address = {
            province: options.province || data.address.province,
            city: options.city || data.address.city,
            district: options.district || data.address.district,
            detail: options.detail || data.address.detail
        }
        let province = this.address.province
        let city = this.address.city
        let district = this.address.district
        let detail = this.address.detail
        let districts = province + ' ' + city + ' ' + district
        page.setData({
            'address.districts': districts,
            'address.detail': detail
        })
    }
}