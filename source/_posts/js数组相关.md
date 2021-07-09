---
title: js数组相关
date: 2021-07-09 08:50:26
categories:
- JavaScript
tags:
- JavaScript
---
js数组相关
<!-- more -->
## 数组
### push
作用：向数组的末尾添加一个或更多元素  
参数：(item1, item2, ...)  
返回值: push完成后数组的新长度
``` Javascript
let arr = []
arr.push(1)
arr.push(2,3,4)
console.log(arr) // [1, 2, 3, 4]
```
### pop
作用：删除数组的最后一个元素(**改变原数组**)  
参数： 无  
返回值: 被删除的元素
``` js
let arr = [1,2,3,4]
let res = arr.pop()
console.log(res, arr) // 4  [1, 2, 3]
```
### shift
作用：删除数组的第一个元素(**改变原数组**)   
参数： 无  
返回值: 被删除的元素
``` js
let arr = [1,2,3,4]
let res = arr.shift()
console.log(res, arr) // 1 [2,3,4]
```
### unshift
作用：从数组的头部添加元素(**改变原数组**)  
参数： (item1, item2, ...)  
返回值: 数组的长度
``` js
let arr = [1,2,3,4]
let res = arr.unshift(0)
console.log(res, arr) // 5 [0,1,2,3,4]
```
### slice
作用：截取新数组(**不改变原数组**)  
参数：(start,end)  
返回值: 截取部分的新数组
``` js
let arr = [1,2,3,4]
let res = arr.slice(1)
console.log(res, arr) // [2, 3, 4] [1, 2, 3, 4]
```
### splice
作用：截取新数组(**改变原数组**)  
参数：(index,howmany,item)  
- index:必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置
- howmany:要删除的项目数量。如果设置为 0，则不会删除项目
- 可选。向数组添加的新项目
返回值: 截取部分的新数组
``` js
let arr = [1,2,3,4]
arr.splice(2, 1, 'test')
console.log(arr) //  [1, 2, "test", 4]
```
### reverse
作用：颠倒数组中元素的顺序(**改变原数组**)  
参数： 无  
返回值: 颠倒顺序的数组
``` js
let arr = [1,2,3,4]
let res = arr.reverse()
console.log(res, arr) // [4, 3, 2, 1]  [4, 3, 2, 1] 
```
### join
作用：按照指定的分隔符，将数组分割成字符串(**不改变原数组**)  
参数： (separator)  
返回值: 数组分割后的字符串
``` js
let arr = [1,2,3,4]
let res = arr.join('-')
console.log(res, arr) // 1-2-3-4  [1, 2, 3, 4]
```
### concat
作用：拼接两个或者多个数组(**不改变原数组**)  
参数： (arr1, arr2, ...)  
返回值: 返回拼接后的数组， 该方法不会影响原数组，而是返回新创建的数组
``` js
let arr = [1,2,3,4]
let arr2 = [5,6,7]
let res = arr.concat(arr2)
console.log(res, arr) // [1, 2, 3, 4, 5, 6, 7]  [1, 2, 3, 4]
```
### indexOf
作用：用于查找数组中是否存在某个值  
参数： (value) 查找的值  
返回值: 如果存在查找的值，返回对应的下标，否则返回-1
``` js
let arr = [1,2,3,4]
let res1 = arr.indexOf(5)
let res2 = arr.indexOf(1)
console.log(res1, res2) // -1 0
// ===-1 不存在
// ~判断存在 !~判断不存在 
if (!~arr.indexOf(5)) {
    console.log('不存在')
}
```
### includes
作用：用于查找数组中是否存在某个值  
参数： (value) 查找的值  
返回值: 如果存在查找的值，如果存在返回true否则返回false
``` js
let arr = [1,2,3,4]
let res1 = arr.includes(5)
let res2 = arr.includes(1)
console.log(res1, res2) // false true
```
### find
作用：用于查找数组中是否存在某个值  
参数： (fn) 匹配函数  
返回值: 如果存在查找的值，如果返回第一个符合条件的元素否则返回undefined
``` js
let arr = [1,2,3,4]
let res1 = arr.find(item => item > 1)
let res2 = arr.find(item => item > 100)
console.log(res1, res2) // 2 undefined
```
### findIndex
作用：用于查找数组中是否存在某个值  
参数： (fn) 匹配函数  
返回值: 如果存在查找的值，如果返回第一个符合条件的元素下标否则返回-1
``` js
let arr = [1,2,3,4]
let res1 = arr.findIndex(item => item === 2)
let res2 = arr.findIndex(item => item === 100)
console.log(res1, res2) // 1 -1
```
### sort
作用：数组排序(**改变原数组**)  
参数： (fn) 排序函数  
返回值:排序后的数组
``` js
let arr = [1,2,3,4]
arr.sort((a,b) => {
    return b - a
})
console.log(arr) // [4,3,2,1]
```
### fill
作用：给数组填充输入的值(**改变原数组**)  
参数：(value)  
返回值: 填充后的数组，还是指向原数组
``` js
let arr = [1,2,3,4]
let res = arr.fill(5)
console.log(arr) // [5,5,5,5]
console.log(res) // [5,5,5,5]
```
### map
作用：返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值(**不改变原数组**)  
参数：(fn, index, self)  
返回值: 计算后的新数组 不影响原来的数组**map() 不会对空数组进行检测**
``` js
let arr = [1,2,3,4]
let res = arr.map(item => {
    return item *item
})
console.log(arr, res) // [1, 2, 3, 4]  [1, 4, 9, 16]
// 创建多个模拟数据 不会对空数组进行检测 需要先fill在map
let mockArr = new Array(10).fill(0).map((item, index) => {
    return `test-${index}`
})
```
### filter
作用：按条件过滤返回新数组(**不改变原数组**)  
参数： (fn) 判断条件函数  
返回值: 返回符合条件的新数组
``` js
let arr = [1, 2, 3, 4];
let res = arr.filter(item => {return item > 2})
console.log(arr, res) // [1, 2, 3, 4]  [3, 4]
```
### reduce
作用：接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。对空数组是不会执行回调函数的 
参数： (fn, initialValue)
- prev:初始值, 或者计算结束后的返回值
- currentValue:当前元素
- currentIndex:当前元素的索引
- arr:当前元素所属的数组对象
``` js
let arr = [1, 2, 3, 4]
let res = arr.reduce(function(prev, cur, index, arr) {
    return prev + cur;
})
console.log(arr, res); // [1, 2, 3, 4] 10
```
### forEach
作用：遍历数组  
参数： (fn, index, self)  
返回值: 返回undefined
```
let arr = [1,2,3,4]
let res = arr.forEach((item, index, self) => {
    console.log(item)
})
console.log(res) // undefined
```
### some
作用：检测数组中是否有元素满足条件(**有一个满足条件就返回true**)  
参数： (fn) 判断条件函数  
返回值: Boolean 满足条件true否则false
``` js
let arr = [1, 2, 3, 4];
let res = arr.some(item => item > 0)
console.log(res) // true
```
### every
作用：检测数组中是否全部元素满足条件(**全部元素满足条件就返回true**)  
参数： (fn) 判断条件函数  
返回值: Boolean 满足条件true否则false
``` js
let arr = [1, 2, 3, 4];
let res1 = arr.every(item =>  item > 0)
let res2 = arr.every(item =>  item > 2)
console.log(res1, res2) //true false
```
### Array.isArray
作用：判断变量是否为数组  
参数： 判断的变量  
返回值: Boolean 满足条件true否则false
``` js
let res1 = Array.isArray([])
let res2 =  Array.isArray({})
console.log(res1, res2) // true false
```
## 数组去重
### 去重
- 利用数组的 indexOf 下标属性来查询
``` js
function unique(arr) {
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
console.log(unique([1, 1, 2, 3, 5, 3, 1, 5, 6, 7, 4]))
```
- 利用 ES6 的 set 方法
``` js
[...new Set(arr)]
```
### 根据属性去重
``` js
const unique = (arr) => {
        const res = new Map();
        return arr.filter(
          (item) => !res.has(item.productName) && res.set(item.productName, 1)
        );
      };
```
- 方法2
``` js
function unique(arr) {
  let result = []
  let obj = {}
  for (var i = 0; i < arr.length; i++) {
    if (!obj[arr[i].key]) {
      result.push(arr[i])
      obj[arr[i].key] = true
    }
  }
}
```
## 交集/并集/差集
``` js
let a = [1, 2, 3]
let b = [2, 4, 5]

// 并集
let union = a.concat(b.filter((v) => !a.includes(v)))
// [1,2,3,4,5]

// 交集
let intersection = a.filter((v) => b.includes(v))
// [2]

// 差集
let difference = a.concat(b).filter((v) => !a.includes(v) || !b.includes(v))
// [1,3,4,5]
```
## 如何中断forEach
其实forEach的设计，就是不可中断的，但是有面试官会问，常见的答案是以下2种。
1. 捕获异常 try-catch
2. 使用every代替
两种方法都不好，try-catch写起来相对来说有破坏代码的感觉， 而使用every则违背了题目的意思，并没有从本质上解决forEach，只是换了方法。  
**如果工作上有需要中断遍历的时候，还是尽量使用for循环，配合break**
``` js
let arr = [1,2,3,4,5,6,7]
try{
    arr.forEach(item => {
        if(item ===2) {
            trow new Error('中断')
        }
        console.log(item)
    })
}catch(e) {
    console.log('捕获异常',e)
}
```
## 数组降维度
``` js
let arr = [ [1], [2], [3] ];
arr = Array.prototype.concat.apply([], arr);
console.log(arr);// [1, 2, 3]

let array = [ [1], [2], [3] ];
array = array.flat(2);
console.log(array); // [1, 2, 3]

//多维数组
let arrMore = [1, 2, [3], [[4]]];
arrMore = arrMore.flat(Infinity);
console.log(arrMore); // [1,2,3,4]
```
## 将数组中指定的某个元素移到第一位
``` js
let arr=[1,2,3,4]
let arr1=[{name:'大幂幂'},{name:'小哥哥'}]

const moveFirst=(v,arr)=>{
     arr.unshift(...arr.splice(arr.findIndex(i=>{
        if(Object.prototype.toString.call(i) === '[object Object]'){
            return i.name==v
        }else{
            return i==v
        }
    }),1))
    return arr
}

console.log(moveFirst('小哥哥',arr1)); //[ { name: '小哥哥' }, { name: '大幂幂' } ] 
console.log(moveFirst(2,arr)); //[ 2, 1, 3, 4 ]
```
