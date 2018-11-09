// Created by Jimmy on 2018/11/05
import axios from "axios"; // 引入axios
import wx from "weixin-js-sdk"; // 引入微信的jssdk
import { Toast } from "mint-ui"; // 这里用到了Mint-ui的弹框  使用其他框架的 可以自行替换
import { isWeiXin } from "../utils/common"; // 判断是否是微信的一个脚本 完全可以用自己的脚本代替

let wxShare = {
  // ==================config配置================
  wxSdkConfig(shareWXTicketUrl, currentUrl) {
    if (isWeiXin()) {
      // 判断是否是微信浏览器，只有在微信浏览器才会去执行这段代码
      // currentUrl表示当前需要向微信请求的可以分享URL 脚手架项目里面一般为location.href.split("#")[0]
      // 注释：当前地址是获取到之后由后端发送到微信 再由微信授权给当此域名授权可以分享 而后后面的字符串拼接完全随意 只要能访问到就行
      axios
        .post(shareWXTicketUrl, { url: currentUrl })
        .then(res => {
          if (res.data != "") {
            let _json = JSON.parse(res.data);
            wx.config({
              debug: false,
              appId: _json.appid, // 微信appid
              timestamp: _json.timestamp, // 时间戳
              nonceStr: _json.nonceStr, // 生成签名的随机字符串
              signature: _json.signature, // 签名
              jsApiList: [
                "updateAppMessageShareData",
                "updateTimelineShareData",
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "onMenuShareQQ",
                "onMenuShareWeibo",
                "onMenuShareQZone"
              ]
            });
          } else {
            // 获取数据失败的提示
            Toast("数据获取失败");
          }
        })
        .catch(error => {
          Toast(error);
        });
    }
  },
  wxSDKshare(shareInfo, isHideOptionMenu) {
    wx.ready(() => {
      if (isWeiXin()) {
        if (!isHideOptionMenu) {
          wx.showOptionMenu();
          wx.updateAppMessageShareData({
            title: shareInfo.title, // 分享标题
            desc: shareInfo.content, // 分享描述
            link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareInfo.imgUrl, // 分享图标
            success: shareInfo.success,
            cancel: shareInfo.cancel
          });
          wx.updateTimelineShareData({
            title: shareInfo.title, // 分享标题
            link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareInfo.imgUrl, // 分享图标
            success: shareInfo.success,
            cancel: shareInfo.cancel
          });
          wx.onMenuShareTimeline({
            // 分享到朋友圈
            title: shareInfo.title, // 分享标题
            link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareInfo.imgUrl, // 分享图标
            success: shareInfo.success,
            cancel: shareInfo.cancel
          });
          wx.onMenuShareAppMessage({
            // 分享给朋友
            title: shareInfo.title, // 分享标题
            desc: shareInfo.content, // 分享描述
            link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareInfo.imgUrl, // 分享图标
            type: shareInfo.type || "", // 分享类型,music、video或link，不填默认为link
            dataUrl: shareInfo.dataUrl || "", // 如果type是music或video，则要提供数据链接，默认为空
            success: shareInfo.success,
            cancel: shareInfo.cancel
          });
          wx.onMenuShareQQ({
            // 分享到QQ
            title: shareInfo.title, // 分享标题
            desc: shareInfo.content, // 分享描述
            link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareInfo.imgUrl, // 分享图标
            success: shareInfo.success,
            cancel: shareInfo.cancel
          });
          wx.onMenuShareWeibo({
            // 分享到微博
            title: shareInfo.title, // 分享标题
            desc: shareInfo.content, // 分享描述
            link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareInfo.imgUrl, // 分享图标
            success: shareInfo.success,
            cancel: shareInfo.cancel
          });
          wx.onMenuShareQZone({
            // 分享到QQ空间
            title: shareInfo.title, // 分享标题
            desc: shareInfo.content, // 分享描述
            link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareInfo.imgUrl, // 分享图标
            success: shareInfo.success,
            cancel: shareInfo.cancel
          });
        } else {
          wx.hideOptionMenu();
        }
      }
    });
  }
};

export default wxShare;
