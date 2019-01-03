---
title: node升级10.x版本以后遇到的坑
date: 2019-01-03 15:40:18
categories:
- node
tags:
- node
---
node升级10.x版本以后遇到的坑
<!-- more -->
##### 报错信息
![gulp-error.png](/images/gulp-error.jpg '错误截图')
##### 解决方案
```JavaScript
#在项目根目录下执行
npm i natives

#删除之前安装的旧版本
npm rm -g gulp(-g 删除全局)

```
