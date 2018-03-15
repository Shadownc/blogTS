---
title: vue点击空白处隐藏
date: 2018-03-15 15:59:01
categories:
- Vue
tags:
- Vue
---
##### 方法有两种
1.div失去焦点事件：
```JavaScript
<div @click="show()" :tabindex="-1" @blur="hide()">hide</div>
//hide方法里控制v-if,v-show
```
2.监听点击事件
```JavaScript
document.addEventListener("click", e => {
      console.log(e.target);
      if (!this.$el.contains(e.target)) this.show = false;
    });
//this.show 为data中控制v-if,v-show的属性
```