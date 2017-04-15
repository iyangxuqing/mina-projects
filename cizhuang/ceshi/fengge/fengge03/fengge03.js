import { ModelRoom } from '../modelRoom.data.js'

Page({

  data: {
  },

  onLoad: function (options) {
    let imagePath = ModelRoom.imagePath
    let data = ModelRoom.data
    let id = options.id
    let index = -1
    for (let i in data) {
      if (data[i].id == id) {
        index = i
        break
      }
    }
    if (index < 0) return

    let pid = data[index].pid
    let pTitle = ''
    for (let i in data) {
      if (data[i].id == pid) {
        pTitle = data[i].title
        break
      }
    }

    let title = data[index].title
    let images = data[index].images
    let desc = data[index].descs[0]
    images = images.map(function (image, i) {
      return imagePath + image
    })

    wx.setNavigationBarTitle({
      title: pTitle + ' - ' + title
    })
    this.setData({
      title: title,
      images: images,
      desc: desc
    })
  }

})