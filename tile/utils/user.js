function login(option) {
    var apiBaseUrl = 'https://yixing02.applinzi.com/api/';
    wx.login({
        success: function (res) {
            if (res.code) {
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
                                    data: res.data
                                })
                            }
                        } else {
                            wx.setStorageSync('token', '')
                            if (option && option.fail) {
                                option.fail({
                                    errNo: 1,
                                    errMsg: 'login error for get openId and session_key'
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
        }
    })
}

function getUserInfo(cb) {
    var that = this
    if (this.globalData.userInfo) {
        typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
        wx.login({
            success: function () {
                wx.getUserInfo({
                    success: function (res) {
                        that.globalData.userInfo = res.userInfo
                        typeof cb == "function" && cb(that.globalData.userInfo)
                        console.log(res.userInfo)
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

module.exports = {
    login: login,
    getUserInfo: getUserInfo
}