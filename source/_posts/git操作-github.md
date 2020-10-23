---
title: git操作--github
date: 2018-01-11 11:29:05
categories:
- git
tags:
- git
---
git添加ssh
<!-- more -->
##### github设置项目默认语言类型展示
```javascript
*.js linguist-language=JavaScript
*.css linguist-language=JavaScript
*.html linguist-language=JavaScript
```
*末尾的JavaScript可以更换你要展示得语言*  
###### git添加ssh
* 1.首先需要检查你电脑是否已经有 SSH key    
运行 git Bash 客户端，输入如下代码：
```
$ cd ~/.ssh
$ ls
```
这两个命令就是检查是否已经存在 id_rsa.pub 或 id_dsa.pub 文件，如果文件已经存在，那么你可以跳过步骤2，直接进入步骤3。
* 2.创建一个 SSH key 
```
$ ssh-keygen -t rsa -C "your_email@qq.com"
```
代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。
>输入完毕后程序同时要求输入一个密语字符串(passphrase)，空表示没有密语。接着会让输入2次口令(password)，空表示没有口令。3次回车即可完成当前步骤，此时[c盘>用户>自己的用户名>.ssh]目录下已经生成好了。

<br/>
* 3.添加你的 SSH key 到 github上面去
首先你需要拷贝 id_rsa.pub 文件的内容，你可以用编辑器打开文件复制

**前端小伙伴学习群：163958730**