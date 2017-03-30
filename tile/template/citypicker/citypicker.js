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
    value: [0, 0, 0],
    maskAnimateCss: 'animate-fade-out',
    pickerAnimateCss: 'animate-slide-down'
}

let methods = {
    onCancel: function (e) {
        this.hide()
    },

    onConfirm: function (e) {
        this.hide()
        let value = this.value
        let items = this.items
        let province = items[0][value[0]]
        let city = items[1][value[1]]
        let district = items[2][value[2]]
        let address = {
            province: province,
            city: city,
            district: district
        }
        this.success && this.success(address)
    },

    onChange: function (e) {
        this.value = e.detail.value
        this.items = this.getItems(this.value)
        this.set({
            items: this.items,
            value: this.value
        })
    },
}

export class CityPicker {

    constructor(options = {}) {
        page = getCurrentPages().pop()
        this.scope = options.parentScope + '.cityPicker'
        this.address = options.address
        this.success = options.success
        this.set(data)
        for (let key in methods) {
            page[this.scope + '.' + key] = methods[key].bind(this)
            this.set({
                [key]: this.scope + '.' + key
            })
        }
        this.init()
    }

    init() {
        this.value = this.getValues(this.address)
        this.items = this.getItems(this.value)
        this.set({
            value: this.value,
            items: this.items
        })
    }

    show(options = {}) {
        let address = options.address
        this.value = this.getValues(address)
        this.items = this.getItems(this.value)
        this.set({
            value: this.value,
            items: this.items
        })
        if (options.success) {
            this.success = options.success
        }
        this.set({
            maskAnimateCss: 'animate-fade-in',
            pickerAnimateCss: 'animate-slide-up',
            visible: true,
        })
    }

    hide() {
        this.set({
            maskAnimateCss: 'animate-fade-out',
            pickerAnimateCss: 'animate-slide-down'
        })
        setTimeout(function () {
            this.set({
                visible: false
            })
        }.bind(this), 300)
    }

    set(options) {
        for (let key in options) {
            page.setData({
                [this.scope + '.' + key]: options[key]
            })
        }
    }

    getItems(value = [0, 0, 0]) {
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
            // if (districts[i].name == '市辖区') continue
            districtNames.push(districts[i].name)
        }
        return [provinceNames, cityNames, districtNames]
    }

    getValues(address) {
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
}