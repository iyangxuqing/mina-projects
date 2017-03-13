// pages/canvas/index.js
Page({
  data: {
    savedImage: ''
  },
  onLoad: function (options) {
    const ctx = wx.createCanvasContext('myCanvas')

    // ctx.setFillStyle('red')
    // ctx.fillRect(10, 10, 150, 75)
    // ctx.draw()

    wx.chooseImage({
      success: function (res) {

        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (res) {
            console.log(res)
          }
        })

        ctx.drawImage(res.tempFilePaths[0], 0, 0, 375, 300)
        ctx.draw()
      }
    })

    // ctx.drawImage('../../images/p01.jpg', 0, 0, 300, 150)
    // ctx.draw()

  },
  onReady: function () {
  },
  save: function (e) {
    let that = this;
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function success(res) {
        wx.uploadFile({
          url: "https://yixing02.applinzi.com/api/upload/uploadImage.php",
          filePath: res.tempFilePath,
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            console.log(res);
            var data = res.data
            //do something
          },
          fail: function (res) {
            console.log(res)
          }
        })
        // wx.saveFile({
        //     tempFilePath: res.tempFilePath,
        //     success: function success(res) {
        //       console.log('saved::' + res.savedFilePath);
        //       that.setData({
        //         savedImage: res.savedFilePath
        //       })
        //     },
        //     complete: function fail(e) {
        //       console.log(e.errMsg);
        //     }
        //   });
      },
      complete: function complete(e) {
        console.log(e.errMsg);
      }
    });

    // wx.canvasToTempFilePath({
    //   canvasId: 'myCanvas',
    //   success: function (res) {
    //     console.log(res)
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   },
    //   complete: function (res) {
    //     console.log(res)
    //   }
    // })

  },

  onShow: function () {
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})