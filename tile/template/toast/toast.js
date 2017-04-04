export class Toast {
    show(options = {}) {
        let page = getCurrentPages().pop()
        page.setData({
            'toast.visible': true,
            'toast.title': options.title,
            'toast.icon': options.icon,
            'toast.mask': options.mask || true,
            'toast.animateCss': 'animate-fade-in'
        })
        setTimeout(function () {
            page.setData({
                'toast.animateCss': 'animate-fade-out'
            })
            setTimeout(function () {
                page.setData({
                    'toast.visible': false
                })
            })
            options.success && options.success()
        }, options.duration || 1500)
    }
}