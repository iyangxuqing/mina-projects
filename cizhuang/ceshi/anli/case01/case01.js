let config = require('../../../utils/config.js')
import { strTime } from '../../../utils/util.js'
import { caseData } from '../case.data.js'

Page({
  data: {},

  onLoad: function (options) {
    let imagesUrl = config.imagesUrl
    let items = []
    for (let i in caseData) {
      let data = caseData[i]
      let last = data.process[data.process.length - 1]
      let item = {
        id: data.id,
        title: data.subdistrict,
        subTitle: data.houseAddress,
        state: data.state,
        image: imagesUrl + data.image,
        time: strTime(last.strTime),
        desc: last.desc
      }
      items.push(item)
    }
    this.setData({
      items: items
    })
  },

  onItemTap: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../case02/case02?id=' + id
    })
  }

})