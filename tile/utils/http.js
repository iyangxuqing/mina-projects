var config = require('./config.js');
const HTTP_BASE_URL = "https://yixing02.applinzi.com/api/";
const API_BASE_URL = "https://yixing02.applinzi.com/api/";

/* 检查api成功调用后返回的数据，如token过期等 */
function checkResponse(res) {
    return true;
}

function showRequestFailedTip() {
    wx.showModal({
        title: '提示',
        content: '网络错误，请重试...',
        showCancel: false,
        success: function (res) {
        }
    })
}

function get(option) {
    wx.showNavigationBarLoading();
    wx.request({
        url: API_BASE_URL + option.url,
        header: {
            'Content-Type': 'application/json',
            'version': config.version,
            'token': wx.getStorageSync('token')
        },
        data: option.data,
        success: function (res) {
            checkResponse(res);
            if (typeof option.success == 'function') {
                // var data = res.data;
                // if(typeof data == 'string') data = JSON.parse(data);
                option.success(res.data);
            }
        },
        fail: function (error) {
            showRequestFailedTip();
            console.log("http请求:" + API_BASE_URL + option.url);
            console.log(err);
            if (typeof option.fail == 'function') {
                option.fail(error);
            }
        },
        complete: function (res) {
            wx.hideNavigationBarLoading();
            if (typeof option.complete == 'function') {
                option.complete(res);
            }
        }
    })
}

function post(option) {
    wx.showNavigationBarLoading();
    wx.request({
        url: API_BASE_URL + option.url,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'version': config.version,
            'token': wx.getStorageSync('token')
        },
        method: 'POST',
        data: option.data,
        success: function (res) {
            checkResponse(res);
            if (typeof option.success == 'function') {
                option.success(res.data);
            }
        },
        fail: function (error) {
            showRequestFailedTip();
            console.log("http请求:" + API_BASE_URL + option.url);
            console.log(err);
            if (typeof option.fail == 'function') {
                option.fail(error);
            }
        },
        complete: function (res) {
            wx.hideNavigationBarLoading();
            if (typeof option.complete == 'function') {
                option.complete(res);
            }
        }
    })
}

/*
    option = {
        uploadUrl,
        uploadDir,
        paths: [],
        success,
        fail,
        complete
    }
*/
function upload(option) {
    wx.showNavigationBarLoading();
    var uploadedNum = 0;
    var uploadedFiles = [];
    var paths = option.paths;

    if(paths.length == 0){
        if(option.success && typeof option.success=='function'){
            option.success({
                errNo: 0,
                errMsg: '没有文件需要上传',
                uploadedFiles: []
            })
        }
        return;
    }

    for (var i = 0; i < paths.length; i++) {
        var path = option.paths[i];
        wx.uploadFile({
            url: option.uploadUrl || config.uploadUrl,
            filePath: path,
            name: 'file',
            header: {
                'version': config.version,
                'token': wx.getStorageSync('token')
            },
            formData: {
                source: path,
                uploadDir: option.uploadDir || config.uploadDir
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
                            uploadedFiles: uploadedFiles /* 上传成功部分 */
                        }
                        console.log(result)
                    }
                    if (!result.errNo && option.success) {
                        option.success(result);
                    }
                    if (!!result.errNo && option.fail) {
                        option.fail(result);
                    }
                    if (option.complete) {
                        option.complete(result);
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
    upload: upload
};