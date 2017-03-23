var _messages_ = {
    2001: {
        type: 'modal',
        title: '登录提示',
        content: '距离上次拒绝授权时间过短，无法再次获取授权。您可以稍后再试，或删除本程序后再次进入，就可以重新授权了。',
        showCancel: false
    }
}

function showMessage(errno) {
    let message = _messages_[errno]
    if (message.type == 'modal') {
        wx.showModal({
            title: message.title,
            content: message.content,
            showCancel: message.showCancel
        })
    }
}

export var messages = {
    show: showMessage
}