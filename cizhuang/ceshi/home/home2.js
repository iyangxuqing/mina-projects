// ceshi/home/home.js
Page({
  data: {
    home: {
      headSwiper: [
        {
          type: 'navigate',
          url: '../recommend/recommend',
          image: 'http://122.226.60.90:8092/images/cizhuang/dongpeng/home/s04.jpg',
        },
        {
          type: 'switchTab',
          url: '../fengge/fengge',
          image: 'http://122.226.60.90:8092/images/cizhuang/dongpeng/home/s03.jpg',
        },
        {
          type: 'navigate',
          url: '../service/service',
          image: 'http://122.226.60.90:8092/images/cizhuang/dongpeng/home/s02.jpg'
        },


      ],
      url: '../fengge/fengge',
      text: '家是温暖的港湾',
      row: [
        {
          url: '../anli/anli',
          key: '身边案例',
        },
        {
          url: '../wode/wode',
          key: '我的信息',
        }

      ],
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