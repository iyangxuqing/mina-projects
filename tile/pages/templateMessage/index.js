// pages/templateMessage/index.js
let http = require('../../utils/http');

let app = getApp();
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    http.get({
      url: 'access_token/getAccessToken.php',
      success: function (res) {
        wx.setStorageSync('wx_access_token', res.accessToken)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  onEntrySubmit: function (e) {
    let openId = wx.getStorageSync('openId')
    let accessToken = wx.getStorageSync('wx_access_token')
    let url = "https://api.weixin.qq.com/cgi-bin/message/wxopen/"
    url = url + "template/send?access_token=" + accessToken
    let formId = e.detail.formId
    let formObj = e.detail.value
    var data = {
      touser: openId,
      template_id: 'ARVfhsnzCmjOh6DHyevBeCo7VJqdKFN1FZvO4M_Qheg',
      page: '/pages/templateMessage/index',
      form_id: formId,
      "data": {
        "keyword1": {
          "value": formObj.name,
          "color": "#173177"
        },
        "keyword2": {
          "value": formObj.time,
          "color": "#173177"
        },
        "keyword3": {
          "value": formObj.desc,
          "color": "#173177"
        },
        "keyword4": {
          "value": formObj.address,
          "color": "#173177"
        },
        "keyword5": {
          "value": formObj.contact,
          "color": "#173177"
        },
        "keyword5": {
          "value": Math.floor(Math.random()*(999999-100000)+100000),
          "color": "#173177"
        }
      },
      "color": "#ccc",
      "emphasis_keyword": "keyword1.DATA"
    }
    var that = this;
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      success: function (res) {
        console.log("push msg");
        console.log(res);
        that.setData({
          debugInfo: JSON.stringify(res)
        })
      },
      fail: function (err) {
        console.log("push err")
        console.log(err);
        that.setData({
          debugInfo: JSON.stringify(err)
        })
      }
    });
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

