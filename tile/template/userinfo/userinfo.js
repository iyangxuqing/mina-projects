let http = require('../../utils/http.js')

let app = getApp()

let authDenyTimes = 0
const authDenyMessage = "因为距离上次拒绝授权的时间过短，无法再次获取授权。您可以稍后再试，也可以在删除本程序后重新进入，即可再次进行授权。"

let data = {
    userInfo: {
        avatarUrl: '/images/icon/user.png',
        nickName: '点击登录'
    }
}

let methods = {
    onUserInfoTap: function (e) {
        getUserInfo({
            success: function (userInfo) {
                app.listener.trigger('userInfo', userInfo)
                if (!app.user) app.user = {}
                Object.assign(app.user, userInfo)
                let page = getCurrentPages().pop()
                page.setData({
                    'userInfo.nickName': userInfo.nickName,
                    'userInfo.avatarUrl': userInfo.avatarUrl
                })
            }
        })
    }
}

// function getUserInfoFromLocal(options) {
//     let userInfo = wx.getStorageSync('userInfo')
//     if (userInfo) {
//         options.success && options.success(userInfo)
//     }
// }
/*
    wx.getUserInfo在用户拒绝信息授权时，在不同平台上返回的错误信息有差别
    在android平台，在弹出授权对话框时拒绝授权，返回的是
    {"errMsg": "getUserInfo:fail auth deny"}
    在应已拒绝授权而不再弹出授权对话框时，返回的是
    {"errMsg":"getUserInfo:fail"}
    在iOS平台，在弹出授权对话框时拒绝授权，返回的是
    {"errMsg": "getUserInfo:fail auth deny"}
    在应已拒绝授权而不再弹出授权对话框时，返回的是
    {"errMsg":"getUserInfo:fail auth deny","err_code":"-12006"}
    在开发平台，则是无论弹出对话框还是静默拒绝，返回的都是
    {"errMsg": "getUserInfo:fail auth deny"}
*/
function getUserInfo(options) {
    wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
            options.success && options.success(res.userInfo)
        },
        fail: function (res) {
            console.log(res)
            let denyAgain = false
            if (res.errMsg == 'getUserInfo:fail auth deny') {
                if (res.err_code == '-12006') {
                    denyAgain = true //ios静默拒绝
                } else {
                    authDenyTimes++
                    console.log(authDenyTimes)
                    if (authDenyTimes > 1) {
                        denyAgain = true //开发平台静默拒绝
                    }
                }
            } else if (res.errMsg == 'getUserInfo:fail') {
                denyAgain = true //android静默拒绝
            }
            if (denyAgain) {
                wx.openSetting({
                    success: function (res) {
                        if (res.authSetting['scope.userInfo']) {
                            getUserInfo(options)
                        }
                    }
                })
            }
            options.fail && options.fail(res)
        }
    })
}

export class UserInfo {
    constructor(options) {
        this.init(options)
    }

    init(options) {
        this.update(options)
        let page = getCurrentPages().pop()
        for (let key in methods) {
            page['userInfo.' + key] = methods[key].bind(this)
            page.setData({
                ['userInfo.' + key]: 'userInfo.' + key
            })
        }
    }

    update(options) {
        let userInfo = data.userInfo
        if (options && options.nickName) {
            userInfo.nickName = options.nickName
        }
        if (options && options.avatarUrl) {
            userInfo.avatarUrl = options.avatarUrl
        }
        let page = getCurrentPages().pop()
        page.setData({
            userInfo: userInfo
        })
    }
}