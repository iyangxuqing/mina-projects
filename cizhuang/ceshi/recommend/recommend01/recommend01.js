let config = require('../../../utils/config.js')
import { RecommendData } from '../recommend.data.js'

Page({
  data: {},

  onLoad: function (options) {
    let hImages = RecommendData.images
    hImages = hImages.map((image) => {
      return config.imagesUrl + image
    })
    let categories = RecommendData.categories
    let lists = []
    for (let i in categories) {
      let category = categories[i]
      let id = category.id
      let title = category.title
      let subTitle = category.subTitle
      let items = []
      for (let j in category.products) {
        let product = category.products[j]
        let item = {
          id: product.id,
          title: product.title,
          code: product.code,
          size: product.size,
          thumb: config.imagesUrl + product.thumb
        }
        items.push(item)
      }
      let list = {
        id: id,
        title: title,
        subTitle: subTitle,
        items: items
      }
      lists.push(list)
    }
    this.setData({
      hImages: hImages,
      lists: lists
    })
  },

  onItemTap: function (e) {
    let id = e.currentTarget.dataset.id
    let cid = e.currentTarget.dataset.cid
    wx.navigateTo({
      url: '../recommend02/recommend02?id=' + id + '&cid=' + cid
    })
  }
})