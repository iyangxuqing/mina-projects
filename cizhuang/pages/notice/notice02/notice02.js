let config = require('../../../utils/config.js')
import { articles } from '../notice.data.js'
import { style } from '../notice.data.js'

Page({
  data: {
    article: {}
  },
  onLoad: function (options) {
    let id = options.id
    let index = -1
    for (let i in articles) {
      let article = articles[i]
      if (article.id == id) {
        index = i
        break
      }
    }

    if (index < 0) return
    let article = JSON.parse(JSON.stringify(articles[index]))
    article.image = config.imagesUrl + article.image
    for (let i in article.contents) {
      let item = article.contents[i]
      if (item.image) {
        item.image = config.imagesUrl + item.image
      }
      if (item.style) {
        item.style = style[item.style].join('')
      }
    }
    this.setData({
      article: article
    })

  },
})