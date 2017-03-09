// pages/textarea/textarea.js
Page({
  data: {
    comments: [
      {
        content: '宁泽涛在2013年全国游泳冠军赛上将100自全国纪录收归自己名下，到了2014年亚运会，21岁的包子得以在国际舞台一鸣惊人。这届亚运会宁泽涛拿下四枚金牌，其中100自47秒70夺冠，成为首个突破48秒的黄种人。10月的全国游泳锦标赛上，宁泽涛又以47秒65打破自己保持的亚洲纪录。',
      },
      {
        content: '势不可挡的宁泽涛2015年继续爆发，喀山游泳世锦赛上，全世界都被这个帅气的小伙震惊。100米自由泳决赛，宁泽涛47秒84夺得冠军，创造亚洲游泳的历史，让所有西方媒体惊呼不可思议，震撼程度直逼当年的刘翔。',
      },
      {
        content: '等待他的还有更大的舞台——里约奥运会，没想到的是，等来的并不那么美好。2016年4月的奥运选拔赛，宁泽涛依然可以游进48秒，状态不俗。6月网上却突然出现了“宁泽涛遭游泳中心处罚恐无缘里约奥运”的消息，随之赞助商矛盾、私接广告、教练矛盾等被爆出，宁泽涛处在风口浪尖。虽然最终得以参加奥运会，但状态受到影响，50自预赛出局，100自半决赛出局，黯然收场。',
        reviews: []
      },
      {
        content: '到了11月，央视播出纪录片《转折点-宁泽涛》，讲述了宁泽涛奥运背后的故事，游泳中心与宁泽涛之间的矛盾正式公开化。不过事情却没能很好解决，游泳中心选择沉默，事态发展停滞不前。直到今年2月网上的一纸公函曝光，才知道宁泽涛2016年10月份已被国家队调整回海军队。',
        reviews: [
          {
            content: 'abc<br/>\n\rabc\nabc'
          },
          {
            content: 'bcd'
          }
        ]
      }
    ],
    offsetTop: 0,
    translateY: 0,
    reviewedCommentIndex: -1,
    reviewTextareaHidden: true,
    focus: false
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let comments = this.data.comments
    for (let i in comments) {
      let reviews = comments[i].reviews
      for (let j in reviews) {
        let review = reviews[j]
        let paragraphs = review.content.split('\n')
        review.content = paragraphs
      }
    }
    this.setData({
      comments: comments
    })
  },

  onReviewTap: function (e) {
    console.log(e)
    let offsetTop = e.currentTarget.offsetTop
    let offsetLeft = e.currentTarget.offsetLeft
    let y = e.changedTouches[0].clientY
    var index = e.currentTarget.dataset.index
    // var translateY = 400 - y > 200 ? 200 : 400 - y
    this.setData({
      reviewedCommentIndex: index,
      reviewTextareaHidden: false,
      // translateY: translateY
    })
    var that = this
    // if (offsetTop > 500) {
    //   setTimeout(function () {
    //     that.setData({
    //       offsetTop: offsetTop - 200
    //     })
    //   }, 0)
    // }
  },

  onTextareaConfirm: function (e) {
    var content = e.detail.value
    content = content.split('\n')
    var index = this.data.reviewedCommentIndex
    var comments = this.data.comments
    var reviews = comments[index].reviews || []
    reviews.push({
      content: content
    })
    comments[index].reviews = reviews;
    this.setData({
      comments: comments,
      reviewTextareaHidden: true,
      translateY: 0
    })
  },

  onTextareaBlur: function (e) {
    this.setData({
      reviewTextareaHidden: true,
      translateY: 0
    })
    // if (wx.getSystemInfoSync().platform == 'devtools') {
    //   this.onTextareaConfirm(e)
    // }
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