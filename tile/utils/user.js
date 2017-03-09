const apiBaseUrl = 'https://yixing02.applinzi.com/api/';

function login() {
    wx.login({
        success: function (res) {
            wx.request({
                url: apiBaseUrl + 'login/login.php',
                data: { code: res.code },
                success: function (res) {
                    if (res.data.token) {
                        wx.setStorageSync('token', res.data.token)
                        wx.setStorageSync('openId', res.data.openId)
                    }
                }
            })
        }
    })
}

/*
    对于login，它的目的就是取得openId或与其对应的token。
    在获取上述信息过程中，有可能在wx.login阶段出现fail，这是微信服务器出错。
    也有可能在获取openId或token中出现fail，这是应用服务器出错。
    这种出错概率极低。编码初期可以不用考虑过多，待后期问题出现时再行解决。
    编码初期，主要任务是搭建好应用的框架。
    再说凭主观想象的问题去解决将来才遇到的问题，不是一个正确的工作方法。
    token保存在本地，就是一个刷新机制。
    每次应用onLaunch时login一次，如果成功则刷新本地的token。
    如果失败，则继续使用上次的token。
    这样也就大大减低了token无效的概率。
    对于需要token而又token无效的情况，
    可以采用界面提示重试的方式进行交互。
    这可以在具体业务场景中进行处理，
    如果这种处理具有普遍性，可在行抽离编码。
*/

/*
    对于应用api，在其调用时，可能存在服务器响应或网络的错误。
    这时，wx.request直接返回fail。
    也可能出现业务流程错误，得不到预定的结果。
    这时，wx.request是返回success的。
    对于第一种情况，可以简单的统一处理：
    在界面提示“遇到服务器或网络故障，请重试”，然后终止操作。
    对于第二种情况，一般应该按照业务逻辑进行相应的处理。
    对于api的返回值，应当有一个统一的标准：
    当业务流程正确，得到了预定的结果，可以直接返回业务数据。
    比如token，返回结果后可以直接检测if(res.token)。
    由于其没有附带error字段，也可以通过if(!res.error)来检测。
    当业务流程错误时，不再返回预定数据字段(null或unset)。
    应当返回一个error对象，可以使简单字符串或对象。
    可以使用if(res.error){console.log(res.error)}来检测和调试。
*/

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
                        console.log(res.userInfo);
                        console.log(res.userInfo.avatarUrl.length);
                        wx.request({
                            url: apiBaseUrl + 'login/user.php?m=setUserInfo',
                            header: {
                                token: wx.getStorageSync('token')
                            },
                            data: res.userInfo,
                            success: function(res){
                                console.log(res);
                            }
                        })
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