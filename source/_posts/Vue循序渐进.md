---
title: '''Vue循序渐进'''
date: 2018-01-08 15:22:23
categories:
- Vue
tags:
- Vue
---
#### 先来一个项目中会遇到的问题吧
`let url='http://www.xx.com?a=1&b=true'`
##### 在vue-router中 获取路由中的query做判断你也许会这么写。。
```
mounted(){
        if(this.$route.query.b){
          ...
        }
      }
```

>这里的**`this.$route.query.b`**当然是Boolean值。。如果你这么以为。。那么恭喜你入坑了，但是当你刷新页面的时候 你会发现事实并非如此，代码并没与进入到`if`中去..
##### 如果你的操作是要在某个参数为true的情况下才继续往下执行。。那么你可以这么写。。
```
mounted(){
        if((typeof this.$route.query.b!='string' &&this.$route.query.b) || (this.$route.query.b &&this.$route.query.b=='true' )){
          ...
        }
      }
```

##### 算是一个小坑吧。。暂时没有去找过其他的解决办法。。有其他解决办法的加群一起讨论呗~群号：163958730
![image.jpeg](http://upload-images.jianshu.io/upload_images/5597175-8a1fa71f2569312f.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 之前有个笔误。。。
`this.$route.query是一个object 需要取到里面的属性判断。。必须是query.xx。如果没有传参，则query是个空对象`