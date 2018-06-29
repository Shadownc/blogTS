---
title: git操作遇到的问题
date: 2018-05-08 18:46:34
categories:
- git
tags:
- git
---
##### 比如代码提交的时候 文件内容什么的都没有发生改变，但是改变了其中一个文件夹的名字（只是大小写的变化，如 icon 改成 Icon） 你再去提交的时候会发现提示：在上次提交后没有添加或更改过文件
`解决办法：git config core.ignorecase false //设置大小写敏感`
`恢复设置:git config core.ignorecase true`
##### 创建.gitignore文件--git bash执行
`touch .gitignore`