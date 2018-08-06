---
title: express+mongodb写接口遇坑
date: 2018-08-01 15:53:49
categories:
- node
tags:
- node
---
##### node crypto密码加密
```JavaScript
#express加密密码时报错 Digest already called
#报错写法：
const crypto = require('crypto');//密码加密
const md5 = crypto.createHash('md5');
#正确写法：放到router.post(xx,(req,res)=>{})中去
require('crypto').createHash('md5').update(req.body.password).digest('hex')
```
##### mongodb 查询
```JavaScript
//只输出id和title字段，第一个参数为查询条件，空代表查询所有
db.news.find( {}, { id: 1, title: 1 } )
//如果需要输出的字段比较多，不想要某个字段，可以用排除字段的方法
//不输出内容字段，其它字段都输出
db.news.find( {查询条件}, {content: 0 } )
```
##### express-session 本地接口没问题，部署以后post请求会出现参数不匹配--502
```JavaScript
#排查了很久发现是退出登录以后再次请求没有清楚session
#退出登录方法中调用:
req.session.destroy();
```