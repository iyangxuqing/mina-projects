/*

wetoast是wx.showToast增强插件

使用方法：

1、在app.js中全局引入wetoast.js
let {WeToast} = require('template/wetoast/wetoast.js');
这样WeToast就是一个构造函数，实例化它可以得到一个包含各种功能的WeToast对象。
将WeToast这个构造函数挂接到App这个全局对象上
App({
    WeToast: WeToast
})
这样就可以通过App.WeToast()来调用了。

2、在需要使用的页面，引入App这个对象
let app = getApp();
在页面的onLoad()事件中实例化WeToast组件
new app.WeToast(); 这样就在这个page上挂接了wetoast这个对象，也就是说可以这样来调用:
this.wetoast(option)

3、要使用wetoast组件，还需要将wetoast.wxml和wetoast.wxss引入。
可以将wetoast.wxml逐个引入到需要使用的页面中
<import src='../../template/wetoast/wetoast.wxml'/>
然后再在页面中使用template
<template is="wetoast" data="{{...__wetoast__}}"/>
而wetoast.wxss则可以引入到全局样式文件app.wxss中
@import "template/wetoast/wetoast.wxss";

*/