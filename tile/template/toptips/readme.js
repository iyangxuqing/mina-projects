/*

    toptips：
    顶部提示条，默认显示时间为1500ms。

    使用方法：
    this.toptips({
        type: 'error', //默认error，可选error、warn、info、success
        text: '提示的文本',
        success: function(){} //提示结束后执行的代码
    })

    引用方法：
    1、在page.wxml文件中引入
        <import src="/template/toptips/toptips.wxml"/>
    2、在page.wxml文件中引用
        <template is="toptips" data="{{...toptips}}"/>
    3、在page.wxss文件中引入
        @import "/template/toptips/toptips/wxss";
    4、在page.js文件中引入
        import {toptips} from "../../template/toptips/toptips.js"
    5、在page.js的page.onLoad事件中注册
        toptips()
    6、随后可以在代码中以this.toptips({text:'...'})的方式使用

*/