// pages/myhome/myhome.js
var app = getApp()

Page({
  data:{},
  onLoad:function(options){
    app.getUserInfo(function(res){
      console.log(res)
    })
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