---
title: js踩坑IE8
date: 2018-04-12 10:55:15
categories:
- JavaScript
tags:
- JavaScript
---
JavaScript在ie8的兼容处理(如forEach、indexOf..)
<!-- more -->
##### 记一次项目中遇到得坑吧。。
1.IE8不兼容forEach--作为一个遍历神器 不能用怎么行  0.0
```JavaScript
//解决办法 在js文件中添加下面的代码：
if ( !Array.prototype.forEach ) {  
  Array.prototype.forEach = function forEach( callback, thisArg ) {  
    var T, k;  
    if ( this == null ) {  
      throw new TypeError( "this is null or not defined" );  
    }  
    var O = Object(this);  
    var len = O.length >>> 0;   
    if ( typeof callback !== "function" ) {  
      throw new TypeError( callback + " is not a function" );  
    }  
    if ( arguments.length > 1 ) {  
      T = thisArg;  
    }  
    k = 0;  
    while( k < len ) {  
      var kValue;  
      if ( k in O ) {  
        kValue = O[ k ];  
        callback.call( T, kValue, k, O );  
      }  
      k++;  
    }  
  };  
}  
//要加在调用forEach之前
```
2.IE8不兼容indexOf
```JavaScript
if (!Array.prototype.indexOf){  
        Array.prototype.indexOf = function(elt /*, from*/){  
        var len = this.length >>> 0;  
        var from = Number(arguments[1]) || 0;  
        from = (from < 0)  
             ? Math.ceil(from)  
             : Math.floor(from);  
        if (from < 0)  
          from += len;  
        for (; from < len; from++)  
        {  
          if (from in this &&  
              this[from] === elt)  
            return from;  
        }  
        return -1;  
      };  
    }  
//同样加在调用indexOf之前
```