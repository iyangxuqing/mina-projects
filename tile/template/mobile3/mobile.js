let http = require("../../utils/http.js")

let page = {}

let data = {
    version: 'version 1.0',
    icon: '/images/icon/address.png',
}

let methods = {

    onNumberInputBlur: function (e) {
        page.setData({
            'mobile.number': e.detail.value
        })
        // fixed
        this.number = e.detail.value
    },

    onNumberInputFocus: function (e) {
        page.setData({
            'mobile.numberError': false
        })
    },

    onCodeInput: function (e) {
        page.setData({
            'mobile.code': e.detail.value
        })
    },

    onCodeInputFocus: function (e) {
        page.setData({
            'mobile.codeError': false
        })
    },

    onCodeRequest: function (e) {
        let second = page.data.mobile.second || ''
        if (second != '') return
        let number = page.data.mobile.number || ''
        if (number == '') return
        var reg = /^1[3|4|5|7|8]\d{9}$/
        if (!reg.test(number)) {
            page.setData({
                'mobile.numberError': true
            })
            page.topTips.show({
                text: '手机号码输入有误',
            })
            return
        }

        http.post({
            url: 'sms/codeRequest.php',
            data: {
                tplId: 29922,
                mobile: page.data.mobile.number
            },
            success: function (res) {
                // 手机号码已被其他微信账号绑定提示
                // 其他的验证码发送失败或成功都无需进行界面提示
                // 发送成功用户会收到验证码，用户接下来可以输入验证码
                // 发送失败了，60秒后用户可以选择重发或离开
                if (res.error == 'this mobile is used') {
                    page.setData({
                        'mobile.numberError': true
                    })
                    page.topTips.show({
                        text: '该手机号码已被其他用户绑定'
                    })
                }
            }
        })

        page.setData({
            'mobile.second': '60秒后重发'
        })
        let timer = setInterval(function () {
            let nSecond = parseInt(that.data.mobile.second)
            nSecond = nSecond - 1
            if (nSecond == 0) {
                page.setData({
                    'mobile.second': ''
                })
                clearInterval(timer)
            } else {
                if (nSecond < 10) nSecond = '0' + nSecond
                page.setData({
                    'mobile.second': nSecond + '秒后重发'
                })
            }
        }, 1000)
    },

    onCodeConfirm: function (e) {
        let code = page.data.mobile.code || ''
        let number = page.data.mobile.number || ''
        if (code == '') return;
        http.post({
            url: 'sms/codeVerify.php',
            data: {
                code: code,
                mobile: number
            },
            success: function (res) {
                if (!res.error) {
                    page.setData({
                        'mobile.code': '',
                        'mobile.verified': true
                    })
                } else {
                    page.setData({
                        'mobile.codeError': true
                    })
                    page.topTips.show({
                        text: '验证码错误'
                    })
                }
            }
        })
    }
}

export class Mobile {
    constructor() {
        page = getCurrentPages().pop()
        this.init()
    }

    init() {
        page.setData({
            mobile: data
        })
        for (let key in methods) {
            page['mobile.' + key] = methods[key].bind(this)
            page.setData({
                ['mobile.' + key]: 'mobile.' + key
            })
        }
    }
}