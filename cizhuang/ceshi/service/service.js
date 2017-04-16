// ceshi/service/service.js
Page({
  data: {
    service: {
      title: '阳光天使服务',
      list: [
        {
          bodyTitle: '三大承诺',
          texts: [

            {
              subTitle: '承诺1：正品保证',
              paragraphs: [
                ' 通过东鹏授权合法渠道购买的产品全部为正品;',
                '购买到非正品的，可进行索赔，将全款退还;',
                '请出示您在正规合法渠道购买产品的凭证，非正规合法渠道购买不予受理。',
                '(只要合法渠道购买无论那个等级均为正品)',
              ]
            },
            {
              subTitle: '承诺2：无理由退货',
              paragraphs: [
                ' 未发货的订单，从您提出退货申请受理后的24小时内完成退货;',
                '已发货的订单，自签收日起3天内无理由退货服务(产品需不影响二次销售);',
                '请您在退货时出示购买凭证;',
                '质量问题所产生的退货费用由我们承担，非质量问题所产生的退货所产生的运输、搬运等相关费用均由消费者承担;',
                '特殊定制如直线切割、水刀地花、雕刻砖、纹理砖等加工件不予退货。',
              ]
            },
            {
              subTitle: '承诺3：质保20年',
              paragraphs: [
                ' 我们承诺质保20年，自您签收之日起20年内，产品有任何非人为因素的质量问题，我们都将为您提供相应的维修换补服务。',
              ]
            },
          ]


        },
        {
          bodyTitle: '6大免费',
          texts: [

            {
              subTitle: '1、 免费上门量房：',
              paragraphs: [
                ' 提供现场尺寸丈量服务(需提前三个工作日预约)。',
              ]
            },
            {
              subTitle: '2、免费全屋设计：',
              paragraphs: [
                ' 提供专业的产品搭配和设计咨询;',
                '提供产品搭配设计方案(现场尺寸丈量后48小时内提供);',
                '提供瓷砖铺贴施工图纸(消费者确认方案后24小时提供)。',
              ]
            },
            {
              subTitle: '3、免费铺贴指导：',
              paragraphs: [
                ' 提供铺贴前详细产品施工特点和铺贴注意事项说明;',
                 ' 提供上门铺贴指导服务(需提前三个工作日预约);',
                  '提供铺贴期间施工检查，并至少一次现场或电话沟通;',
                  '提供产品使用热线电话咨询。',
              ]
            },
              {
              subTitle: '4、免费送货上门：',
              paragraphs: [
                ' 　免费提供一次送货上门服务;',
                 ' 　需提前预约，现货三天内送货，定制按约定执行;',
                  '免费提供专人装卸协助及监督(指导工人安全搬运装卸瓷砖，并依据铺贴施工图，单独摆放各空间用砖)。',
              ]
            },
              {
              subTitle: '5、免费上门退换补货：',
              paragraphs: [
                ' 　订单满3000元以上的，消费者自签收日起1个月内可享受1次上门换货服务，1次上门补货服务，一次上门退货服务(本服务特指铺贴完毕后剩余瓷砖)，超过时限将不提供免费上门服务;',
                 ' 换补货前请与工作人员确定产品色号，以免产生色差;;',
                  '退换货产品必须符合以下标准：退换货产品不得影响二次销售，已使用(包括已浸水)或有损伤(包括缺角、崩边、表面有划伤、有污迹等)的产品及特殊定制产品(直线切割、水刀地花、雕刻砖、纹理砖等加工产品)不可退货，退货时请出示购买凭证并提供产品的相应包装。',
                  '　退换补货自预约起三个工作日内完成，并根据预约时间送至指定地点。',
              ]
            },
              {
              subTitle: '6、免费后期维护指导：',
              paragraphs: [
                '提供瓷砖清洁、去污的现场处理或演示指导;',
                 '提供瓷砖日常保养如填缝、美缝、抛光打蜡等现场演示或指导;',
                  '　为了不影响您的正常工作时间，我们将于8:00-18:00上门提供以上服务，请提前电话预约。',
              ]
            },
          ]


        },


      ]



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