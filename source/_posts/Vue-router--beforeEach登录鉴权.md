---
title: Vue-router beforeEach登录鉴权
date: 2021-09-28 20:28:24
categories:
- Vue
tags:
- Vue
---
Vue-router beforeEach登录鉴权
<!-- more -->
## 全局前置守卫
``` js
router.beforeEach((to, from, next) => {
  // ...
})
```
每个守卫方法接收三个参数：

-   `to`: 即将要进入的目标路由对象

-   `from`: 当前导航正要离开的路由

-   `next`: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。

    -   `next()` : 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 `confirmed` (确认的)。
    -   `next(false)` : 中断当前的导航。如果浏览器的 `URL` 改变了 (可能是用户手动或者浏览器后退按钮)，那么 `URL` 地址会重置到 `from` 路由对应的地址。
    -   `next('/')` 或者 `next({ path: '/' })` : 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 [`router-link` 的 `to` prop](https://router.vuejs.org/zh/api/#to) 或 [`router.push`](https://router.vuejs.org/zh/api/#router-push) 中的选项。
    -   **`next(error)`** : (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 [`router.onError()`](https://router.vuejs.org/zh/api/#router-onerror) 注册过的回调。
	
## 登录鉴权(需要在登录成功的时候修改跳转逻辑)
```
router.beforeEach((to, from, next) => {
  document.title=to.meta.title //设置当前页的title
  if (to.matched.some(record => record.meta.auth)) {
    if (localStorage.getItem('access_token')) {
        next()
    } else {
      if (to.name === 'Login') {//防止next无限循环的问题
        next();
        return
      }
      next({
        path: '/Login',
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next()
  }

})
```
> 登录成功返回将要跳转的页面且返回上一页不是登录页

``` js
api.login().then((res) => {
        if (res.success) {
          localStorage.setItem("access_token", res.token);
          //有redirect登录成功返回将要跳转的页面且返回上一页不是登录页
          let redirect=this.$route.query.redirect; 
          redirect ? this.$router.replace(redirect) : this.$router.push("/");
          //或者 登录页直接登录，登录成功返回将要跳转的页面且返回上一页不是登录页
          let redirect=this.$route.query.redirect || '/';
          this.$router.replace(redirect);
        }
      });
```
## 不需要在登录成功中处理跳转
``` js
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (to.matched.some(record => record.meta.auth)) {
    if (localStorage.getItem('access_token')) {
      if (Object.keys(from.query).length === 0) {//判断路由来源是否有query，处理不是目的跳转的情况
        next()
      } else {
        let redirect = from.query.redirect//如果来源路由有query
        if (to.fullPath === redirect) {//这行是解决next无限循环的问题
          next()
        } else {
          next({ path: redirect, replace: true })//跳转到目的路由
        }
      }
    } else {
      if (to.name === 'Login') {
        next();
        return
      }
      next({
        path: '/Login',
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next()
  }

})
```
> 直接登录页登录成功跳转到将要去的界面点击浏览器返回上一页不是登录页

``` js
this.$router.replace('/')
```