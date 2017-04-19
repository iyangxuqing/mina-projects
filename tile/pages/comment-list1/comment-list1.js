import { http } from '../../utils/http.js'
import { Comment } from '../../utils/comment.js'

Page({
  data: {
  },

  onLoad: function (options) {

    let comment = new Comment()
    let that = this
    comment.get().then(function(comments){
      console.log(comments)
      that.setData({
        comments: comments
      })
    })

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