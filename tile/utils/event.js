function Emitter() {
    this._listener = [];//_listener[自定义的事件名] = [所用执行的匿名函数1, 所用执行的匿名函数2]
    this.on = function(e){
        console.log('on');
    }
    console.log('Emitter init.')
    this.init = function(e){
        this.setData({
            abc: 123
        })
    }
    // this.init();
}

//注册事件
Emitter.prototype.bind = function (eventName, callback) {
    var listener = this._listener[eventName] || [];//this._listener[eventName]没有值则将listener定义为[](数组)。
    listener.push(callback);
    this._listener[eventName] = listener;
}

//触发事件
Emitter.prototype.trigger = function (eventName) {
    var args = Array.prototype.slice.apply(arguments).slice(1);//atgs为获得除了eventName后面的参数(注册事件的参数)
    var listener = this._listener[eventName];

    if (!Array.isArray(listener)) return;//自定义事件名不存在
    listener.forEach(function (callback) {
        try {
            callback.apply(this, args);
        } catch (e) {
            console.error(e);
        }
    })
}
//实例
// var emitter = new Emitter();
// emitter.bind("myevent", function (arg1, arg2) {
//     console.log(arg1, arg2);
// });

// emitter.bind("myevent", function (arg1, arg2) {
//     console.log(arg2, arg1);
// });

// emitter.trigger('myevent', "a", "b");

module.exports = {
    Emitter: Emitter
}