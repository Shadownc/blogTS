---
title: Vue watch $route怎么不生效呢？
date: 2022-07-21 14:55:17
categories:
- Vue
tags:
- Vue
---
Vue watch $route不起作用解决方案
<!-- more -->
## Vue页面中监听路由变化我们可以用`watch`来实现：
``` js
watch: {
    '$route'(to, form) {
      console.log(to);
    }
  }
```
然后你却发现不管来回跳转多少次页面，控制台也没有打印出路由信息。
### 1. 简单粗暴解决办法
``` js
watch: {
    $route: {
      immediate: true, // 一旦监听到路由的变化立即执行
      handler(to, from) {
        console.log(to);
      },
    },
  }
```
### 2. 将`router-view`用`keep-alive`包裹起来
``` js
<keep-alive>
    <router-view></router-view>
</keep-alive>
```
> 首先，路由组件的渲染区域为`router-view`，将匹配到的路由组件渲染在该区域中，路由组件渲染默认的方式是销毁 - 创建，可以在页面的生命周期中进行测试。
``` js
created(){
    console.log("组件被创建");
}
```
> 由于路由组件的渲染方式，组件实例上定义的方法每创建一次组件`new Vue()`，方法都是新添加上去的，所以`$watch`这个操作就监听不到路由的变化。`keep-alive`组件的功能只有一个那就是缓存组件，可以让其包裹的组件不销毁，起到一个缓存的作用.**此时需要注意：加上了keep-alive在第一次跳转路由后你定义的生命周期函数 created()将不会再被调用**