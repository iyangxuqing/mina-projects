export function toptips(options = {}) {
    let page = getCurrentPages().pop()
    page.setData({
        toptips: Object.assign(data, options)
    })
    Object.assign(page, methods)
}

let data = {
    version: 'version 1.0'
}

let methods = {
    toptips: function (options = {}) {
        this.setData({
            'toptips.type': options.type || 'error',
            'toptips.text': options.text || 'toptips',
            'toptips.visible': true,
            'toptips.animateCss': 'fadeIn'
        })
        let that = this;
        setTimeout(function () {
            that.setData({
                'toptips.animateCss': 'fadeOut'
            })
            setTimeout(function () {
                that.setData({
                    'toptips.visible': false
                })
                if (typeof options.success == 'function') {
                    options.success()
                }
            }, 300)
        }, 1500)
    }
}