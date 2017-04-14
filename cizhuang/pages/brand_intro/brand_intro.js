var app = getApp();

Page({
  data: {
    // brand: [
    //   { img: 'https://www.mielseno.com/app-static/img/C2M-1.png', title: '让每个女生都有轻松获得高品质内衣的权利', content: ['Nice in是内衣界首家C2M直供平台，', '去除所有中间环节，', '直接连接用户和顶级制造商生产线，', '让国际品质、安全健康的内衣产品具有亲民价格。'] },
    //   { img: 'https://www.mielseno.com/app-static/img/C2M-2.png', title: '', content: [] },
    //   { img: 'https://www.mielseno.com/app-static/img/C2M-3.png', title: '品质和实力', content: ['目前已有一家世界顶级内衣制造商入驻Nice in，', '它曾经为众多国际高端内衣品牌提供研发和生产。', '该制造商已有30年的研发经验，', '公司总投资达1亿美元，生产基地占地10万平方米，', '在全球多个国家设有办事处。'] },
    //   { img: 'https://www.mielseno.com/app-static/img/C2M-4.png', title: '消除中间价', content: ['Nice in从工厂的源头开始，直接控制出品成本，', '去除各类“二手”“三手”渠道和经销费用，', '才有接地气的好价格。'] },
    //   { img: 'https://www.mielseno.com/app-static/img/C2M-5.png', title: 'Nice 团队', content: ['Nice in是一个女性创业者团队，', '有从业超过10年的资深互联网人，', '和更多90后参与平台运营，', '期待为女生谋些真切的福利，', '即用平价的方式，让女生尝试更多高品质内衣。'] },
    // ],

    brand: [
      {
        image: 'https://www.mielseno.com/app-static/img/C2M-1.png',
        title: '让每个女生都有轻松获得高品质内衣的权利',
        contents: [
          'Nice in是内衣界首家C2M直供平台，',
          '去除所有中间环节，',
          '直接连接用户和顶级制造商生产线，',
          '让国际品质、安全健康的内衣产品具有亲民价格。'],
      },
      {
        image: 'https://www.mielseno.com/app-static/img/C2M-2.png',
      },
      {
        image: 'https://www.mielseno.com/app-static/img/C2M-3.png',
        title: '品质和实力',
        contents: [
          '目前已有一家世界顶级内衣制造商入驻Nice in，',
          '它曾经为众多国际高端内衣品牌提供研发和生产。',
          '该制造商已有30年的研发经验，',
          '公司总投资达1亿美元，生产基地占地10万平方米，',
          '在全球多个国家设有办事处。'],
      },
      {
        image: 'https://www.mielseno.com/app-static/img/C2M-4.png',
        title: '消除中间价',
        contents: [
          'Nice in从工厂的源头开始，直接控制出品成本，',
          '去除各类“二手”“三手”渠道和经销费用，',
          '才有接地气的好价格。'],
      },
      {
        image: 'https://www.mielseno.com/app-static/img/C2M-5.png',
        title: 'Nice 团队',
        contents: [
          'Nice in是一个女性创业者团队，',
          '有从业超过10年的资深互联网人，',
          '和更多90后参与平台运营，', '期待为女生谋些真切的福利，',
          '即用平价的方式，让女生尝试更多高品质内衣。'],
      },
    ],
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    wx.setNavigationBarTitle({
      title: '内衣C2M直供平台',
    })

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
    wx.stopPullDownRefresh();
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'Nice in-内衣C2M直供平台', // 分享标题
      desc: '直连用户和优质制造商，去除大部分中间环节，提供免费试穿服务，让每个女生都能轻松拥有高品质内衣。', // 分享描述
      path: '/pages/brand_intro/brand_intro' // 分享路径
    }
  }
})
