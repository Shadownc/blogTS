---
title: JS奇技淫巧
date: 2021-06-21 11:29:10
categories:
- JavaScript
tags:
- JavaScript
---
JS奇技淫巧
<!-- more -->
## 随机生成字母和数组的组合

```js
Math.random().toString(36).substr(2);
```

## 格式化时间

```js
const dateFormatter = (formatter, date) => {
	date = (date ? new Date(date) : new Date)
	const Y = date.getFullYear() + '',
          M = date.getMonth() + 1,
          D = date.getDate(),
          H = date.getHours(),
          m = date.getMinutes(),
          s = date.getSeconds()
    return formatter.replace(/YYYY|yyyy/g, Y)
        			.replace(/YY|yy/g, Y.substr(2, 2))
        			.replace(/MM/g, (M < 10 ? '0' : '') + M)
        			.replace(/DD/g, (D < 10 ? '0' : '') + D)
        			.replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
        			.replace(/mm/g, (m < 10 ? '0' : '') + m)
        			.replace(/ss/g, (s < 10 ? '0' : '') + s)
}

dateFormatter('YYYY/MM/DD hh:mm:ss',new Date()) // 2021/06/21 11:11:17
```

## 获取变量的实际类型

```js
const trueTypeOf = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

console.log(trueTypeOf(''));
// string
console.log(trueTypeOf(0));
// number
console.log(trueTypeOf());
// undefined
console.log(trueTypeOf(null));
// null
console.log(trueTypeOf({}));
// object
console.log(trueTypeOf([]));
// array
console.log(trueTypeOf(0));
// number
console.log(trueTypeOf(() => {}));
// function
```

## 1. if多条件判断

```js
// 冗余
if (x === 'abc' || x === 'def' || x === 'ghi' || x ==='jkl') {}

// 简洁
if (['abc', 'def', 'ghi', 'jkl'].includes(x)) {}
```

## 2. if...else...

```js
// 冗余
let test: boolean;
if (x > 100) {
    test = true;
} else {
    test = false;
}

// 简洁
let test = x > 10;
let text = x > 10 ? true : false
```

*   多条件判断同一执行方法

```js
if(status === 0 || status === 1 || status === 2 || status === 3) {
    console.log('按钮可以点击');
}
// =>

if([0, 1, 2, 3].includes(status)) {
    console.log('按钮可以点击');
}
```

*   多种可能对应不同情况

```js
// status 非数值或数值过大
const statusTextObject = {
    100: '已删除',
    101: '未开始',
    102: '上课中',
    103: '已下课',
    104: '已评估'
}
text = statusTextObject[status] || '--';

// 非数值我们将对象的 key 替换为对应status的值即可。
```

## 3. Null, Undefined, 空值检查

```js
// 冗余
if (first !== null || first !== undefined || first !== '') {
    let second = first;
}

// 简洁
let second = first || '';
```

## 4. 函数条件调用

```javaScript
// 冗余
function test1() {
  console.log('test1');
};
function test2() {
  console.log('test2');
};
var test3 = 1;
if (test3 == 1) {
  test1();
} else {
  test2();
}

// 简单
(test3 === 1? test1:test2)();
```

## 5. switch多条件

```js
// 冗余
switch (data) {
  case 1:
    test1();
  break;

  case 2:
    test2();
  break;

  case 3:
    test();
  break;
  // so on...
}

// 简洁
var data = {
  1: test1,
  2: test2,
  3: test
};

data[anything] && data[anything]();
```

## 6. 隐式返回

```js
// 冗余
function getArea(diameter) {
  return Math.PI * diameter
}

// 简洁
getArea = diameter => (
  Math.PI * diameter;
)
```

## 7. 普通数组去重&对象数组去重

```js
const uniqueArr = (arr) => [...new Set(arr)];

console.log(uniqueArr([1, 2, 3, 1, 2, 3, 4, 5]));
// [1, 2, 3, 4, 5]


const uniqueElementsBy = (arr, fn) =>arr
.reduce((acc, v) => {if (!acc.some(x => fn(v, x))) acc.push(v);return acc;}, []);
 
uniqueElementsBy([{id: 1, name: 'Jhon'}, {id: 2, name: 'sss'}, 
{id: 1, name: 'Jhon'}], (a, b) => a.id == b.id)
// [{id: 1, name: 'Jhon'}, {id: 2, name: 'sss'}]

```

## 8. 从数组中取出相对应属性的值

```js
const reducedFilter = (data, keys, fn) =>data.filter(fn)
.map(el =>keys.reduce((acc, key) => {acc[key] =el[key];return acc;}, {}));
const data = [
  {
    id: 1,
    name: 'john',
    age: 24
  },
  {
    id: 2,
    name: 'mike',
    age: 50
  }
];
 
let a = reducedFilter(data, ['id', 'name'], item => item.age > 24); // [{ id: 2, name: 'mike'}]
```

## 9.关于 return cur.push(v\*2),cur之谜

    let arr=[1,2,3,4]
    const b=arr.reduce((cur,v)=> [...cur,v*2],[])
    const b1=arr.reduce((cur,v)=> {
        //直接 return cur.push(v*2)报错是因为 push返回的不是数组，是push之后的长度
        return cur.push(v*2),cur
    },[])
    const b2=arr.reduce((res, cur)=> { 
        res.push(cur * 2); 
        return res; 
    }, [])
    // [2,4,6,8]

*   `return cur.push(v*2),cur`等同于`return cur`

## 10.邮箱正则

```js
export const isEmail = (e) => {
    return /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(e)
}
```

## 11.是否是微信浏览器

```js
export const isWeiXin = () => {
    return ua.match(/microMessenger/i) == 'micromessenger'
}
```

## 12.去除html标签

```js
const removeHtmlTag = (str) => {
    return str.replace(/<[^>]+>/g, '')
}
```

## 13.动态引入js

```js
export const innerScript = (src) => {
    const s = document.createElement('script');
    s.type = 'text/JavaScript';
    s.async = true;
    s.src = src;
    const t = document.getElentsByTagName('script')[0];
    t.parentNode.insertBefore(s, t)
}
```

## 14.判断对象是不是空对象

```js
let data={}
// 第一种 将json对象转化为json字符串，再判断该字符串是否为"{}"
JSON.stringify(data)==='{}'
// 第二种 获取data中的键名key，数组长度为0则是空对象
Object.keys(data).length===0
// 第三种 方法
const isEmpty = obj => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object
//isEmpty(data) // true
```

## 15.判断对象中是不是所有值都为空

```js
let data = {  name: "1",  value: "2", value2: ""}
Object.values(data).every(i=>!i) // 所有值都为空的时候返回true
Object.values(data).some(i=>!i)  //有一个值是空就返回true
```

## 16.双`!`号操作符将任何变量转换为布尔值

```js
!!0        //false
!!'0'     // true 此处0是string
!!'true'  // true
!!'false' // true
!!'undefined' //true
!!false   // false
!!undefined //false
!!null    //false
```

## 17.当满足条件时往对象中添加属性

```js
let isExist = true;
let obj = {
    other:'other'
}
// 基础版
if(isExist){
    obj.name='IMyself'
}
// 优雅进阶版
obj={
    ...obj,
    ...isExist&&{name:'IMyself'}
}
```

## 18.函数执行时间

```js
console.time('testTime')
for(let i=0;i<10;i++){
    console.log(i)
}
console.timeEnd('testTime')
```

## 19.判断是否滚动到底部

```js
const bottomVisible = () =>
    document.documentElement.clientHeight + window.scrollY >=
    (document.documentElement.scrollHeight ||
        document.documentElement.clientHeight);
//bottomVisible()
```

## 20.去除数组中的空值假值

```js
Array.filter(Boolean);

const newArr = arr.filter((item)=> {
    return item && item.trim(); 
});
```

## 21.js拼接get请求参数，加入有值参数去除空参

```js
const formatParams = (params) => {
    var result = [];
    for (var key in params) {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
            result.push(key + '=' + encodeURIComponent(params[key]));
        }
    }
    return result.join('&').padStart(result.join('&').length + 1, '?');
}
console.log(formatParams({ a: 1, b: '' })); //?a=1
```

## 22.判断浏览器是否全屏

```js
// 添加onresize事件监听器
window.addEventListener('resize', handleResize);

// 处理onresize事件
function handleResize() {
  if (window.innerHeight == screen.height) {
    console.log('浏览器已进入全屏模式');
  } else {
    console.log('浏览器已退出全屏模式');
  }
}
// or
window.onresize = () => {
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
    let isFullScreen = screen.height == clientHeight
}
//or
document.addEventListener('fullscreenchange', (event) => {
    if ((window.innerWidth === screen.width && window.innerHeight === screen.height) || window.fullScreen) {
        console.log('浏览器进入全屏模式');
    } else {
        console.log('浏览器退出全屏模式');
    }
});
```