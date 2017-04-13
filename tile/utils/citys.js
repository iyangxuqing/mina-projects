import { http } from 'http.js'

function getCitys() {
    return new Promise(function (resolve, reject) {
        let citys = wx.getStorageSync('citys')
        if (citys) {
            resolve(citys)
        } else {
            http.post({
                url: 'address/getCitys.php',
                data:{
                    withcode: 0,
                    withoutToken: 1
                }
            }).then(function(res){
                if(!res.error){
                    wx.setStorageSync('citys', res)
                    resolve(citys)
                } else {
                    reject(res)
                }
            }, function(res){
                reject(res)
            })
        }
    })
}

export const Citys = {
    getCitys: getCitys
}