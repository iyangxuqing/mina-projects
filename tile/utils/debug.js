const http = require("http.js")

function setDebug(label = '', error = '') {
    console.log('debug')
    console.log(label, res)
    http.post({
        url: 'debug.php',
        data: {
            label: JSON.stringify(label),
            error: JSON.stringify(error),
            device: JSON.stringify(getApp().globalData.deviceInfo)
        },
        success: function (res) {
            console.log('debug set success: ', res)
        },
        fail: function (res) {
            console.log('debug set fail: ', res)
        }
    })
}

export var debug = {
    set: setDebug
}