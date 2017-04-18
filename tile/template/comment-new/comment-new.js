import { http } from '../../utils/http.js'
var db = require("../../utils/db.js");

function commentNew(page) {
  page.setData({
    commentNew: {
      texts: '',
      photos: [],
      publishState: 'unpublish', //unpublish,publishing,published
    }
  })
  page.onCommentTextInput = onCommentTextInput
  page.onCommentPhotoAdd = onCommentPhotoAdd
  page.onCommentPhotoDel = onCommentPhotoDel
  page.onCommentPublish = onCommentPublish
  page.onCommentAdded = onCommentAdded
}

function onCommentAdded(e) {
  var that = this;
  db.getComments({
    success: function (res) {
      that.setData({
        comments: res,
        commentNew: {
          texts: '',
          photos: [],
          publishState: 'unpublish'
        }
      })
    }
  })
}

function onCommentTextInput(e) {
  var texts = e.detail.value;
  this.setData({
    'commentNew.texts': texts
  })
}

function onCommentPhotoAdd(e) {
  var that = this;
  wx.chooseImage({
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      var tempFilePaths = res.tempFilePaths;
      console.log(tempFilePaths);
      var photos = that.data.commentNew.photos;
      photos = photos.concat(tempFilePaths);
      photos = photos.slice(0, 9);
      that.setData({
        'commentNew.photos': photos
      })
    }
  })
}

function onCommentPhotoDel(e) {
  var index = e.currentTarget.dataset.index;
  var photos = this.data.commentNew.photos;
  photos.splice(index, 1);
  this.setData({
    'commentNew.photos': photos
  })
}

function onCommentPublish(e) {
  var commentNew = this.data.commentNew;
  if (!commentNew.text && !commentNew.photos.length) {
    console.log('the comment to be publish is empty');
    return;
  }

  /* 提交反馈(1) - 在发布评论按钮上显示loading */
  this.setData({
    'commentNew.publishState': 'publishing'
  })

  /* 提交反馈(2) - 显示带透明蒙层的toast loading */
  this.wetoast.toast({
    title: '正在提交',
    icon: 'loading',
    duration: 0
  })

  var that = this;
  publish({
    commentNew: commentNew,
    success: function (res) {
      that.setData({
        'commentNew.publishState': 'published'
      })
      that.wetoast.toast();
      that.onCommentAdded();
      // that.wetoast.toast({
      //   icon: 'success',
      //   title: '发布成功',
      //   success: function () {
      //     that.onCommentAdded();
      //   }
      // })
    },
    fail: function (res) {
      that.setData({
        'commentNew.publishState': 'unpublish'
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

}

function publish(option) {
  var commentNew = option.commentNew;
  http.upload({
    paths: commentNew.photos,
    success: function (res) {
      var uploadedFiles = res.uploadedFiles;
      var photoUrls = [];
      for (let i in uploadedFiles) {
        photoUrls.push(uploadedFiles[i].target)
      }
      var photoUrls = photoUrls.join(',');
      //将评论内容写入数据库
      http.get({
        url: 'mysql/commentAdd.php',
        data: {
          texts: commentNew.texts,
          photos: photoUrls,
          issueId: commentNew.issueId
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

module.exports = {
  commentNew: commentNew
}