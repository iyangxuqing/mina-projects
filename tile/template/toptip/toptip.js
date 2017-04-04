export class TopTip {

    constructor() {
        this.timer = null
        this.success = function () { }
        this.init()
    }

    init() {
        this.defaults = {
            mask: true,
            type: 'error',
            title: 'topTip',
            visible: false,
            duration: 1500,
            iconColor: '#fff',
            mulitLine: false,
            showClose: false,
            animateCss: 'animate-fade-out',
        }
        this.methods = {
            onClose: function () {
                this.hide()
            }
        }
        let page = getCurrentPages().pop()
        page.setData({
            topTip: this.defaults
        })
        for (let key in this.methods) {
            page['topTip.' + key] = this.methods[key].bind(this)
            page.setData({
                ['topTip.' + key]: 'topTip.' + key
            })
        }
    }

    show(options = {}) {
        options = Object.assign({}, this.defaults, options)
        options.mulitLine = options.mulitLine ? 'mulitLine' : ''
        this.success = options.success

        clearTimeout(this.timer)
        let page = getCurrentPages().pop()
        page.setData({
            'topTip.mask': options.mask,
            'topTip.type': options.type,
            'topTip.title': options.title,
            'topTip.duration': options.duration,
            'topTip.mulitLine': options.mulitLine,
            'topTip.showClose': options.showClose,
            'topTip.animateCss': '"animate-fade-in',
            'topTip.visible': true
        })
        if (options.duration) {
            this.timer = setTimeout(function () {
                this.hide()
            }.bind(this), options.duration)
        }
    }

    hide() {
        let page = getCurrentPages().pop()
        page.setData({
            'topTip.animateCss': 'animate-fade-out'
        })
        setTimeout(function () {
            page.setData({
                'topTip.visible': false
            })
            this.success && this.success()
        }.bind(this), 300)
    }
}