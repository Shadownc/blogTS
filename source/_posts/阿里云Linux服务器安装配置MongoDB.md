---
title: 阿里云Linux服务器安装配置MongoDB
date: 2021-08-27 17:10:20
categories:
- node
tags:
- node
---
阿里云Linux服务器安装配置MongoDB
<!-- more -->
## 一、下载并安装MongoDB
1. **首先下载 [MongoDB](https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-4.0.11.tgz) 并上传至服务器**
2. **下载完成后解压文件**  
```
tar -zxvf mongodb-linux-x86_64-4.0.11.tgz
```
3. **移动到安装目录**
```
mv mongodb-linux-x86_64-4.0.11 /usr/local/mongodb
```
4. **进入mongdb目录在此目录下创建data/db 和data/logs文件夹**
```
cd mongodb && mkdir -p data/db && mkdir -p data/logs
```
    >需要注意的一点，创建了logs文件夹 还需要创建一个文件
    ```
    cd /usr/local/mongodb/data/logs 
    touch mongodb.log
    ```
## 二、配置MongoDB
1. **进入bin目录创建一个新的配置文件mongod.conf，并配置相应内容**
``` shell
cd bin && touch mongod.conf && vim mongod.conf
```
    配置文件内容
    ``` shell
    #数据库路径
    dbpath=/usr/mongodb/data
    #日志输出文件路径
    logpath=/usr/mongodb/logs/mongod.log
    #错误日志采用追加模式
    logappend=true
    #启用日志文件，默认启用
    journal=true
    #这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false
    quiet=true
    #端口号 默认为27017
    port=27017
    #允许远程访问
    bind_ip=0.0.0.0
    #开启子进程
    fork=true
    #开启认证，必选先添加用户
    #auth=true
    ```
2. 配置环境变量并应用
``` shell
vim /etc/profile
```
    >在最后一行添加  
    >`export PATH=$PATH:/usr/local/mongodb/bin`
    保存后执行命令
    ``` shell
    source /etc/profile
    ```
3. **启动时带上配置文件**
``` shell
./mongod -f ./mongod.conf
```
    **最重要的就是别忘记创建log日志文件**
    
## 开启认证，创建用户
``` shell
1.进入mongodb的shell：mongo
> use admin
> db.createUser(  
      { 
        user: "admin"
        pwd: "admin",  
        roles: [ { role: "root", db: "admin" } ]  
      }  
    )  
```
**关闭数据库**
``` shell
db.shutdownServer()
```
**重启MongoDB**
``` shell
/mongod -f ./mongod.conf
```
## mongoose
``` js
mongodb://user:pwd@localhost:27017/dbName
```