---
title: export和export Default区别
date: 2018-06-28 10:09:45
categories:
- ES6
tags:
- ES6
---
>export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
```JavaScript
//export :基本用法是放置在一个"声明"之前，或一组由{}语法（注意，此处的{}语法与对象无关）
var a = 1, b = 2;
function square(x) {
    return x * x;
}
export { a, b, square}
//等同于
export var a = 1;
export var b = 2;
export function square(x) {
    return x * x;
}
//假设文件名为test.js，你需要导入上面得变量或方法
import {a,b,square}//{}不能少~~
//当两个js文件中有相同命名得方法时 引入会造成混乱
import {test} from './a.js'
import {test} from './b.js'	
//正确使用姿势
import {test as aTest} from './a.js'
import {test as bTest} from './b.js'
//使用方法 aTest();bTest();
//当js文件里方法过多得时候，导出就会显得有点繁杂，解决方法 通过命名空间
import * as aFun from './a.js'//两个文件中可能还有其他同名function
import * as bFun from './b.js'
aFun.test() ;
bFun.test();
```
```JavaScript
//export default:每个模块定义只能有一个default，它是唯一的，每个被导出的模块只包含一个default元素，
//所以export default命令在模块内只被允许使用一次。(默认输出就不需要name了，但是一个js文件中只能有一个export default。)
//------ myFunc.js ------
export default function () { ... };

//------ main1.js ------
import myFunc from 'myFunc';//import命令后面，不使用大括号。
myFunc();
//export default输出多个方法
export default {
  a() {
    return 'a'
  },
  b() {
    return 'b'
  },
  c() {
    return 'c'
  }
}
```
>编写的模块中，有一个function是常用的，我们想默认导出，可export default已经使用了，而我们知道export default在一个模块中只能使用一次。这时就要使用Object.assign
```JavaScript
import * as myFunc from './ambidextrous-cow.js' 

export default Object.assign(speak, myFunc) //Object.assign只能用于function

export function speak () {
  console.log('Hello World')
}

//对应得引入：
import defaultFunc from './ambidextrous-cow'
import * as otherFunc from './ambidextrous-cow'

defaultFunc () // Hello World
defaultFunc .speak() // Hello World
otherFunc.speak() // Hello World
```