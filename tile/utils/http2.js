let config = require('config.js')

const API_BASE_URL = "https://yixing02.applinzi.com/api/";

function checkResponse(res) {
    return true;
}

function showRequestFailedTip() {
    wx.showModal({
        title: '提示',
        content: '网络错误，请重试...',
        showCancel: false,
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
                showRequestFailedTip();
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
                checkResponse(res);
                resolve(res.data)
            },
            fail: function (res) {
                showRequestFailedTip();
                reject(res)
            }
        })
    })
}

/*
    options = {
        paths: [],
        uploadUrl,
        uploadDir,
    }
*/
function upload(options) {
    var uploadedNum = 0
    var uploadedFiles = []
    var paths = option.paths
    var uploadUrl = options.uploadUrl || 'upload/uploadImage.php'
    var uploadDir = options.uploadDir || 'upload/images'

    return new Promise(function (resolve, reject) {
        if (paths.length == 0) {
            resolve({
                errno: 0,
                error: '没有文件需要上传',
                uploadedFiles: []
            })
            return;
        }
        for (var i = 0; i < paths.length; i++) {
            var path = paths[i]
            wx.uploadFile({
                url: API_BASE_URL + uploadUrl,
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
                        });
                    }
                },
                complete: function () {
                    uploadedNum++;
                    if (uploadedNum == paths.length) {
                        var result = {};
                        if (uploadedFiles.length == paths.length) {
                            result = {
                                errno: 0,
                                error: '',
                                uploadedFiles: uploadedFiles
                            }
                            resolve(result)
                        } else {
                            result = {
                                errno: 1,
                                error: '文件上传错误',
                                uploadedFiles: uploadedFiles
                            }
                            reject(result)
                        }
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