---
title: Docker部署--DaoCloud
date: 2018-08-03 12:34:32
categories:
- node
tags:
- node
---
Docker基于DaoCloud持续集成自动化部署nodejs后端api教程
<!-- more -->
##### linux安装docker
`curl https://releases.rancher.com/install-docker/17.12.sh | sh`
##### DockerFile
```JavaScript
# 基础镜像为node，版本为v8.9.3
FROM node:8.9.3
# 镜像作者，可以附加联系信息
MAINTAINER shadow

# 创建容器内的项目存放目录
RUN mkdir -p /srv/api
#切换工作目录
WORKDIR /srv/api

#  将Dockerfile当前目录下所有文件拷贝至容器内项目目录并安装项目依赖
COPY package.json /srv/api
RUN npm install
COPY . /srv/api

# 容器对外暴露的端口号，要和node项目配置的端口号一致
EXPOSE 3000

# 容器启动时执行的命令
ENTRYPOINT ["node","index.js"]
```
##### nodejs MongoDB连接问题
```JavaScript
//首选，从docker hub仓库拉取一个镜像
docker pull mongo
//启动容器
docker run --name=mongoDev  -p 27017:27017 -v $PWD/usr/local/mongodb/data/db:/data/db -d 63c6b736e399
--最后需要修改nodejs项目中的连接MongoDB的链接(服务器ip:27017)
#docker run -d -p 27017:27017 --name mongoDev  --link dao_share-api_1:mongoDev 63c6b736e399
#--link后面的dao_share-api_1:mongoDev是指将dao_share-api_1容器连接到此容器
 命令说明： 
-d后面的一串数字:docker images 查看Image ID
–name：容器的名称 
-p: 端口映射，将容器的端口，映射到主机上 
-v：映射，挂载，将主机中目录下的/usr/local/mongodb/data/db挂载到容器的/data/db，作为mongo数据存储目录
$PWD：当前文件目录，例如我们以root进入，$PWD就表示root的目录。 
-d：后台运行 
其他命令： 
-e 设置环境变量，与在dockerfile env设置相同效果
```
##### docker命令
```JavaScript
docker ps --查看新启动的容器是否正常启动。
docker ps -a --显示所有的容器，包括未运行的。
docker rm [NAMES] --删除容器。
docker start/restart [NAMES] --启动或重新启动已存在的容器。
```
