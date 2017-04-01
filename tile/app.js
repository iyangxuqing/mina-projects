//app.js
import { user } from 'utils/user.js'
import { debug } from 'utils/debug.js'
import { device } from 'utils/device.js'
import { Listener } from 'utils/event.js'
import { getCitys } from 'utils/citys.js'

App({

  globalData: {
    token: null,
    userInfo: null,
    deviceInfo: null
  },

  debug: debug,
  login: user.login,
  getUserInfo: user.getUserInfo,
  getCryptUserInfo: user.getCryptUserInfo,

  onLaunch: function () {
    // wx.clearStorage()
    this.listener = new Listener()

    let app = this
    setTimeout(function () {
      user.login({
        success: function (user) {

          app.listener.trigger('user', user)

          app.user = user
          getCitys()
        }
      })
    }, 20000)
    device.getDeviceInfo(this)
  }

})