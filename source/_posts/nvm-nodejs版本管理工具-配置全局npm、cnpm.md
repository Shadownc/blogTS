---
title: nvm(nodejs版本管理工具)配置全局npm、cnpm
date: 2023-08-04 21:20:31
categories:
- node
tags:
- node
---
nvm(nodejs版本管理工具)配置全局npm、cnpm
<!-- more -->
## 安装nvm(**注意：在下载nvm之前需要卸载本电脑已经安装的node!**)
1 .我们选择[nvm-windows](https://github.com/coreybutler/nvm-windows)进行安装，可选择releases下最新版本的[nvm-setup.exe](https://github.com/coreybutler/nvm-windows/releases/download/1.1.11/nvm-setup.exe)下载安装。  
2. 在安装根目录下新建`nodejs`文件夹(此文章安装根目录路径为：`D:\nvm`)  
3. 配置环境变量,新增:
``` shell
NVM_HOME  D:\nvm
NVM_SYMLINK D:\nvm\nodejs
```
4. 选择`Path`编辑环境变量,新建：
``` shell
%NVM_HOME%
%NVM_SYMLINK%
```
## 安装全局使用的npm、cnpm(切换nodejs版本仍旧可用 无需重新安装)
1. 在安装根目录下新建`npm`文件夹
2. 在`C`盘用户文件夹（`C:\Users[name]`）下会生成一个`.npmrc`的文件，用记事本打开后可以看到如下内容:
``` shell
registry=https://registry.npmjs.org/
//新增新建的npm文件夹路径
prefix=D:\nvm\npm
```
3. 在系统环境变量中的`Path`添加`D:\nvm\npm`这样就可以全局安装`npm`包命令
4. 全局安装npm、cnpm
``` shell
npm install npm -g
npm install cnpm -g
```
> 注意nodejs版本太高可能引起`cnpm`的报错,安装指定版本的cnpm命令
``` shell
npm install cnpm@7.1.0 -g
```
[node版本与npm版本对应的关系查询网址](https://nodejs.org/zh-cn/download/releases)
## nvm常用命令
* nvm list [available]： 列出已经安装的node.js版本。可选的available，显示可下载版本的部分列表。这个命令可以简写为nvm ls [available]。
* nvm install <version> [arch]： 该可以是node.js版本或最新稳定版本latest。（可选[arch]）指定安装32位或64位版本（默认为系统arch）。设置[arch]为all以安装32和64位版本。在命令后面添加--insecure ，可以绕过远端下载服务器的SSL验证。
* nvm uninstall <version>： 卸载指定版本的nodejs。
* nvm use [version] [arch]： 切换到使用指定的nodejs版本。可以指定32/64位[arch]。nvm use <arch>将继续使用所选版本，但根据提供的值切换到32/64位模式的<arch>
* nvm version： 显示当前运行的nvm版本，可以简写为nvm v
``` shell
nvm list　　//查看目前已经安装的版本
nvm list available //显示可下载版本的部分列表
nvm install 10.15.0 //安装指定的版本的nodejs
nvm use 10.15.0 //使用指定版本的nodejs
```