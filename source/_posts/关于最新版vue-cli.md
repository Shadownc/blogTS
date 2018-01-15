---
title: '关于最新版vue-cli'
date: 2018-01-15 13:24:49
categories:
- Vue
tags:
- Vue
---
### 如题。。
今天准备新建个`vue-cli`的项目测试用，但是当你`cmd`执行命令的时候却一直报错。。
`cmd`命令：
```
vue init webpack projectName
```
**执行上面的命令时报了如下错误：**
![](/images/vueerror.jpg '错误截图')

度娘上搜也并没有发现很好的解决办法。。
最后本地`cmd`查看了下`vue-cli`的版本
发现是**2.8.1**的，下面就是解决这个报错的方法：
```
npm i vue-cli -g
```
**将本地的vue-cli升级到最新版本**
**有不同见解的小伙伴欢迎加群163958730讨论**