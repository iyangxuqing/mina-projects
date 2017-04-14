/*
    事件机制的实现
    在当前页面的js文件中引入
    var {Event} = require("../../utils/event.js");
    在Page.onLoad(){...}中注册
    Object.assign(this, Event);
    注意不要把Event写成event，因为event是一个系统内置的事件对象
*/

var Event = {

    _listener: {},

    on: function (eventName, callback) {
        if (!this._listener[eventName]) {
            this._listener[eventName] = []
        }
        this._listener[eventName].push(callback);
    },

    off: function (eventName, callback) {
        var listener = this._listener[eventName]
        if (!callback) {
            this._listener[eventName] = []
        } else {
            var index = listener.indexOf(callback)
            if (index >= 0) listener.splice(index, 1)
        }
    },

    trigger: function (eventName) {
        var args = Array.prototype.slice.apply(arguments).slice(1)
        var listener = this._listener[eventName]
        if (!Array.isArray(listener)) return
        listener.forEach(function (callback) {
            try {
                callback.apply(this, args)
            } catch (e) {
                console.error(e)
            }
        })
    }
}

export class Listener {
    constructor() {
        this.listener = {}
    }

    on(eventName, callback) {
        if (!this.listener[eventName]) this.listener[eventName] = []
        this.listener[eventName].push(callback)
    }

    off(eventName, callback) {
        var listener = this.listener[eventName]
        if (!callback) {
            this.listener[eventName] = []
        } else {
            var index = listener.indexOf(callback)
            if (index >= 0) listener.splice(index, 1)
        }
    }

    trigger(eventName) {
        var args = Array.prototype.slice.apply(arguments).slice(1)
        var listener = this.listener[eventName]
        if (!Array.isArray(listener)) return
        listener.forEach(function (callback) {
            try {
                callback.apply(this, args)
            } catch (e) {
                console.error(e)
            }
        })
    }
}