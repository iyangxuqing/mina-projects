// cizhuang/product/product.js
Page({
  data: {
    wode: {
      avater: 'http://122.226.60.90:8092/images/cizhuang/dongpeng/wode/s06.png',
      name: '点击登录',
      title: '我的信息',
      bodyIcon: 'http://122.226.60.90:8092/images/cizhuang/dongpeng/wode/s01.png',
      lists: [
        [
          {
            url: 'Collection/Collection',
            type: 'line',
            label: '我的收藏',
            icon: 'http://122.226.60.90:8092/images/cizhuang/dongpeng/wode/s01.png',

          },
          {
            url: 'dingjin/dingjin',
            label: '定金（以一抵二）',
            icon: 'http://122.226.60.90:8092/images/cizhuang/dongpeng/wode/s01.png',

          }
        ],
        [
          {
            url: 'notice/notice',
            type: 'line',
            label: '活动通知',
            icon: 'http://122.226.60.90:8092/images/cizhuang/dongpeng/wode/s01.png',

          },
          {
            url: 'dongpeng/dongpeng',
            label: '关于东鹏',
            icon: 'http://122.226.60.90:8092/images/cizhuang/dongpeng/wode/s01.png',

          }
        ]
      ],
      label: '联系客服',
      icon: 'http://122.226.60.90:8092/images/cizhuang/dongpeng/wode/s02.png',

    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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