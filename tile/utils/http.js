let config = require('config.js')

const API_BASE_URL = "https://yixing02.applinzi.com/api/";

function checkResponse(options, res) {
    if (res.data.error) {
        getApp().debug.set(options.url, {
            data: options.data,
            error: res.data.error
        })
    }
}

function showRequestFailedTip() {
    let page = getCurrentPages().pop()
    page.tipTops.show({
        text: '提示：网络错误，请重试...'
    })
}

function get(options) {
    if (!options.silent) wx.showNavigationBarLoading();
    wx.request({
        url: API_BASE_URL + options.url,
        header: {
            'Content-Type': 'application/json',
            'version': config.version,
            'token': wx.getStorageSync('token'),
        },
        data: options.data,
        success: function (res) {
            checkResponse(options, res)
            options.success && options.success(res.data)
        },
        fail: function (error) {
            if (!options.silent) showRequestFailedTip()
            options.fail && options.fail(error)
        },
        complete: function (res) {
            if (!options.silent) wx.hideNavigationBarLoading();
            options.complete && options.complete(res);
        }
    })
}

function post(options) {
    if (!options.silent) wx.showNavigationBarLoading();
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
            checkResponse(options, res);
            options.success && options.success(res.data);
        },
        fail: function (error) {
            if (!options.silent) showRequestFailedTip();
            options.fail && options.fail(error);
        },
        complete: function (res) {
            if (!options.silent) wx.hideNavigationBarLoading();
            options.complete && options.complete(res);
        }
    })
}

/*
    options = {
        paths: [],
        uploadUrl,
        uploadDir,
        success,
        fail,
        complete
    }
*/
function upload(options) {
    wx.showNavigationBarLoading();
    var uploadedNum = 0
    var uploadedFiles = []
    var paths = option.paths
    var uploadUrl = options.uploadUrl || 'upload/uploadImage.php'
    var uploadDir = options.uploadDir || 'upload/images'

    if (paths.length == 0) {
        if (options.success && typeof options.success == 'function') {
            options.success({
                errNo: 0,
                errMsg: '没有文件需要上传',
                uploadedFiles: []
            })
        }
        return;
    }

    for (var i = 0; i < paths.length; i++) {
        var path = paths[i]
        wx.uploadFile({
            url: API_BASE_URL + upLoadUrl,
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
                            errNo: 0,
                            errMsg: '',
                            uploadedFiles: uploadedFiles
                        }
                    } else {
                        result = {
                            errNo: 1,
                            errMsg: '文件上传错误',
                            uploadedFiles: uploadedFiles
                        }
                        console.log(result)
                    }
                    if (!result.errNo && options.success) {
                        options.success(result);
                    }
                    if (!!result.errNo && options.fail) {
                        options.fail(result);
                    }
                    if (options.complete) {
                        options.complete(result);
                    }
                    wx.hideNavigationBarLoading();
                }
            }
        })
    }
}

module.exports = {
    get: get,
    post: post,
    upload: upload,
};