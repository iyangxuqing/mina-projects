//app.js
import { user } from 'utils/user.js'
import { debug } from 'utils/debug.js'
import { Listener } from 'utils/event.js'
import { getCitys } from 'utils/citys.js'

App({

  debug: debug,

  onLaunch: function () {
    this.listener = new Listener()
    this.listener.on('userUpdate', this.onUserUpdate)
    setTimeout(function () {
      user.login()
      user.getSystemInfo()
    }, 0)
  },

  onUserUpdate: function () {
    console.log('abc')
  },

})