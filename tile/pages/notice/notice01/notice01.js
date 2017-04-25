let config = require('../../../utils/config.js')
import { articles } from '../notice.data.js'

Page({
  data: {},

  onLoad: function (options) {
    let groupArticles = []
    for (let i in articles) {
      let article = articles[i]
      let groupId = article.groupId
      if (!groupArticles[groupId]) {
        groupArticles[groupId] = []
      }
      article = {
        id: article.id,
        time: article.time,
        title: article.title,
        image: config.imagesUrl + article.image,
        summary: article.summary
      }
      groupArticles[groupId].push(article)
    }
    let notices = []
    for (let i in groupArticles) {
      notices.push(groupArticles[i])
    }
    this.setData({
      notices: notices
    })
  },

  onItemTap: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../notice02/notice02?id=' + id
    })
  },
})