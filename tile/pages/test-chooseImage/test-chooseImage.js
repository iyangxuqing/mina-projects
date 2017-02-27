// pages/test-chooseImage/test-chooseImage.js
var Promise = require('../../utils/bluebird.min.js');
var config = require('../../utils/config.js');
var http = require('../../utils/http.js');

let app = getApp();

Page({
  data: {
    comment: {
      issueId: 'i2',
      text: '',
      photos: [],
      isPublishing: false,
      publishState: 'unpublish' //['unpublish', 'publishing', 'published']
    },
  },
  onLoad: function (options) {
    new app.WeToast();
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
  },

  onCommentTextInput: function (e) {
    var text = e.detail.value;
    this.setData({
      'comment.text': text
    })
  },

  onCommentTextBlur: function (e) {
    var text = e.detail.value;
    this.setData({
      'comment.text': text
    })
  },

  onCommentTextConfirm: function (e) {
    var text = e.detail.value;
    this.setData({
      'comment.text': text
    })
  },

  onCommentPhotoAdd: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        var photos = that.data.comment.photos;
        photos = photos.concat(tempFilePaths);
        photos = photos.slice(0, 9);
        that.setData({
          'comment.photos': photos
        })
      }
    })
  },

  onCommentPhotoDel: function (e) {
    var index = e.currentTarget.dataset.index;
    var photos = this.data.comment.photos;
    photos.splice(index, 1);
    this.setData({
      'comment.photos': photos
    })
  },

  onCommentPublish: function (e) {
    var comment = this.data.comment;
    if (!comment.text && !comment.photos.length) {
      console.log('the comment to be publish is empty');
      return;
    }

    /* 提交反馈(1) - 在发布评论按钮上显示loading */
    this.setData({
      'comment.publishState': 'publishing'
    })

    /* 提交反馈(2) - 显示带透明蒙层的toast loading */
    this.wetoast.toast({
      title: '正在提交',
      icon: 'loading',
      duration: 0
    })

    var that = this;

    this.publish({
      comment: comment,
      success: function (res) {
        that.setData({
          'comment.publishState': 'published'
        })
        that.wetoast.toast();
        that.wetoast.toast({
          icon: 'success',
          title: '发布成功',
          success: function () {
          }
        })
      },
      fail: function (res) {
        that.setData({
          'comment.publishState': 'unpublish'
        })
        that.wetoast.toast();
        if (res.errNo == 2) {
          //图片上传失败
          wx.showModal({
            title: '提示',
            content: '图片提交失败，评论没有发布',
            showCancel: false
          })
        } else if (res.errNo == 1) {
          wx.showModal({
            title: '提示',
            content: '发布评论失败，请稍后重试',
            showCancel: false
          })
        }
      }
    })

  },

  publish: function (option) {
    var comment = option.comment;
    http.upload({
      paths: comment.photos,
      success: function (res) {
        var uploadedFiles = res.uploadedFiles;
        var photoUrls = [];
        for (let i in uploadedFiles) {
          photoUrls.push(uploadedFiles[i].target)
        }
        //将评论内容写入数据库
        http.get({
          url: 'mysql/commentcreate.php',
          data: {
            text: comment.text,
            photos: photoUrls,
            issueId: comment.issueId
          },
          success: function (res) {
            if (!res.errNo) {
              if (option.success && typeof option.success == 'function') {
                option.success({
                  errNo: 0,
                  errMsg: '评论发表成功'
                })
              }
            } else {
              if (option.fail && typeof option.fail == 'function') {
                option.fail({
                  errNo: 1,
                  errMsg: '评论发表失败（在写数据库时发生错误）'
                })
              }
            }
          }
        })
      },
      fail: function (res) {
        if (option.fail && typeof option.fail == 'function') {
          option.fail({
            errNo: 2,
            errMsg: '图片上传失败'
          })
        }
      }
    })
  }

})