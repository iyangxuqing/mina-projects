let http = require('../../utils/http.js')

let authDenyTimes = 0
const authDenyMessage = "因为距离上次拒绝授权的时间过短，无法再次获取授权。您可以稍后再试，也可以在删除本程序后重新进入，即可再次进行授权。"

let page = {}

let data = {
    userInfo: {
        avatarUrl: '/images/icon/user.png',
        nickName: '点击登录'
    }
}

let methods = {
    onUserInfoTap: function (e) {
        getUserInfoFromWeixin({
            success: function (userInfo) {
                console.log(getApp())
                Object.assign(getApp().user, userInfo)
                console.log(getApp())
                page.setData({
                    'userInfo.nickName': userInfo.nickName,
                    'userInfo.avatarUrl': userInfo.avatarUrl
                })
            }
        })
    }
}

function getUserInfoFromLocal(options) {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
        options.success && options.success(userInfo)
    }
}
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
function getUserInfoFromWeixin(options) {
    wx.login({
        success: function (res) {
            wx.getUserInfo({
                success: function (res) {
                    let userInfo = res.userInfo
                    wx.setStorageSync('userInfo', userInfo)
                    http.post({
                        url: 'login/setUser.php',
                        data: userInfo,
                    })
                    options.success && options.success(userInfo)
                },
                fail: function (res) {
                    getApp().debug.set('wx.getUserInfo fail', res)
                    if (res.errMsg == 'getUserInfo:fail auth deny') {
                        // ios静默拒绝
                        if (res.err_code == '-12006') {
                            page.topTips.show({
                                text: authDenyMessage,
                                multiLine: true,
                                duration: 15000,
                                showClose: true
                            })
                        }
                        // 开发平台静默拒绝
                        else {
                            authDenyTimes++
                            if (authDenyTimes > 1) {
                                page.topTips.show({
                                    text: authDenyMessage,
                                    multiLine: true,
                                    duration: 15000,
                                    showClose: true
                                })
                            }
                        }
                    }
                    // android静默拒绝
                    else if (res.errMsg == 'getUserInfo:fail') {
                        page.topTips.show({
                            text: authDenyMessage,
                            multiLine: true,
                            duration: 15000,
                            showClose: true
                        })
                    } else {
                        page.topTips.show({
                            text: '登录进行信息授权遇未知错误',
                            duration: 3000
                        })
                    }
                    options.fail && options.fail(res)
                }
            })
        },
        fail: function (res) {
            getApp().debug.set('wx.login fail', res)
            page.topTips.show({
                text: '登录服务器出错，请稍后重试。'
            })
        }
    })
}

export class UserInfo {
    constructor(options) {
        page = getCurrentPages().pop()
        this.init(options)
    }

    init(options) {
        let userInfo = data.userInfo
        if (options.nickName) {
            userInfo.nickName = options.nickName
        }
        if (options.avatarUrl) {
            userInfo.avatarUrl = options.avatarUrl
        }
        page.setData({
            userInfo: userInfo
        })
        for (let key in methods) {
            page['userInfo.' + key] = methods[key].bind(this)
            page.setData({
                ['userInfo.' + key]: 'userInfo.' + key
            })
        }
        getUserInfoFromLocal({
            success: function (userInfo) {
                page.setData({
                    userInfo: userInfo
                })
            }
        })
    }
}