---
title: linux服务器配置(node环境)
date: 2018-07-27 17:17:12
categories:
- node
tags:
- node
---
##### 新建node安装目录，与node项目目录
```JavaScript
sudo mkdir -p /www/dev/node //目录位置可选
下载node二进制文件包：
 sudo wget https://nodejs.org/dist/v8.11.3/node-v8.11.3-linux-x64.tar.xz //这是目前官网稳定版 后期可自己去官网找
解压包命令：
 sudo tar zxvf node-v8.11.3-linux-x64.tar.xz --这里有个坑 这个命令会报错
正确解压命令：
 sudo tar xvf node-v8.11.3-linux-x64.tar.xz
配置node环境变量：
 sudo vim /etc/profile
 //按i插入到最下面
export NODE_HOME=/www/dev/node/node-v8.11.3-linux-x64 //node安装目录
export PATH=$PATH:$NODE_HOME/bin --:冒号是分隔符
编辑完以后按'esc' 输入':wq' 回车保存退出
source /etc/profile --使文件生效
```
##### 安装npm
```JavaScript
curl https://npmjs.org/install.sh | sh
```
##### 安装pm2
```
sudo npm install前置，需要在/usr/bin目录下 设置node 和npm 的软链,注意要写绝对路径:
 sudo ln -s /www/dev/node/node-v8.11.3-linux-x64/bin/node /usr/bin/node
 sudo ln -s /www/dev/node/node-v8.11.3-linux-x64/bin/npm /usr/bin/npm
//执行完这两步才可以npm install
sudo npm install pm2 -g
同时需要配置pm2的软链  ：sudo ln -s /www/dev/node/node-v8.11.3-linux-x64/bin/pm2 /usr/bin/pm2
```
###### 上传并启动项目(已上传忽略)
```JavaScript
sudo npm install //安装项目所需依赖
启动项目: sudo pm2 start index.js// -- node index.js
停止项目: pm2 stop index.js   或全部杀掉 ：pm2 kill
```
##### 安装配置Nginx
```JavaScript
//开始前，请确认gcc g++开发类库是否装好，默认已经安装。
  whereis gcc
//进入安装目录
  cd /usr/local/src
//安装PCRE库
  wget http://zlib.net/zlib-1.2.11.tar.gz
  tar zxvf zlib-1.2.11.tar.gz
  cd zlib-1.2.11
  ./configure
  make
  make install
//安装openssl（某些vps默认没装ssl)
  wget https://www.openssl.org/source/openssl-1.0.1t.tar.gz
  tar -zxvf openssl-1.0.1t.tar.gz
//安装nginx
  wget http://nginx.org/download/nginx-1.1.10.tar.gz
  tar -zxvf nginx-1.1.10.tar.gz
  cd nginx-1.1.10
  ./configure
  make
  make install
--make install可能会报错：make: *** No rule to make target 'install'.  Stop.
解决：
ubuntu下--
  apt-get install openssl
  apt-get install libssl-dev
centos下--
  yum -y install openssl openssl-devel
然后再从./configure开始执行
```
##### 启动nginx
```JavaScript
//查看nginx是否启动:
启动：/usr/local/nginx/sbin/nginx
停止：/usr/local/nginx/sbin/nginx -s stop
 ps aux|grep nginx
//结果:
root     124023  0.0  0.0  28732   540 ?        Ss   16:59   0:00 nginx: master process /usr/local/nginx/sbin/nginx
nobody   124024  0.0  0.2  29132  2536 ?        S    16:59   0:00 nginx: worker process
root     124048  0.0  0.1  14684  1036 pts/0    S+   17:04   0:00 grep --color=auto nginx
//必须有前两个进程 否则启动失败

//修改了配置文件以后重启nginx
/usr/local/nginx/sbin/nginx -s reload --或者进入到nginx安装目录sbin下执行 ./nginx -s reload
//贴一小段配置代码：
server {
        listen       8090;
        server_name  www.shadow.com; #服务器域名

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
           # root   html;
           # index  index.html index.htm;
           proxy_pass http://127.0.0.1:3000;
           proxy_redirect default;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
}
```
##### 安装MongoDB
```JavaScript
//切换到安装目录
 cd /usr/local/soft/  --没有就新建 mkdir soft
//下载：
 curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.6.4.tgz
//解压：
 tar -zxvf mongodb-linux-x86_64-3.6.4.tgz
//移动到/usr/local/mongodb/目录：
 mv mongodb-linux-x86_64-3.6.4 /usr/local/mongodb
//编辑环境变量：
 vim /etc/profile
export MONGODB_HOME=/usr/local/mongodb/
export PATH=$MONGODB_HOME/bin --添加到之前的node前
source /etc/profile --使之生效
//切换到新目录的bin目录下：
 cd /usr/local/mongodb/bin
//新建mongodb.conf文件：--touch mongodb.conf
#端口号
port=27017
#数据目录--没有需要手动创建 mkdir
dbpath=/usr/local/mongodb/data/db
#日志目录--没有需要手动创建 mkdir touch
logpath=/usr/local/mongodb/log/out.log
#设置后台运行
fork=true
#日志输出方式
logappend=true
#开启认证
#auth=true
//启动mongodb:
./mongod -f mongodb.conf
或者：./mongod -config mongodb.conf
```