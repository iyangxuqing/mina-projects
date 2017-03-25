let http = require("../../utils/http.js")

export function mobile(options = {}) {
    let page = getCurrentPages().pop()
    page.setData({
        mobile: Object.assign(data, options)
    })
    Object.assign(page, methods)
}

let data = {
    version: 'version 1.0'
}

let methods = {

    onMobileNumberInputBlur: function (e) {
        this.setData({
            'mobile.number': e.detail.value
        })
    },

    onMobileNumberInputFocus: function (e) {
        this.setData({
            'mobile.numberError': false
        })
    },

    onMobileCodeInput: function (e) {
        this.setData({
            'mobile.code': e.detail.value
        })
    },

    onMobileCodeInputFocus: function (e) {
        this.setData({
            'mobile.codeError': false
        })
    },

    onMobileCodeRequest: function (e) {
        let that = this
        let second = that.data.mobile.second || ''
        if (second != '') return
        let number = that.data.mobile.number || ''
        if (number == '') return
        var reg = /^1[3|4|5|7|8]\d{9}$/
        if (!reg.test(number)) {
            that.setData({
                'mobile.numberError': true
            })
            that.toptips({
                text: '手机号码输入有误'
            })
            return
        }

        http.post({
            url: 'sms/codeRequest.php',
            data: {
                tplId: 29922,
                mobile: that.data.mobile.number
            },
            success: function (res) {
                // 手机号码已被其他微信账号绑定提示
                // 其他的验证码发送失败或成功都无需进行界面提示
                // 发送成功用户会收到验证码，用户接下来可以输入验证码
                // 发送失败了，60秒后用户可以选择重发或离开
                if (res.error == 'this mobile is used') {
                    that.setData({
                        'mobile.numberError': true
                    })
                    that.toptips({
                        text: '该手机号码已被其他用户绑定'
                    })
                }
            }
        })

        that.setData({
            'mobile.second': '60秒后重发'
        })
        let timer = setInterval(function () {
            let nSecond = parseInt(that.data.mobile.second)
            nSecond = nSecond - 1
            if (nSecond == 0) {
                that.setData({
                    'mobile.second': ''
                })
                clearInterval(timer)
            } else {
                if (nSecond < 10) nSecond = '0' + nSecond
                that.setData({
                    'mobile.second': nSecond + '秒后重发'
                })
            }
        }, 1000)
    },

    onMobileCodeConfirm: function (e) {
        let that = this
        let code = that.data.mobile.code || ''
        let number = that.data.mobile.number || ''
        if (code == '') return;
        http.post({
            url: 'sms/codeVerify.php',
            data: {
                code: code,
                mobile: number
            },
            success: function (res) {
                if (!res.error) {
                    that.setData({
                        'mobile.code': '',
                        'mobile.verified': true
                    })
                } else {
                    that.setData({
                        'mobile.codeError': true
                    })
                    that.toptips({
                        text: '验证码错误'
                    })
                }
            }
        })
    }
}