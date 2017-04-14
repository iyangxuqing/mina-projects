import { User } from '../../utils/user.js'

let data = {
    mobile: {
        icon: '/images/icon/address.png',
        label: '',
        codeIcon: '',
        codeLabel: '',
        verifiedIcon: '/images/icon/address.png',
        verifiedLabel: '手机号码',
        codeRequestText: '发送验证码',
        number: '',
        code: '',
        numberError: false,
        codeError: false,
        verified: false,
        codeInputVisible: true,
    }
}

let methods = {

    onNumberSubmit: function (e) {
        let page = getCurrentPages().pop()
        let number = e.detail.value.number
        if (number == '') return

        let codeRequestText = page.data.mobile.codeRequestText
        if (codeRequestText != '发送验证码') return

        var reg = /^1[3|4|5|7|8]\d{9}$/
        if (!reg.test(number)) {
            getApp().listener.trigger('tip', {
                type: 'error',
                title: '手机号码输入有误'
            })
            page.setData({
                'mobile.numberError': true
            })
            return
        }

        User.setUser({ mobile: number })
        User.mobileCodeRequest(number).then(function (res) {
            if (res.error == 'this mobile is used') {
                getApp().listener.trigger('tip', {
                    type: 'error',
                    title: '手机号码已被绑定'
                })
                page.setData({
                    'mobile.numberError': true
                })
            }
        })

        let second = 60
        page.setData({
            'mobile.codeRequestText': '60秒后重发'
        })
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

    onNumberInputFocus: function (e) {
        let page = getCurrentPages().pop()
        page.setData({
            'mobile.numberError': false
        })
    },

    onCodeInput: function (e) {
        let page = getCurrentPages().pop()
        page.setData({
            'mobile.code': e.detail.value
        })
    },

    onCodeInputFocus: function (e) {
        let page = getCurrentPages().pop()
        page.setData({
            'mobile.codeError': false
        })
    },

    onCodeRequest: function (e) {
        let page = getCurrentPages().pop()
        let number = page.data.mobile.number
        if (number == '') return
        let codeRequestText = page.data.mobile.codeRequestText
        if (codeRequestText != '发送验证码') return

        var reg = /^1[3|4|5|7|8]\d{9}$/
        if (!reg.test(number)) {
            getApp().listener.trigger('tip', {
                type: 'error',
                title: '手机号码输入有误'
            })
            page.setData({
                'mobile.numberError': true
            })
            return
        }

        User.mobileCodeRequest(number).then(function (res) {
            if (res.error == 'this mobile is used') {
                getApp().listener.trigger('tip', {
                    type: 'error',
                    title: '手机号码已被绑定'
                })
                page.setData({
                    'mobile.numberError': true
                })
            }
        })

        let second = 60
        page.setData({
            'mobile.codeRequestText': '60秒后重发'
        })
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
        let page = getCurrentPages().pop()
        let number = page.data.mobile.number
        let code = page.data.mobile.code
        if (code == '') return;

        User.mobileCodeVerify(number, code).then(function (res) {
            if (!res.error) {
                page.setData({
                    'mobile.codeInputAnimateCss': 'slideUp'
                })
                setTimeout(() => {
                    page.setData({
                        'mobile.verified': true,
                    })
                    User.setUser({
                        mobile: res.mobile,
                        mobileVerified: res.mobileVerified
                    }, false)
                }, 300)
            } else {
                page.setData({
                    'mobile.codeError': true
                })
                getApp().listener.trigger('tip', {
                    type: 'error',
                    title: '验证码错误'
                })
            }
        }.bind(this))
    }
}

export class Mobile {
    constructor() {
        this.init()
    }

    init() {
        let page = getCurrentPages().pop()
        let user = wx.getStorageSync('user') || {}
        let mobile = {
            number: user.mobile,
            verified: user.mobileVerified
        }
        mobile = Object.assign({}, data.mobile, mobile)
        page.setData({
            mobile: mobile
        })
        for (let key in methods) {
            page['mobile.' + key] = methods[key].bind(this)
            page.setData({
                ['mobile.' + key]: 'mobile.' + key
            })
        }
    }

    update() {
        let page = getCurrentPages().pop()
        let user = wx.getStorageSync('user') || {}
        let mobile = {
            number: user.mobile,
            verified: user.mobileVerified
        }
        page.setData({
            'mobile.number': mobile.number,
            'mobile.verified': mobile.verified
        })
    }
}