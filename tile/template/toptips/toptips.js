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

let timer = null

let methods = {
    onClose(e) {
        this.hide()
    }
}

export class TopTips {
    constructor() {
        page = getCurrentPages().pop()
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
            this.timer = setTimeout(this.hide, options.duration)
        }
    }

    hide() {
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