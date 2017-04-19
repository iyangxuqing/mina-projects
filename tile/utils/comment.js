import { http } from 'http.js'

export class Comment {
    constructor() {
    }

    get() {
        return new Promise(function (resolve, reject) {
            http.get({
                url: 'comment/commentGet.php'
            }).then(function (res) {
                if (!res.error) {
                    let comments = res;
                    for (var i in comments) {
                        let comment = comments[i]
                        comment.created = formatTime(comment.created)
                        comment.texts = comments[i].texts.split("\n");
                        comment.photos = comments[i].photos.split(",");
                    }
                    resolve(comments)
                } else {
                    reject(res)
                }
            }).catch(function (res) {
                reject(res)
            })
        })
    }
}

function formatTime(time) {
    let ltime = time * 1000
    let date = new Date(ltime)
    let year = String(date.getFullYear())
    let month = String(date.getMonth() + 1)
    let day = String(date.getDate())
    let hour = String(date.getHours())
    let minute = String(date.getMinutes())
    let second = String(date.getSeconds())
    month = month.length == 2 ? month : '0' + month
    day = day.length == 2 ? day : '0' + day
    hour = hour.length == 2 ? hour : '0' + hour
    minute = minute.length == 2 ? minute : '0' + minute
    second = second.length == 2 ? second : '0' + second
    ltime = year + '-' + month + '-' + day
    ltime = ltime + ' ' + hour + ':' + minute + ':' + second
    return ltime
}