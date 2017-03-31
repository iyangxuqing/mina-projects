let http = require('http.js')

let authDenyTimes = 0
const authDenyMessage = "因为距离上次拒绝授权的时间过短，无法再次获取授权。您可以稍后再试，也可以在删除本程序后重新进入，即可再次进行授权。"

function login(options) {
    wx.login({
        success: function (res) {
            http.get({
                silent: true,
                url: 'user/login.php',
                data: { code: res.code },
                success: function (res) {
                    if (res.token) {
                        wx.setStorageSync('user', res)
                        wx.setStorageSync('token', res.token)
                        options.success && options.success(res)
                    }
                },
            })
        },
        fail: function (res) {
            getApp().debug.set('wx.login fail', res)
        }
    })
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
function getUserInfo(options) {
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

function getCryptUserInfo(cb) {
    wx.login({
        success: function (resLogin) {
            wx.getUserInfo({
                success: function (res) {
                    let userInfo = res.userInfo
                    var data = {
                        "code": resLogin.code,
                        "raw_data": res.rawData,
                        "signature": res.signature,
                        "encrypted_data": res.encryptedData,
                        "iv": res.iv
                    }
                    http.post({
                        url: 'decrypt/wx_decrypt2.php',
                        data: data,
                        success: function (res) {
                            console.log(res)
                        }
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

function getUser(options = {}) {
    http.get({
        url: 'login/getUser.php',
        data: options.data,
        success: function (res) {
            if (res.gender) {
                res.gender = res.gender == "1"
            }
            if (res.mobileVerified) {
                res.mobileVerified = res.mobileVerified == "1"
            }
            let address = {
                province: res.address_province,
                city: res.address_city,
                district: res.address_district,
                detail: res.address_detail
            }
            console.log(res)
            res.address = address
            console.log(res)
            delete res.address_province
            delete res.address_city
            delete res.address_district
            delete res.address_detail
            console.log(res)
            options.success && options.success(res)
        }
    })
}

function setUser(options = {}) {
    http.post({
        url: 'login/setUser.php',
        data: options.data,
        success: function (res) {
            options.success && options.success(res)
        }
    })
}

export var user = {
    login: login,
    getUser: getUser,
    setUser: setUser,
}