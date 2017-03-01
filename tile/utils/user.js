function login(option) {
    var apiBaseUrl = 'https://yixing02.applinzi.com/api/';
    wx.login({
        success: function (res) {
            wx.request({
                url: apiBaseUrl + 'login/login.php',
                data: {
                    code: res.code
                },
                success: function (res) {
                    if (res.data.token) {
                        wx.setStorageSync('token', res.data.token)
                        if (option && option.success) {
                            option.success({
                                errNo: 0,
                                errMsg: '',
                                token: res.data.token,
                            })
                        }
                    } else {
                        wx.setStorageSync('token', '')
                        if (option && option.fail) {
                            option.fail({
                                errNo: 1,
                                errMsg: 'login error for get openId'
                            })
                        }
                    }
                },
                fail: function (error) {
                    wx.setStorageSync('token', '')
                    if (option && option.fail) {
                        option.fail({
                            errNo: 2,
                            errMsg: 'login error for wx.login api'
                        })
                    }
                }
            })
        }
    })
}

function getUserInfo(cb) {
    if (this.globalData.userInfo) {
        if (typeof cb == "function") {
            cb(this.globalData.userInfo)
        }
    } else {
        var that = this
        wx.login({
            success: function () {
                wx.getUserInfo({
                    success: function (res) {
                        that.globalData.userInfo = res.userInfo
                        if (typeof cb == "function") {
                            cb(that.globalData.userInfo)
                        }
                    },
                    fail: function (error) {
                        console.log('wx.getUserInfo fail: ', error)
                    }
                })
            },
            fail: function (error) {
                console.log('wx.login fail: ', error)
            }
        })
    }
}

function getCryptUserInfo(cb) {
    var apiBaseUrl = 'https://yixing02.applinzi.com/api/'
    if (this.globalData.userInfo) {
        if (typeof cb == "function") {
            cb(this.globalData.userInfo)
        }
    } else {
        var that = this
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
                        wx.request({
                            url: apiBaseUrl + 'decrypt/wx_decrypt2.php',
                            header: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            data: data,
                            method: 'POST',
                            success: function (res) {
                                console.log(res.data);
                            },
                            fail: function (error) {
                                console.log(error);
                            }
                        })
                        that.globalData.userInfo = res.userInfo
                        if (typeof cb == "function") {
                            cb(that.globalData.userInfo)
                        }
                    }
                })
            }
        })
    }
}

module.exports = {
    login,
    getUserInfo,
    getCryptUserInfo
}