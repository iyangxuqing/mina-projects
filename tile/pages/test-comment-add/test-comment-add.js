// pages/test-comment-add/test-comment-add.js
let commentNew = require("../../template/comment-new2/comment-new.js");
var {Event} = require("../../utils/event.js");

Page({
  data:{
    at: 'at01',
  },
  abcfn: function(c){
    console.log('abcfn');
  },
  abdfn: function(d){
    console.log('abdfn');
  },
  abefn: function(ee){
    console.log('abefn');
  },
  onLoad:function(options){
    Object.assign(this, Event)

    this.on('abc', this.abcfn);
    this.on('abc', this.abdfn);
    this.on('abc', function(e){
      console.log('event abc: ', e)
    })
    this.on('abd', function(){
      console.log('abd')
    })
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
    // this.off('abc', this.abdfn)
    // this.off('abc', this.abcfn)
    this.trigger('abc', {x:1, y:2})
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