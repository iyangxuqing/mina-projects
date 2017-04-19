import { Toast } from '../../template/toast/toast.js'
import { TopTip } from '../../template/toptip/toptip.js'
import { Loading } from '../../template/loading/loading.js'
import { http } from '../../utils/http.js'

Page({
  data: {},

  onLoad: function (options) {
    this.toast = new Toast()
    this.topTip = new TopTip()
    this.loading = new Loading()
  },

  onCommentSubmit: function (e) {
    let text = e.detail.value.text
    let photos = this.data.photos
    if (!text && !photos) return

    this.loading.show()
    let that = this
    http.upload({
      paths: photos
    }).then(function (res) {
      let issueId = 0
      let photos = res.uploadedFiles.map((file) => {
        return file.target
      })
      http.post({
        url: 'comment/commentAdd.php',
        data: {
          texts: text,
          photos: photos,
          issueId: issueId
        }
      }).then(function (res) {
        if (!res.error) {
          // that.toast.show({
          //   icon: 'success',
          //   title: '发表成功',
          //   success: function () {
          //     wx.navigateBack()
          //   }
          // })
          that.topTip.show({
            type: 'success',
            title: '发表成功',
            success: function () {
              wx.navigateBack()
            }
          })
          that.setData({
            published: true
          })
        } else {
          // that.toast.show({
          //   icon: 'cancel',
          //   title: '发表失败'
          // })
          that.topTip.show({
            title: '发表失败',
            duration: 15000,
            showClose: true
          })
        }
        that.loading.hide()
      }).catch(function (res) {
        console.log(res)
        that.loading.hide()
      })
    }).catch(function (res) {
      console.log(res)
      that.loading.hide()
    })

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