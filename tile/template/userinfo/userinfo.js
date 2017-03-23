let http = require('../../utils/http.js')
import { messages } from '../../utils/messages.js'

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
                page.setData({
                    userInfo: userInfo
                })
            },
            fail: function (res) {
                let error = res.errMsg
                if (error == "getUserInfo:fail auth deny") {
                    let lastError = wx.getStorageSync('getUserInfoError')
                    wx.setStorageSync('getUserInfoErrMsg', res.errMsg)
                    if (lastError == error) {
                        messages.show(2001)
                    }
                }
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

function getUserInfoFromWeixin(options) {
    wx.login({
        success: function () {
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
                    options.fail && options.fail(res)
                }
            })
        }
    })
}

export class UserInfo {
    constructor() {
        page = getCurrentPages().pop()
        this.init()
    }

    init() {
        page.setData({
            userInfo: data.userInfo
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