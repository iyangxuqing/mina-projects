// pages/test-comment-add/test-comment-add.js
let WeToast = require("../../template/wetoast/wetoast.js");
let commentNew = require("../../template/comment-new/comment-new.js");

Page({
  data:{
  },
  onLoad:function(options){
    WeToast.WeToast();
    commentNew.commentNew(this);
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})