// pages/comment-list/comment-list.js
var util = require("../../utils/util.js");
var http = require("../../utils/http.js");
var db = require("../../utils/db.js");
var WeToast = require("../../template/wetoast/wetoast.js");
var commentNew = require("../../template/comment-new/comment-new.js");

Page({
  data: {
  },
  onLoad: function (options) {
    commentNew.commentNew(this);
    WeToast.WeToast();

    var that = this;
    db.getComments({
      success: function(res){
        that.setData({
          comments: res
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