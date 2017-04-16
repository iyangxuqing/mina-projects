let config = require('../../../utils/config.js')
import { strTime } from '../../../utils/util.js'
import { caseData } from '../case.data.js'

Page({
  data: {},

  onLoad: function (options) {
    let id = options.id
    let indexOfProcess = options.index
    let index = -1
    for (let i in caseData) {
      if (caseData[i].id == id) {
        index = i
        break;
      }
    }
    if (index < 0) return

    let data = caseData[index]
    let process = data.process[indexOfProcess]
    let title = process.title || '身边装修案例'
    let time = process.strTime
    let desc = process.desc
    let images = process.images
    images = images.map((image)=>{
      return config.imagesUrl + image
    })
    this.setData({
      title: title,
      time: time,
      desc: desc,
      images: images
    })
  }

})