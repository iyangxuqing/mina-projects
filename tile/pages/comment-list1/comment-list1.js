// pages/comment-list/comment-list.js
var http = require("../../utils/http.js");
var WeToast = require("../../template/wetoast/wetoast.js");
var commentNew = require("../../template/comment-new/comment-new.js");

Page({
  data: {
  },
  onLoad: function (options) {
    commentNew.commentNew(this);
    WeToast.WeToast();

    var that = this;
    http.get({
      url: 'mysql/commentget.php',
      success: function(res){
        var comments = res;
        for(var i in comments){
          comments[i].photos = comments[i].photos.split(",");
        }
        that.setData({
          comments: comments
        })
      }
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