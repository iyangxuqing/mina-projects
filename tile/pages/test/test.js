// pages/test/test.js
import { Toast } from "../../template/toast/toast.js"
import { Loading } from "../../template/loading/loading.js"
import { TopTip } from "../../template/toptip/toptip.js"

Page({
  data: {
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.toast = new Toast()
    this.loading = new Loading()
    this.topTip = new TopTip()
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
  },
  show: function (e) {
    // this.toast.show({
    //   title: '地址已保存',
    //   icon: 'success',
    //   success: function () {
    //     console.log('abc')
    //   }
    // })
    // this.loading.show()
    console.log(e)
    this.topTip.show({
      title: 'abc我是很多文章，文章学习， 内容多汉的了吧就看到',
      showClose: true,
      mulitLine: true,
      success: function(){
        console.log('success')
      }
    })
  },
  hide: function (e) {
    this.loading.hide()
    console.log(e)
  }
})