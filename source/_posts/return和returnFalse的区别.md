---
title: return和return false的区别
date: 2018-05-16 14:56:34
categories:
- JavaScript
tags:
- JavaScript
---
##### return和return false的区别
一、返回控制与函数结果，

语法为：return 表达式;
语句结束函数执行，返回调用函数，而且把表达式的值作为函数的结果

 二、返回控制，

无函数结果，语法为：return;

在大多数情况下,为事件处理函数返回false,可以防止默认的事件行为.例如,默认情况下点击一个a标签,页面会跳转到该元素href属性指定的页.   

 Return False 就相当于终止符，Return True 就相当于执行符。   

 在js中return false的作用一般是用来取消默认动作的。比如你单击一个链接除了触发你的   

 onclick时间（如果你指定的话）以外还要触发一个默认事件就是执行页面的跳转。所以如果   

 你想取消对象的默认动作就可以return false。
首先在js中，我们常用return false来阻止提交表单或者继续执行下面的代码，通俗的来说就是阻止执行默认的行为。
```JavaScript
function a(){

   if(True)
       return false;
},//这是没有任何问题的。
```

如果我改成这种

```JavaScript
function a(){
    return false
}
function b(){
    console.log(11);
    return true
}
function c(){
    console.log(22);
    return true
}
function test() {
    if(!a()){
        console.log(33);
        return
    }
    b();
    c();
  }
  test();//结果只打印33 在if里面加return和return false效果是一样得
```
即使a函数返回return false 阻止提交了，但是不影响 b()以及 c()函数的执行。在Test()函数里调用a()函数，那面里面

return false 对于Test()函数来说，只是相当于返回值。而不能阻止Test()函数执行。

总之：return false 只在当前函数有效，不会影响其他外部函数的执行。

 

三：总结

retrun true； 返回正确的处理结果。

return false；分会错误的处理结果，终止处理。

return；把控制权返回给页面。

