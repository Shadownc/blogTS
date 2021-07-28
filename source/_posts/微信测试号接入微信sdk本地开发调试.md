---
title: 微信测试号接入微信sdk本地开发调试
date: 2021-07-28 21:52:22
categories:
- JavaScript
tags:
- JavaScript
---
微信测试号接入微信sdk本地开发调试
<!-- more -->
H5开发的网页在微信端需要调用微信sdk的录音功能,自己摸索下来总结的一些经验。
>由于用户体验和安全性方面的考虑，微信公众号的注册有一定门槛，某些高级接口的权限需要微信认证后才可以获取。所以，为了帮助开发者快速了解和上手微信公众号开发，熟悉各个接口的调用，我们推出了微信公众帐号测试号，通过手机微信扫描二维码即可获得测试号。
## 申请测试号
[点此去申请微信测试号](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)
## 获取jssdk签名配置
1. 在测试号管理界面绑定`JS接口安全域名`**(可以用本地的ip，方便在真机预览调试)**
2. 扫码关注自己的测试号
3. 要引入微信`jssdk`需要**通过config接口注入权限验证配置**
    ``` js
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: '', // 必填，公众号的唯一标识
      timestamp: , // 必填，生成签名的时间戳
      nonceStr: '', // 必填，生成签名的随机串
      signature: '',// 必填，签名
      jsApiList: [] // 必填，需要使用的JS接口列表
    });
    ```
**获取signature**
1. 访问[此链接](https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret})获取`access_token`,参数就是测试号的`appid`和`appsecret`
2. 通过获取到的`access_token`采用http GET方式请求获得jsapi_ticket（有效期7200秒，开发者必须在自己的服务全局缓存jsapi_ticket）：https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi  
    成功返回如下JSON：
    ```
    {
      "errcode":0,
      "errmsg":"ok",
      "ticket":"bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA",
      "expires_in":7200
    }
    ```
    获得`jsapi_ticket`之后，就可以生成`JS-SDK`权限验证的签名了。我是使用官方提供的`python`版的`demo`生成的签名，调试前生成签名，填入配置，在微信开发者工具的公众号网页调试地址栏输入我们本地的开发`ip`再点击预览即可在手机上进行调试
    >[示例代码](http://demo.open.weixin.qq.com/jssdk/sample.zip)

    >备注：链接中包含php、java、nodejs以及python的示例代码供第三方参考，第三方切记要对获取的accesstoken以及jsapi_ticket进行缓存以确保不会触发频率限制。
## python3的需要对官方提供的代码进行一定的修改
``` js
import time
import random
import string
import hashlib


class Sign:
    def __init__(self, jsapi_ticket, url):
        self.ret = {
            'nonceStr': self.__create_nonce_str(),
            'jsapi_ticket': jsapi_ticket,
            'timestamp': self.__create_timestamp(),
            'url': url
        }

    def __create_nonce_str(self):
        return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(15))

    def __create_timestamp(self):
        return int(time.time())

    def sign(self):
        string = '&'.join(['%s=%s' % (key.lower(), self.ret[key]) for key in sorted(self.ret)])
        print(string)
        string=string.encode("utf8")//需要先编码 不然运行会报错
        self.ret['signature'] = hashlib.sha1(string).hexdigest()
        return self.ret


if __name__ == '__main__':
    # 注意 URL 一定要动态获取，不能 hardcode
    sign = Sign('jsapi_ticket','url')//url 可以用本地开发地址(本机ip)方便调试
    print(sign.sign())
```
