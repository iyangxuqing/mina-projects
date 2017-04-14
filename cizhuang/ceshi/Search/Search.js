// ceshi/Search/Search.js
Page({
  data:{
    search: {
     style: [
       {
         url: '../fengge/jianyue/jianyue',
         key: '简约',
       },
        {
         url: '../fengge/oushi/oushi',
         key: '欧式',
       },
       {
         url: '../fengge/zhongshi/zhongshi',
         key: '中式',
       },
        {
         url: '../fengge/fugu/fugu',
         key: '复古',
       },
        {
         url: '../fengge/tianyuan/tianyuan',
         key: '田园风',
       },
       {
         url: '../fengge/dizhonghai/dizhonghai',
         key: '地中海',
       },
      ]
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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