let http = require("../../utils/http.js")
let data = {
    visible: false,
    title: '请选择',
    cancelText: '取消',
    confirmText: '确定',
    cancelCss: '',
    confirmCss: '',
    maskAnimateCss: 'animate-fade-out',
    pickerAnimateCss: 'animate-slide-down',
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    districts: [],
    onCancel: 'onCancel',
    onConfirm: 'onConfirm'
}

let methods = {

    onCancel: function (e) {
        let that = this
        that.setData({
            'cityPicker.maskAnimateCss': 'animate-fade-out',
            'cityPicker.pickerAnimateCss': 'animate-slide-down'
        })
        setTimeout(function () {
            that.setData({
                'cityPicker.visible': false
            })
        }, 300)
    },

    onConfirm: function (e) {
        let that = this
        that.setData({
            'cityPicker.maskAnimateCss': 'animate-fade-out',
            'cityPicker.pickerAnimateCss': 'animate-slide-down'
        })
        setTimeout(function () {
            that.setData({
                'cityPicker.visible': false
            })
        }, 300)
        if (that.options && that.options.success) {
            that.options.success(this.value)
        }
    },

    show: function (options = {}) {
        this.page.setData({
            'cityPicker.visible': true,
            'cityPicker.maskAnimateCss': 'animate-fade-in',
            'cityPicker.pickerAnimateCss': 'animate-slide-up'
        })
    }
}

export function cityPicker() {
    let page = getCurrentPages().pop()
    page.setData({
        cityPicker: data
    })
    http.get({
        url: 'address/getCitys.php?withcode=1',
        success: function (res) {
            page.setData({
                'cityPicker.provinces': res
            })
        }
    })
    page.cityPicker = {
        page: page,
        show: methods.show
    };
    Object.assign(page, methods)
}

