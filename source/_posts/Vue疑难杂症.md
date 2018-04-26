---
title: Vue疑难杂症
date: 2018-04-26 14:01:27
categories:
- Vue
tags:
- Vue
---
本文收集群友发得问题而写...持续更新。。。
话不多说，直接上问题与解决方法：
1.vue-resource 处理多个请求的问题 
**不知道这种情况算不算啊。。tab切换的时候 前一个请求未完成点击切换立马发了下一个请求，导致之前的请求结果也渲染了**
解决方法：
```JavaScript
//其实github上有源码，我就直接复制粘贴了
 this.$http.get('/someUrl', {

    // use before callback
    before(request) {

      // abort previous request, if exists
      if (this.previousRequest) {
        this.previousRequest.abort();//中断请求
      }

      // set previous request on Vue instance
      this.previousRequest = request;
    }

  }).then(res=> {
    // success callback
  }, err=> {
    // error callback
  });
```
2.组件通信(包含非父子组件)
**最常见的父子组件通讯采用prop，这个应该不用多说吧 不知道的看下面的链接**
[组件传值-Prop](https://cn.vuejs.org/v2/guide/components.html#Prop)
使用prop的注意点：
```JavaScript
<child1 ref="child1" msg="{name:'bill'}"></child1>
<child1 ref="child1" :msg="{name:'bill'}"></child1>
//首先冒号是v-bind的缩写，不带冒号后面是字符串，带了冒号就是数据绑定，引号里面的内容是变量或者表达式, 组件内不能修改props的值
```
**子组件修改父组件的数据操作：**
```JavaScript
//这在vue中是不允许的，因为vue只允许单向数据传递，这时候我们可以通过触发事件来通知父组件改变数据，从而达到改变子组件数据的目的.
子组件：
<template>
    <div @click="toChange"></div>
</template>

methods: {
    toChange() {
        this.$emit('getChange','shadow'); //主动触发getChange方法，'shadow'为向父组件传递的数据
    }
}

父组件：
<template>
  <div>
      <child @getChange="change" :msg="msg"></child> //监听子组件触发的upup事件,然后调用change方法
  </div>
</template>
methods: {
    change(msg) {
        this.msg = msg;//父组件得msg值为shadow
    }
}
```
**下面说一下非父子组件的传值：**
vue的官网其实已经写了 [bus](https://cn.vuejs.org/v2/guide/components.html#非父子组件的通信)，但是好像并不详细 好多人不会用，下面讲解一下用法：
```JavaScript
//写法可以有两种(注意！！都是在main.js进行操作)：
new Vue({
  el: '#app',
  router,
  components: { App },
   data: {
  // 空的实例放到根组件下，所有的子组件都能调用
    Bus: new Vue()
  },
  template: '<App/>'
})
//第一种写法的使用方法为(发送，接收)：
this.$root.Bus.$emit('事件名',payload);//payload为传送的值
this.$root.Bus.$on('事件名',shadow=>{consloe.log(shadow)//shadow为接收到得值})

//第二种写法类似插件，就是简化使用：
Vue.prototype.$Bus = new Vue();
//使用方法就是写法上的改变：
this.$Bus.$emit('事件名',payload);//payload为传送的值
this.$Bus.$on('事件名',shadow=>{consloe.log(shadow)//shadow为接收到得值})
```
**除了bus非父子组件通信就要用vuex了，之前有过[vuex](https://shadownc.github.io/2018/01/17/%E5%85%B3%E4%BA%8EVuex/)得文章，写得一般 有问题得可以加群讨论(163958730)**
3.vue-router导航守卫
*这个其实项目前差不多都是配置好得。。我也不知道要说什么 挑几个常用的讲一下*
一些基础的参数说明我就不写了吧。。[官网链接](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html)
**router.beforeEach**
```JavaScript
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
    if (token) {  // 判断当前的token是否存在
      next();//已登录直接进入下一个页面
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});
//需要登录的组件相对应的路由加上配置
{
            path: "result",
            component: result,
            name: 'result',
            meta: {requireAuth: false}
},
```
**beforeRouteEnter(组件内的守护)**
```JavaScript
//一般用于进入组件之前需要操作
//父子组件有时候好像有点坑。。使用的时候自己注意吧
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```
4.vue-router懒加载组件引入方式写法：
```JavaScript
const HelloWorld = r => require.ensure([], () => r(require('@/components/HelloWorld')), 'Home');
```
