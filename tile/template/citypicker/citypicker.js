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
    value: [10, 6, 7],
    province: '浙江省',
    city: '金华市',
    district: '义乌市',
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
        if (this.success) {
            this.success({
                province,
                city,
                district
            })
        }
    },

    onChange: function (e) {
        this.value = e.detail.value
        this.items = this.getItems(this.value)
        this.set({
            items: this.items
        })
        let self = this
        setTimeout(function () {
            self.set({
                value: this.value
            })
        }, 100)
    },
}

export class CityPicker {

    constructor(options = {}) {
        page = getCurrentPages().pop()
        this.scope = options.parentScope + '.cityPicker'
        this.set(data)
        for (let key in methods) {
            page[this.scope + '.' + key] = methods[key].bind(this)
            this.set({
                [key]: this.scope + '.' + key
            })
        }
        this.init(options)
    }

    init(options) {
        let districts = {
            province: options.province || data.province,
            city: options.city || data.city,
            districts: options.district || data.district
        }
        let value = this.getValues(districts)
        let items = this.getItems(value)
        this.set({
            value: value,
            items: items
        })
    }

    show(options = {}) {
        // if (options.value) {
        //     page.setData({
        //         'cityPicker.value': options.value,
        //         'cityPicker.items': this.getItems(options.value)
        //     })
        // }
        // if (options.success) {
        //     this.success = options.success
        // }
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
        let self = this
        setTimeout(function () {
            self.set({
                visible: false
            })
        }, 300)
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
        let iProvince = -1
        let provinces = wx.getStorageSync('citys')
        for (let i in provinces) {
            if (provinces[i].name == address.province) {
                iProvince = i
                break
            }
        }
        let iCity = -1
        let citys = provinces[iProvince].sub
        for (let i in citys) {
            if (citys[i].name == address.city) {
                iCity = i
                break
            }
        }
        let iDistrict = -1
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