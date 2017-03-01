// pages/comment-list/comment-list.js
var http = require("../../utils/http.js");

Page({
  data: {
    comments: [
      {
        id: 1,
        avatar: 'http://yixing02-images.stor.sinaapp.com/weApp/upload/image1488171310370119.jpg',
        writer: '我是露西',
        text: '我的家乡在松花江边我的家乡在松花江边我的家乡在松花江边我的家乡在松花江边我的家乡在松花江边',
        photos: ['http://yixing02-images.stor.sinaapp.com/weApp/upload/image1488169620951614.jpg',
        ],
        created: '2017-2-27 12:36:15',
        praised: 3
      },
      {
        id: 1,
        avatar: 'http://yixing02-images.stor.sinaapp.com/weApp/upload/image1488171310370119.jpg',
        writer: 'xuqing',
        text: '我的家乡在松花江边',
        photos: ['http://yixing02-images.stor.sinaapp.com/weApp/upload/image1488169620951614.jpg',
          'http://yixing02-images.stor.sinaapp.com/weApp/upload/image1488171311235003.jpg'
        ],
        created: '2017-2-27 12:36:15',
        praised: 3
      },
      {
        id: 1,
        avatar: 'http://yixing02-images.stor.sinaapp.com/weApp/upload/image1488171310370119.jpg',
        writer: 'xuqing',
        text: '我的家乡在松花江边',
        photos: ['http://yixing02-images.stor.sinaapp.com/weApp/upload/image1488169620951614.jpg',
          'http://yixing02-images.stor.sinaapp.com/weApp/upload/image1488169621734137.jpg',
          'http://yixing02-images.stor.sinaapp.com/weApp/upload/image1488171311905010.jpg',
          'http://yixing02-images.stor.sinaapp.com/weApp/upload/image1488171311800287.jpg',
          'http://yixing02-images.stor.sinaapp.com/weApp/upload/image1488171311235003.jpg'
        ],
        created: '2017-2-27 12:36:15',
        praised: 3
      }
    ]
  },
  onLoad: function (options) {
    var that = this;
    http.get({
      url: 'mysql/commentget.php',
      success: function(res){
        var comments = res;
        for(var i in comments){
          comments[i].photos = comments[i].photos.split(",");
        }
        console.log(comments)
        that.setData({
          comments: comments
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