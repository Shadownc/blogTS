---
title: Vue中引入css使用@import无法识别~(alias--别名)踩坑
date: 2019-12-10 16:21:23
categories:
- Vue
tags:
- Vue
---
Vue中引入css使用@import无法识别~(alias--别名)踩坑
<!-- more -->
```JavaScript
//引入css文件
<style>
  @import '~css/fost-base.css';
</style>
使用~引入的时候 发现无法通过编译
原因是postcss-import官方文档中说明对模块的导入不需要加波浪号（~）
解决方法：
注释掉.postcssrc.js文件下的 "postcss-import": {}, 
```
##### .postcssrc.js配置文件：
```JavaScript
module.exports = {
  "plugins": {
    "postcss-import": {},      //用于@import导入css文件
    "postcss-url": {},           //路径引入css文件或node_modules文件
    "postcss-aspect-ratio-mini": {},   //用来处理元素容器宽高比
    "postcss-write-svg": { utf8: false },    //用来处理移动端1px的解决方案。该插件主要使用的是border-image和background来做1px的相关处理。
    "postcss-cssnext": {},  //该插件可以让我们使用CSS未来的特性，其会对这些特性做相关的兼容性处理。
    "postcss-px-to-viewport": {    //把px单位转换为vw、vh、vmin或者vmax这样的视窗单位，也是vw适配方案的核心插件之一。
    	viewportWidth: 750,    //视窗的宽度
    	viewportHeight: 1334,   //视窗的高度
    	unitPrecision: 3,    //将px转化为视窗单位值的小数位数
    	viewportUnit: 'vw',    //指定要转换成的视窗单位值
    	selectorBlackList: ['.ignore', '.hairlines'],    //指定不转换视窗单位值得类，可以自定义，可以无限添加
    	minPixelValue: 1,    //小于等于1px不转换为视窗单位
    	mediaQuery: false   //允许在媒体查询中使用px
    },
    "postcss-viewport-units":{}, //给vw、vh、vmin和vmax做适配的操作,这是实现vw布局必不可少的一个插件
    "cssnano": {    //主要用来压缩和清理CSS代码。在Webpack中，cssnano和css-loader捆绑在一起，所以不需要自己加载它。
    	preset: "advanced",   //重复调用
    	autoprefixer: false,    //cssnext和cssnano都具有autoprefixer,事实上只需要一个，所以把默认的autoprefixer删除掉，然后把cssnano中的autoprefixer设置为false。
    	"postcss-zindex": false   //只要启用了这个插件，z-index的值就会重置为1
 	}
  }
}
```
[参考链接](https://juejin.im/post/5bf5135251882516d725d1cc)

##### 第二种解决方法：
```JavaScript
module.exports = {
    "plugins": {
        "postcss-import": {
            resolve(id) {
                if (id.charAt(0) == '~') {
                    return id.substr(1)
                } else {
                    return id
                }
            }
        },
        "postcss-url": {},
        "autoprefixer": {}
    }
}
```