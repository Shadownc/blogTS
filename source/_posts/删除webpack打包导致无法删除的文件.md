---
title: 删除webpack打包导致无法删除的文件
date: 2019-05-09 14:46:49
categories:
- JavaScript
tags:
- JavaScript
---
删除webpack打包导致无法删除的文件
<!-- more -->
##### 展示下删除提示:
![](/images/can'tDel.png '错误截图')
##### 解决方法：
```JavaScript
cmd 打开命令提示符
输入： rd /q/s E:\webpack.\
PS:(最后面的 ".\" 不可以没有~)
E:\webpack--是需要删除的目录路径
温馨提示：千万千万千万不要在桌面运行命令提示符去删除！！！不然删错了东西怕是要哭咯~
```
>用法：rd[盘符:][路径][子目录名][/s][/q][/?]或rmdir[盘符:][路径][子目录名][/s][/q][/?]
参数说明如下：
/s 删除指定目录和所有子目录及其包含的所有文件
/q 安静模式。删除目录时，不会提示确认信息