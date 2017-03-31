let http = require("../../utils/http.js")

let page = {}

let data = {
    mobile: {
        icon: '/images/icon/mobile.png',
        label: '',
        codeIcon: '',
        codeLabel: '',
        verifiedIcon: '/images/icon/mobile.png',
        verifiedLabel: '手机号码',
        codeRequestText: '发送验证码',
        number: '',
        code: '',
        numberError: false,
        codeError: false,
        verified: false
    }
}

let methods = {

    onNumberInputBlur: function (e) {
        page.setData({
            'mobile.number': e.detail.value
        })
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
        let number = page.data.mobile.number
        if (number == '') return
        let codeRequestText = page.data.mobile.codeRequestText
        if (codeRequestText != '发送验证码') return

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
                mobile: number
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

        let second = 60
        let timer = setInterval(function () {
            second--
            if (second == 0) {
                let codeRequestText = '发送验证码'
                page.setData({
                    'mobile.codeRequestText': codeRequestText
                })
                clearInterval(timer)
            } else {
                let codeRequestText = second + '秒后重发'
                if (second < 10) codeRequestText = '0' + codeRequestText
                page.setData({
                    'mobile.codeRequestText': codeRequestText
                })
            }
        }, 1000)
    },

    onCodeConfirm: function (e) {
        let code = page.data.mobile.code
        let number = page.data.mobile.number
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
                        'mobile.number': res.mobile,
                        'mobile.verified': true
                    })
                } else {
                    page = getCurrentPages().pop()
                    page.setData({
                        'mobile.codeError': true
                    })
                    page.topTips.show({
                        text: '验证码错误'
                    })
                }
            }.bind(this)
        })
    }
}

export class Mobile {
    constructor(options) {
        page = getCurrentPages().pop()
        this.init(options)
    }

    init(options) {
        if (options.mobile) {
            data.mobile.number = options.mobile
        }
        if (options.mobileVerified) {
            data.mobile.verified = options.mobileVerified
        }
        page.setData({
            mobile: data.mobile
        })
        for (let key in methods) {
            page['mobile.' + key] = methods[key].bind(this)
            page.setData({
                ['mobile.' + key]: 'mobile.' + key
            })
        }
    }

    getMobile() {

    }
}