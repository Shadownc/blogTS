---
title: js从Url获取参数的方法汇总
date: 2022-12-01 16:23:02
categories:
- JavaScript
tags:
- JavaScript
---
js从Url获取参数的方法汇总
<!-- more -->
## 一行代码装起来(`URLSearchParams`)
``` js
const getParams = (url = location.href) => {
    return Object.fromEntries(new URLSearchParams(url.substring(url.indexOf('?'))))
}
```
## 遍历searchParams
``` js
const getParams = (url = location.href) => {
    let res = {}
    let dealUrl = new URL(url).searchParams
    for (let key of dealUrl.entries()) {
        res[key[0]] = key[1]
    }
    return res
}
```
## 正则获取
1.正则区别`/(\w+)=(\w+)/`无法获取参数中的中文
``` js
const getParams = (url = location.href) => {
    let arr = url.match(/([^?=&]+)=([^=&]+)/gi);
    let obj = {};
    arr.map(item => {
        let [key, value] = item.split("=");
        obj[key] = value;
    })
    return obj;
}
```
``` js
const getParams = (url = location.href) => {
    const res = {}
    url.replace(/([^?=&]+)=([^=&]+)/g, (_, $1, $2) => {
        res[$1] = $2
    })
    return res
}
```
## 获取url指定参数
``` js
const getQueryString =(name)=> {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}
```
``` js
const getQueryString = (name, search) => {
  search = search ||  window.location.search.substr(1) || window.location.hash.split("?")[1];
  let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  let r = search.match(reg);
  if (r != null) return  unescape(r[2]); return null;
}
```