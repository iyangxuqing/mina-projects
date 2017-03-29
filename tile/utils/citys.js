const http = require("../utils/http.js")

export function getCitys() {
    return new Promise(function (resolve, reject) {
        let citys = wx.getStorageSync('citys')
        if (citys) {
            resolve(citys)
        } else {
            http.get({
                url: 'address/getCitys.php?withcode=1',
                success: function (res) {
                    if (!res.error) {
                        wx.setStorageSync('citys', res)
                        resolve(citys)
                    } else {
                        reject(res)
                    }
                },
                fail: function (res) {
                    reject(res)
                }
            })
        }
    })
}