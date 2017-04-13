import { User } from '../../utils/user.js'

let data = {
    userInfo: {
        avatarUrl: '/images/icon/user.png',
        nickName: '点击登录'
    }
}

let methods = {
    onUserInfoRequest: function (e) {
        User.getUserInfo()
    }
}

export class UserInfo {
    constructor() {
        this.init()
    }

    init() {
        this.update()
        let page = getCurrentPages().pop()
        for (let key in methods) {
            page['userInfo.' + key] = methods[key].bind(this)
            page.setData({
                ['userInfo.' + key]: 'userInfo.' + key
            })
        }
    }

    update() {
        let user = wx.getStorageSync('user') || {}
        let userInfo = data.userInfo
        if (user.nickName) {
            userInfo.nickName = user.nickName
        }
        if (user.avatarUrl) {
            userInfo.avatarUrl = user.avatarUrl
        }
        let page = getCurrentPages().pop()
        page.setData({
            userInfo: userInfo
        })
    }
}