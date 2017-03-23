// cizhuang/product/product.js
let user = require('../../utils/user.js')
let Promise = require('../../utils/bluebird.min.js')
import {UserInfo} from '../../template/userinfo/userinfo.js'

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

  onLoginTap: function (e) {
    // user.getUserInfo({
    //   from: 'weixin',
    //   success: function (res) {
    //     this.setData({
    //       'wode.avater': res.avatarUrl,
    //       'wode.name': res.nickName
    //     })
    //   }.bind(this)
    // })
    user.getUserInfo2({
      from: 'weixin'
    }).then(function(res){
      this.setData({
        'wode.avater': res.avatarUrl,
        'wode.name': res.nickName
      })
    }.bind(this))
  },

  onLoad: function (options) {
    this.userInfo = new UserInfo()
    // user.getUserInfo({
    //   success: function (res) {
    //     this.setData({
    //       'wode.avater': res.avatarUrl,
    //       'wode.name': res.nickName
    //     })
    //   }.bind(this)
    // })

    // this.request('https://yixing02.applinzi.com/api/login/login2.php').then(function(res){
    //   console.log(res)
    // }, function(res){
    //   console.log(res)
    // })

  },

  // request: function(url, options = {}) {
  //   return new Promise((resolve, reject) => {
  //     wx.request(Object.assign({}, options, {
  //       url,
  //       success(res) {
  //         console.log(res)
  //         if(res.data.token){
  //           resolve(res);
  //         } else {
  //           reject({a:1})
  //         }
  //       },
  //       fail(res) {
  //         console.log(res)
  //         reject({a:1});
  //       },
  //     }));
  //   });
  // },

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