let config = require('config.js')

const API_BASE_URL = "https://yixing02.applinzi.com/api/";

function checkResponse(res) {
    return true;
}

function showRequestFailedTip() {
    getApp().listener.trigger('tip', {
        title: '网络错误，请重试...',
    })
}

function get(options) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: API_BASE_URL + options.url,
            header: {
                'Content-Type': 'application/json',
                'version': config.version,
                'token': wx.getStorageSync('token')
            },
            data: options.data,
            success: function (res) {
                checkResponse(res)
                resolve(res.data)
            },
            fail: function (error) {
                showRequestFailedTip()
                reject(error)
            }
        })
    })
}

function post(options) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: API_BASE_URL + options.url,
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'version': config.version,
                'token': wx.getStorageSync('token')
            },
            method: 'POST',
            data: options.data,
            success: function (res) {
                checkResponse(res)
                resolve(res.data)
            },
            fail: function (res) {
                showRequestFailedTip()
                reject(res)
            }
        })
    })
}

/*
    options.paths = []
    options.uploadDir = 'dongpeng'
*/
function upload(options) {
    var uploadedNum = 0
    var uploadedFiles = []
    var paths = option.paths
    var uploadDir = options.uploadDir || config.uploadDir
    var uploadUrl = config.apiUrl + 'upload/uploadImage.php'

    return new Promise(function (resolve, reject) {
        for (let i in paths) {
            var path = paths[i]
            wx.uploadFile({
                url: uploadUrl,
                filePath: path,
                name: 'file',
                header: {
                    'version': config.version,
                    'token': wx.getStorageSync('token')
                },
                formData: {
                    source: path,
                    uploadDir: uploadDir
                },
                success: function (res) {
                    var data = JSON.parse(res.data)
                    if (data.target) {
                        uploadedFiles.push({
                            source: data.source,
                            target: data.target
                        })
                    } else {
                        reject(res)
                    }
                },
                fail: function (res) {
                    reject(res)
                },
                complete: function () {
                    uploadedNum++;
                    if (uploadedNum == paths.length) {
                        resolve({
                            uploadedFiles: uploadedFiles
                        })
                    }
                }
            })
        }
    })
}

export var http = {
    get: get,
    post: post,
    upload: upload
};