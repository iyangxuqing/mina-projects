export class Loading {

    constructor() {
        this.timer = null
    }

    show() {
        let page = getCurrentPages().pop()
        this.timer = setTimeout(function () {
            page.setData({
                'loading.visible': true,
                'loading.animateCss': 'animate-fade-in'
            })
        }, 1500)
    }

    hide() {
        let page = getCurrentPages().pop()
        clearTimeout(this.timer)
        page.setData({
            'loading.animateCss': 'animate-fade-out'
        })
        setTimeout(function () {
            page.setData({
                'loading.visible': false
            })
        }, 300)
    }
}