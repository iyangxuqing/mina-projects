let config = require('../../../utils/config.js')
import { strTime } from '../../../utils/util.js'
import { caseData } from '../case.data.js'

Page({
  data: {},

  onLoad: function (options) {
    let id = options.id
    let index = -1
    for (let i in caseData) {
      if (caseData[i].id == id) {
        index = i
        break
      }
    }
    if (index < 0) return

    let data = caseData[index]
    let title = data.style + ' - ' + data.subdistrict
    let state = data.state
    let items = []
    for (let i in data.process) {
      let process = data.process[i]
      items.push({
        time: process.strTime,
        desc: process.desc
      })
    }
    if (data.state != '完成') {
      items.push({
        desc: '未完待续'
      })
    }

    this.setData({
      id: id,
      title: title,
      items: items,
      state: state
    })

  },

  onItemTap: function (e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let lastIndex = this.data.items.length - 1
    if (this.data.state != '完成' && index == lastIndex) return
    wx.navigateTo({
      url: '../case03/case03?id=' + id + '&index=' + index
    })
  }

})