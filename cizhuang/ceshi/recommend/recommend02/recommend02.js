let config = require('../../../utils/config.js')
import { RecommendData } from '../recommend.data.js'

Page({
  data: {},

  onLoad: function (options) {
    let id = options.id
    let cid = options.cid
    let product = null
    for (let i in RecommendData.categories) {
      if (RecommendData.categories[i].id == cid) {
        let category = RecommendData.categories[i]
        for (let j in category.products) {
          if (category.products[j].id == id) {
            product = category.products[j]
            break;
          }
        }
        break;
      }
    }

    if (product) {
      let title = product.title
      let desc = product.desc
      let images = product.images
      images = images.map((image) => {
        return config.imagesUrl + image
      })
      wx.setNavigationBarTitle({
        title: '掌柜推荐 - ' + title,
      })
      this.setData({
        title: title,
        desc: desc,
        images: images
      })
    }

  },

})