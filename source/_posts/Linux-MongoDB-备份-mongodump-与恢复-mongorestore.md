---
title: Linux MongoDB 备份(mongodump)与恢复(mongorestore)
date: 2021-11-01 16:30:40
categories:
- node
tags:
- node
---
Linux服务器 MongoDB 备份(mongodump)与恢复(mongorestore)
<!-- more -->
## 备份
1. 进入到数据库安装目录(默认安装目录)：
``` shell
cd  /usr/local/mongodb/bin
```
2. `mongodump -h 数据库所在pc的ip --port 端口号 -u 用户名 -p 密码 -d 数据库名称 -o 导出路径`
-   **-h：**

    `MongoDB` 所在服务器地址，例如：`127.0.0.1`，当然也可以指定端口号：`127.0.0.1:27017`
-   **-d：**

    需要备份的数据库实例，例如：`test`
-   **-o：**

    备份的数据存放位置，例如：`c:\data\dump`，当然该目录需要提前建立，在备份完成后，系统自动在`dump`目录下建立一个`test`目录，这个目录里面存放该数据库实例的备份数据。
    >碰到的报错:Failed: error connecting to db server: server returned error on SASL authent 
    >在最后加上此句：  
    ``` js
    --authenticationDatabase admin
    ```
## 恢复
``` shell
mongorestore -h <hostname><:port> -d dbname <path>
```
-   **--host <:port>, -h <:port>：**

    `MongoDB`所在服务器地址，默认为： `localhost:27017`
-   **--db , -d ：**

    需要恢复的数据库实例，例如：`test`，当然这个名称也可以和备份时候的不一样，比如`test2`
-   **--drop：**

    恢复的时候，先删除当前数据，然后恢复备份的数据。就是说，恢复后，备份后添加修改的数据都会被删除，**慎用哦！**
-   **`<path>`**

    `mongorestore` 最后的一个参数，设置备份数据所在位置，例如：`c:\data\dump\test`。

    你不能同时指定 `<path>` 和 `--dir` 选项，`--dir`也可以设置备份目录。
-   **--dir：**

    指定备份的目录

    你不能同时指定 `<path>` 和 --dir 选项。
例如：
``` shell
> mongorestore -h 127.0.0.1:27017 -d navigation E:\bak\db_back\navigation
```
## MongoDB(5.0)开始安装默认没有此工具需要自行到官网进行下载安装
[下载链接](https://www.mongodb.com/try/download/database-tools?tck=docs_databasetools)