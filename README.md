# Created by Jimmy Zhang

# version 1.2.0

# 仅用于微信分享

# 使用方法简单易懂

1. 引入axios
2. 在项目中引入微信jssdk
3. 在该文件引入微信jssdk
4. 引入判断是否是微信的一个脚本 完全可以用自己的脚本代替 可以分别在各界面去判断使用，但是那样效率不高
   是否是微信浏览器判断脚本：
   // 判断是否是微信浏览器
    export function isWeiXin() {
        //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
        let ua = window.navigator.userAgent.toLowerCase();
        //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }
5. main.js中引入，然后配置wxSdkConfig(shareWXTicketUrl, currentUrl)方法
   如： import wxSdk from "./utils/wxShare";
        wxSdk.wxSdkConfig(
            `http://yoururl`,
            location.href.split("#")[0]
        );
    可以将其配置成：Vue.prototype.$wxSdk = wxSdk;
6. 各界面：this.$wxSdk.wxSDKshare(shareInfo, isHideOptionMenu);
    // 描述
    // 当isHideOptionMenu为true的时候shareInfo可以为null
    // 根据js的特性 不必要的属性可以选择不填 例如type和dataUrl
    // shareInfo = {
    //   title: "分享标题",
    //   content: "描述",
    //   link: "", // 微信通过审核的地址的后缀 例如 '#'+window.location.href.split("#")[1] "#"是在vue router的hash模式下
    //   imgUrl: "", // 图片的url 格式为https://xxx.xxx.xxx 不支持相对路径
    //   type: "", // 分享类型,music、video或link，不填默认为link
    //   dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
    //   success: function() {
    //     // 成功的回调
    //   },
    //   cancel: function() {
    //     // 失败的回调
    //   }
    // }
    //   isHideOptionMenu: false // 是否隐藏分享按钮  默认不隐藏 为true的时候隐藏
7. 这样可以完成只配置一次config再设置是否可以分享和分享
8. 个人表达能力有限可以跟我留言哦 我的邮箱是 2734339436@qq.com
