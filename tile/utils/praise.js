import { http } from 'http.js'

export class Praise {
    constructor() { }

    get() {
        return new Promise(function (resolve, reject) {
            http.get({
                url: 'praise/getUserPraise.php'
            }).then(function (res) {
                if (!res.error) {
                    let userPraise = res
                    resolve(userPraise)
                } else {
                    reject(res)
                }
            }).catch(function (res) {
                reject(res)
            })
        })
    }

    set(options) {
        let issue = options.issue
        let issueId = options.issueId
        http.post({
            url: 'praise/setUserPraise.php',
            data: {
                issue: issue,
                issueId: issueId
            }
        })
    }
}