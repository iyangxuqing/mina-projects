import { toptips } from "../../template/toptips/toptips.js"
import { mobile } from "../../template/mobile/mobile.js"
let http = require('../../utils/http.js')

Page({
  data: {
  },

  onLoad: function (options) {
    toptips()
    mobile()
  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})