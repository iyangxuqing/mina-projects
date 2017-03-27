/*
    debug.set 用来将出错信息记录到数据库的debug表中
    如果debug.set本身出错，则表明将出错信息记录到数据库的这一过程出错
    这个错误本身不再尝试记录到数据库，只是在客户端console.log
    以避免重复不断的记录错误出错又记录错误
*/

function setDebug(label, error) {
    wx.request({
        url: "https://yixing02.applinzi.com/api/debug.php",
        method: 'POST',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            version: 'version 1.0',
            token: wx.getStorageSync('token')
        },
        data: {
            label: JSON.stringify(label),
            error: JSON.stringify(error),
            device: JSON.stringify(getApp().globalData.deviceInfo)
        },
        success: function (res) {
            if (!res.data.error) {
                console.log('debug set success:', label, error, res.data)
            } else {
                console.log('debug set error:', label, error, res.data)
            }
        },
        fail: function (res) {
            console.log('debug set fail =>', label, error, res)
        }
    })
}

export var debug = {
    set: setDebug
}