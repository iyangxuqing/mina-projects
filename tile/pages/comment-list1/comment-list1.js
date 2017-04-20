import { http } from '../../utils/http.js'
import { Praise } from '../../utils/praise.js'
import { Comment } from '../../utils/comment.js'

Page({
  data: {
  },

  onLoad: function (options) {

    let praise = new Praise()
    let comment = new Comment()
    let that = this
    Promise.all([comment.get(), praise.get()]).then(function (res) {
      let comments = res[0]
      let praises = res[1]
      for (let i in praises) {
        let praise = praises[i]
        if (praise.issue == 'comment') {
          let issueId = praise.issueId
          for (let j in comments) {
            let comment = comments[j]
            if (comment.id == issueId) {
              comment.userPraised = true
            }
          }
        }
      }
      that.setData({
        comments: comments
      })
    })

    // comment.get()
    //   .then(function (comments) {
    //     that.setData({
    //       comments: comments
    //     })
    //     return praise.get()
    //   })
    //   .then(function (praises) {
    //     let comments = that.data.comments
    //     for (let i in praises) {
    //       let praise = praises[i]
    //       if (praise.issue == 'comment') {
    //         let issueId = praise.issueId
    //         for (let j in comments) {
    //           let comment = comments[j]
    //           if (comment.id == issueId) {
    //             comment.userPraised = true
    //           }
    //         }
    //       }
    //     }
    //     that.setData({
    //       comments: comments
    //     })
    //   })

  },

  onPraiseTap: function (e) {
    let id = e.currentTarget.dataset.id
    let comments = this.data.comments
    for (let i in comments) {
      let comment = comments[i]
      if (comment.id == id) {
        comment.userPraised = !comment.userPraised
        let praise = new Praise()
        praise.set({
          issue: 'comment',
          issueId: id
        })
        break;
      }
    }
    this.setData({
      comments: comments
    })
  },

  onReviewTap: function (e) {
    console.log(e)
  }

})