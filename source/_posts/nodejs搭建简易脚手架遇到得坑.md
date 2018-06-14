---
title: nodejs搭建简易脚手架遇到得坑
date: 2018-06-14 13:37:32
categories:
- node
tags:
- node
---
##### 第三方库
*   [commander.js](https://link.juejin.im/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%253A%2F%2Fgithub.com%2Ftj%2Fcommander.js)，可以自动的解析命令和参数，用于处理用户输入的命令。
*   [download-git-repo](https://link.juejin.im/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%253A%2F%2Fgithub.com%2Fflipxfx%2Fdownload-git-repo)，下载并提取 git 仓库，用于下载项目模板。
*   [Inquirer.js](https://link.juejin.im/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%253A%2F%2Fgithub.com%2FSBoudrias%2FInquirer.js)，通用的命令行用户界面集合，用于和用户进行交互。
*   [handlebars.js](https://link.juejin.im/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%253A%2F%2Fgithub.com%2Fwycats%2Fhandlebars.js)，模板引擎，将用户提交的信息动态填充到文件中。
*   [ora](https://link.juejin.im/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%253A%2F%2Fgithub.com%2Fsindresorhus%2Fora)，下载过程久的话，可以用于显示下载中的动画效果。
*   [chalk](https://link.juejin.im/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%253A%2F%2Fgithub.com%2Fchalk%2Fchalk)，可以给终端的字体加上颜色。
*   [log-symbols](https://link.juejin.im/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%253A%2F%2Fgithub.com%2Fsindresorhus%2Flog-symbols)，可以在终端上显示出 √ 或 × 等的图标。

##### 首先自己搭好一个demo传到github(或者gitLab都可以)
修改demo得package.json(handlebars语法):
```JavaScript
{
  "name": "{{name}}",
  "version": "1.0.0",
  "description": "{{description}}",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "{{author}}",
  "license": "ISC"
}
```
##### 再建一个新的空项目：
`npm install commander download-git-repo inquirer handlebars ora chalk log-symbols -S`
在package.json加入字段：
```JavaScript
"bin": {
    "shadownc": "./index.js"//执行文件路径
  },
```
##### index.js:
```JavaScript
//在顶部添加这句:
#!/usr/bin/env node  --这种用法是为了防止操作系统用户没有将node装在默认的/usr/bin路径里。当系统看到这一行的时候，
首先会到env设置里查找node的安装路径，再调用对应路径下的解释器程序完成操作。
//download-git-repo踩坑(路径错误导致下载模板失败--git clone status 128)
//从github上下载所需得template 下载地址不是你复制得https://github.com/xxx/xxx.git
//正确写法：
download('github:Shadownc/express-tpl#master', name, {clone: true}, (err) => {
    console.log(err ? 'Fail' : 'Success')
})
//还有一种简写：
Shadownc/express-tpl#master
//#master为模板所在的分支
```
欢迎加群讨论：163958730