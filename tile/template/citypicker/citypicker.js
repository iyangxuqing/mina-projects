let http = require('../../utils/http.js')

let page = null

let data = {
    visible: false,
    title: '请选择',
    cancelText: '取消',
    cancelCss: '',
    confirmText: '确定',
    confirmCss: '',
    items: [],
    value: [10, 6, 6],
    maskAnimateCss: 'animate-fade-out',
    pickerAnimateCss: 'animate-slide-down'
}

let methods = {
    onCancel: function (e) {
        this.hide()
    },

    onConfirm: function (e) {
        this.hide()
        let value = page.data.cityPicker.value
        let items = page.data.cityPicker.items
        let province = items[0][value[0]]
        let city = items[1][value[1]]
        let district = items[2][value[2]]
        if (this.success) {
            this.success({
                province,
                city,
                district
            })
        }
    },

    onChange: function (e) {
        let value = e.detail.value
        let items = this.getItems(value)
        page.setData({
            'cityPicker.items': items,
        })
        let self = this
        setTimeout(function () {
            page.setData({
                'cityPicker.value': value,
            })
        }, 100)
    },
}

export class CityPicker {

    constructor(options = {}) {
        page = getCurrentPages().pop()
        page.setData({
            cityPicker: Object.assign({}, data, options)
        })
        for (let key in methods) {
            if (methods.hasOwnProperty(key)) {
                page['cityPicker.' + key] = methods[key].bind(this)
                page.setData({
                    ['cityPicker.' + key]: 'cityPicker.' + key
                })
            }
        }
        this.init()
    }

    init() {
        let self = this
        this.getCitys(function (res) {
            self.citys = res
            let value = page.data.cityPicker.value
            let items = self.getItems(value)
            page.setData({
                'cityPicker.items': items
            })
        })
    }

    show(options = {}) {
        if (options.value) {
            page.setData({
                'cityPicker.value': options.value,
                'cityPicker.items': this.getItems(options.value)
            })
        }
        if (options.success) {
            this.success = options.success
        }
        page.setData({
            'cityPicker.visible': true,
            'cityPicker.maskAnimateCss': 'animate-fade-in',
            'cityPicker.pickerAnimateCss': 'animate-slide-up'
        })
    }

    hide() {
        page.setData({
            'cityPicker.maskAnimateCss': 'animate-fade-out',
            'cityPicker.pickerAnimateCss': 'animate-slide-down'
        })
        let self = this
        setTimeout(function () {
            page.setData({
                'cityPicker.visible': false
            })
        }, 300)
    }

    getItems(value = [0, 0, 0]) {
        let i = value[0]
        let j = value[1]
        let k = value[2]
        let provinces = this.citys
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
        return [provinceNames, cityNames, districtNames]
    }

    getCitys(success) {
        let citys = wx.getStorageSync('citys');
        if (citys) {
            success && success(citys)
        } else {
            http.get({
                url: 'address/getCitys.php?withcode=1',
                success: function (res) {
                    if (!res.error) {
                        wx.setStorageSync('citys', res)
                        success && success(res)
                    }
                }
            })
        }
    }
}