const http = require("../utils/http.js")

export function getCitys(options = {}) {
    let citys = wx.getStorageSync('citys');
    if (citys) {
        options.success && options.success(citys)
    } else {
        http.get({
            url: 'address/getCitys.php?withcode=1',
            success: function (res) {
                if (!res.error) {
                    let citys = res
                    console.log(res)
                    wx.setStorageSync('citys', citys)
                    options.success && options.success(citys)
                }
            }
        })
    }
}