// pages/test-comment-add/test-comment-add.js
let WeToast = require("../../template/wetoast/wetoast.js");
let commentNew = require("../../template/comment-new2/comment-new.js");
var emitter = require("../../utils/event.js");

Page({
  data:{
    at: 'at01',
  },
  onLoad:function(options){

    Object.assign(this, new emitter.Emitter())
    console.log(this);

    // WeToast.WeToast();
    // commentNew.commentNew(this);
    // console.log(commentNew.commentNewObject);
    // Object.assign(this, commentNew.commentNewObject);
    // console.log(this);
    // this.onAbc();
    // console.log(this.data);
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