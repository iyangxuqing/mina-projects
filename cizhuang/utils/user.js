import { http } from 'http.js'

let authDenyTimes = 0

function updateLocalUser(options) {
    let user = wx.getStorageSync('user') || {}
    Object.assign(user, options)
    wx.setStorageSync('user', user)
    getApp().listener.trigger('userUpdate')
}

function updateRemoteUser(options) {
    if (options.address) {
        options.address_province = options.address.province || ''
        options.address_city = options.address.city || ''
        options.address_district = options.address.district || ''
        options.address_detail = options.address.detail || ''
    }
    delete options.address
    return new Promise(function (resolve, reject) {
        http.post({
            url: 'user/setUser.php',
            data: options
        }).then(function (res) {
            resolve(res)
        }).catch(function (res) {
            reject(res)
        })
    })
}

function login() {
    wx.login({
        success: function (res) {
            http.post({
                url: 'user/login.php',
                data: { code: res.code }
            }).then(function (res) {
                if (res.token) {
                    wx.setStorageSync('token', res.token)
                    delete res.token
                    updateLocalUser(res)
                }
            })
        }
    })
}

/*
    wx.getUserInfo在用户拒绝信息授权时，在不同平台上返回的错误信息有差别
    在android平台，在弹出授权对话框时拒绝授权，返回的是
    {"errMsg": "getUserInfo:fail auth deny"}
    在因已拒绝授权而不再弹出授权对话框时，返回的是
    {"errMsg":"getUserInfo:fail"}
    在iOS平台，在弹出授权对话框时拒绝授权，返回的是
    {"errMsg": "getUserInfo:fail auth deny"}
    在因已拒绝授权而不再弹出授权对话框时，返回的是
    {"errMsg":"getUserInfo:fail auth deny","err_code":"-12006"}
    在开发平台，则是无论弹出对话框还是静默拒绝，返回的都是
    {"errMsg": "getUserInfo:fail auth deny"}
*/
function getUserInfo() {
    wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
            setUser(res.userInfo)
        },
        fail: function (res) {
            let denyAgain = false
            if (res.errMsg == 'getUserInfo:fail auth deny') {
                if (res.err_code == '-12006') {
                    denyAgain = true //ios静默拒绝
                } else {
                    authDenyTimes++
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
        }
    })
}

function getCryptUserInfo() {
    wx.login({
        success: function (resLogin) {
            wx.getUserInfo({
                success: function (res) {
                    var data = {
                        "code": resLogin.code,
                        "raw_data": res.rawData,
                        "signature": res.signature,
                        "encrypted_data": res.encryptedData,
                        "iv": res.iv
                    }
                    http.post({
                        url: 'decrypt/wx_decrypt2.php',
                        data: data
                    }).then(function (res) {
                        updateUser(res)
                    })
                }
            })
        }
    })
}

function getUser() {
    http.get({
        url: 'user/getUser.php',
    }).then(function (res) {
        if (!res.error) {
            res.gender = res.gender == "1"
            res.mobileVerified = res.mobileVerified == "1"
            updateLocalUser(res)
        }
    })
}

function setUser(options, updateRemote = true) {
    updateLocalUser(options)
    if (updateRemote) updateRemoteUser(options)
}

function getSystemInfo() {
    let systemInfo = wx.getSystemInfoSync()
    wx.setStorageSync('systemInfo', systemInfo)
}

function mobileCodeRequest(number) {
    return new Promise(function (resolve, reject) {
        http.post({
            url: 'sms/codeRequest.php',
            data: {
                tplId: 29922,
                mobile: number
            }
        }).then(function (res) {
            resolve(res)
        }).catch(function (res) {
            reject(res)
        })
    })
}

function mobileCodeVerify(number, code) {
    return new Promise(function (resolve, reject) {
        http.post({
            url: 'sms/codeVerify.php',
            data: { code, number },
        }).then(function (res) {
            resolve(res)
        }).catch(function (res) {
            reject(res)
        })
    })
}

export var User = {
    login: login,
    getUser: getUser,
    setUser: setUser,
    getUserInfo: getUserInfo,
    getSystemInfo: getSystemInfo,
    mobileCodeRequest: mobileCodeRequest,
    mobileCodeVerify: mobileCodeVerify,
}