let page = {}

let data = {
    mask: true,
    type: 'error',
    visible: false,
    duration: 2000,
    iconColor: '#fff',
    mulitLine: false,
    showClose: false,
    callback: function () { },
    animateCss: 'animate-fade-out',
    textStyle: 'tips-text-align-center'
}

let methods = {
    onClose(e) {
        page.setData({
            'topTips.animateCss': 'animate-fade-out'
        })
        setTimeout(function () {
            page.setData({
                'topTips.visible': false
            })
        }, 300)
        this.callback && this.callback()
    }
}

export class TopTips {
    constructor() {
        page = getCurrentPages().pop()
        this.timer = null
        this.callback = null
        this.init()
    }

    init() {
        page.setData({
            topTips: data
        })
        for (let key in methods) {
            page['topTips.' + key] = methods[key].bind(this)
            page.setData({
                ['topTips.' + key]: 'topTips.' + key
            })
        }
    }

    show(options = {}) {
        this.remove()
        options = Object.assign({}, data, options)
        this.callback = options.callback
        page.setData({
            'topTips.type': options.type,
            'topTips.text': options.text,
            'topTips.duration': options.duration,
            'topTips.multiLine': options.multiLine,
            'topTips.showClose': options.showClose,
        })
        if (options.multiLine) {
            page.setData({
                'topTips.textStyle': 'tips-text-align-left'
            })
        } else {
            page.setData({
                'topTips.textStyle': 'tips-text-align-cenger'
            })
        }
        page.setData({
            'topTips.visible': true,
            'topTips.animateCss': 'animate-fade-in'
        })
        if (options.duration > 0) {
            this.timer = setTimeout(function () {
                page.setData({
                    'topTips.animateCss': 'animate-fade-out'
                })
                setTimeout(function () {
                    page.setData({
                        'topTips.visible': false
                    })
                    if (typeof options.success == 'function') {
                        options.success()
                    }
                }, 300)
            }, options.duration)
        }
    }

    remove() {
        this.timer = null
        page.setData({
            'topTips.animateCss': 'animate-fade-out',
            'topTips.visible': true
        })
    }
}