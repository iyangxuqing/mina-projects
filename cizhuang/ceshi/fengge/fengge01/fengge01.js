let config = require('../../../utils/config.js')
import { ModelRoomData } from '../modelRoom.data.js'

Page({
  data: {},

  onLoad: function (options) {
    let data = ModelRoomData
    for (let i in data) {
      if (data[i].id == 0) {
        let title = data[i].title
        let hImage = config.imagesUrl + data[i].hImage
        let logo = config.imagesUrl + data[i].logo
        this.setData({
          title: title,
          hImage: hImage,
          logo: logo
        })
        break;
      }
    }
    let items = []
    for (let i in data) {
      if (data[i].pid == 0) {
        items.push({
          id: data[i].id,
          title: data[i].title + "装修",
          thumb: config.imagesUrl + data[i].thumb
        })
      }
    }
    this.setData({
      items: items
    })
  },

  onItemTap: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/ceshi/fengge/fengge02/fengge02?cid=' + id
    })
  }

})