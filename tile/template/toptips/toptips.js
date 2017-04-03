let data = {
    mask: false,
    type: 'error',
    visible: false,
    duration: 1500,
    iconColor: '#fff',
    mulitLine: false,
    showClose: false,
    success: function () { },
    animateCss: 'animate-fade-out',
    textStyle: 'tips-text-align-center'
}

let methods = {
    onClose(e) {
        this.hide()
    }
}

export class TopTips {
    constructor() {
        this.timer = null
        this.init()
    }

    init() {
        let page = getCurrentPages().pop()
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
        options = Object.assign({}, data, options)
        this.success = options.success
        let page = getCurrentPages().pop()
        page.setData({
            'topTips.type': options.type,
            'topTips.text': options.text,
            'topTips.duration': options.duration,
            'topTips.multiLine': options.multiLine,
            'topTips.showClose': options.showClose,
        })
        if (options.multiLine) {
            page.setData({
                'topTips.textStyle': 'topTips-text-align-left'
            })
        } else {
            page.setData({
                'topTips.textStyle': 'topTips-text-align-center'
            })
        }

        clearTimeout(this.timer)
        page.setData({
            'topTips.visible': true,
            'topTips.animateCss': 'animate-fade-in'
        })
        if (options.duration > 0) {
            this.timer = setTimeout(function () {
                this.hide()
            }.bind(this), options.duration)
        }
    }

    hide() {
        let page = getCurrentPages().pop()
        page.setData({
            'topTips.animateCss': 'animate-fade-out'
        })
        setTimeout(function () {
            page.setData({
                'topTips.visible': false
            })
            this.success && this.success()

        }.bind(this), 300)
    }

}