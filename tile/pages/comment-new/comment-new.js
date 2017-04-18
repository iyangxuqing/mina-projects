import { Toast } from '../../template/toast/toast.js'
import { Loading } from '../../template/loading/loading.js'

Page({
  data: {},

  onLoad: function (options) {
    this.toast = new Toast()
    this.loading = new Loading()
  },

  onCommentSubmit: function (e) {
    let commentText = e.detail.value.text
    let commentPhotos = this.data.photos
    this.setData({
      published: true
    })
    this.loading.show()
    this.loading.hide()
  },

  onCommentPhotoAdd: function (e) {
    var photos = this.data.photos || []
    wx.chooseImage({
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        photos = photos.concat(tempFilePaths);
        photos = photos.slice(0, 9);
        this.setData({
          'photos': photos
        })
      }.bind(this)
    })
  },

  onCommentPhotoDel: function (e) {
    let index = e.currentTarget.dataset.index
    var photos = this.data.photos;
    photos.splice(index, 1);
    this.setData({
      photos: photos
    })
  },

})