let config = require('../../../utils/config.js')
import { ModelRoomData } from '../modelRoom.data.js'

Page({
  data: {
    title: '',
    footTitle: '亲，已经到底了哦...'
  },

  onLoad: function (options) {
    let cid = options.cid
    let data = ModelRoomData
    for (let i in data) {
      if (data[i].id == cid) {
        let hImage = config.imagesUrl + data[i].hImage
        let title = data[i].title
        let desc = data[i].desc
        let logo = config.imagesUrl + data[i].logo
        wx.setNavigationBarTitle({
          title: '样板房 - ' + title
        })
        this.setData({
          hImage: hImage,
          title: title,
          desc: desc,
          logo: logo
        })
        break;
      }
    }
    let items = []
    for (let i in data) {
      if (data[i].pid == cid) {
        items.push({
          id: data[i].id,
          title: data[i].title,
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
      url: '../fengge03/fengge03?id=' + id
    })
  }

})