---
title: js定时器执行一次和重复执行
date: 2020-06-01 10:50:40
categories:
- JavaScript
tags:
- JavaScript
js定时器执行一次和重复执行
<!-- more -->
##### js 定时器 执行一次和重复执行
1.执行一次(延时定时器)
```JavaScript
var t1 = window.setTimeout(function() {
	console.log(‘1秒钟之后执行了’)
	window.clearTimeout(t1) // 去除定时器
},1000)
```
2.重复执行(间歇定时器)
```JavaScript
var t2 = window.setInterval(function() {
	console.log(‘每隔1秒钟执行一次’)
	window.clearInterval(t2) // 去除定时器
},1000)
```
**注意：单纯的使用setInterval会导致页面卡死，其原因与JS引擎线程有关，用通俗话说就是setInterval不会清除定时器队列，每重复执行1次都会导致定时器叠加，最终卡死你的网页。但是setTimeout是自带清除定时器的**
```JavaScript
setInterval(function() {
	setTimeout(function() {
		console.log(‘1秒钟之后执行了’)
	},0)
},1000)
```
**setInterval必须放在外层（在内层会导致页面卡顿直到崩溃），内层配合setTimeout，即可无限次调用**