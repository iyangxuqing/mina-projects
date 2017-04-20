//app.js
import { Listener } from 'utils/event.js'
import { User } from 'utils/user.js'
import { Citys } from 'utils/citys.js'

App({

  onLaunch: function () {
    this.listener = new Listener()
    setTimeout(function () {
      // User.login()
      User.getSystemInfo()
      Citys.getCitys()      
    }, 0)
  },

})