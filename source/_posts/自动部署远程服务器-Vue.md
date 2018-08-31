---
title: 自动部署远程服务器(Vue)
date: 2018-08-04 13:29:59
categories:
- Vue
tags:
- Vue
---
Travis自动部署vue打包后的文件到远程服务器
<!-- more -->
##### 生成密钥对
`ssh-keygen`
输入上面的指令以后一路回车即可，你会发现在用户根目录下多了.ssh目录，进去看一下`cd ~/.ssh`，里面有3个文件
##### 新建config文件
```javascript
Host test
HostName 182.61.20.24 
#登陆的用户名
User root
IdentitiesOnly yes
#登陆使用的密钥
IdentityFile ~/.ssh/id_rsa
```
设置.ssh目录为700:`chmod 700 ~/.ssh/`
设置.ssh目录下的文件为600:`chmod 600 ~/.ssh/*`
##### 将生成的公钥添加为受信列表（重点）
```javascript
cat id_rsa.pub >> authorized_keys
cat authorized_keys --查看
# authorized_keys文件内容类似这样
ssh-rsa  *************centos
```
##### 服务器安装Travis
```javascript
#ravis的客户端工具需要用gem来安装，gem是ruby的管理工具，所以首先安装ruby
apt install ruby
# 安装travis命令行工具，如无法使用gem指令须先安装ruby
gem install travis
# --auto自动登录github帐号
travis login --auto
# 此处的--add参数表示自动添加脚本到.travis.yml文件中 必须在项目的根目录执行
travis encrypt-file ~/.ssh/id_rsa --add
# 这个命令会自动把 id_rsa 加密传送到 .git 指定的仓库对应的 travis 中去
注意：
gem install travis 报错can't find header files for ruby at /usr/lib/ruby/include/ruby.h
解决办法：
#更换gem的source
$ gem sources --add https://ruby.taobao.org/ --remove https://rubygems.org/
$ gem sources -l
*** CURRENT SOURCES ***

https://ruby.taobao.org
# 请确保只有 ruby.taobao.org
#安装ruby-dev
apt-get install ruby-dev
```
#### 上面的并没有成功 具体Travis网页端并没有生成环境变量--有知道得小伙伴可以加群告诉我下：163958730
##### 另一种方法--rsync
启动方式：
`rsync --daemon`
创建rsync的主配置文件“/etc/rsyncd.conf”，需要手工来创建，创建该文件并插入如下内容：
```javascript
# /etc/rsyncd: configuration file for rsync daemon mode

# See rsyncd.conf man page for more options.

# configuration example:
uid = root
gid = root
use chroot = no
max connections =4
pid file = /var/run/rsyncd.pid
log file = /var/log/rsyncd.log
lock file = /var/run/rsyncd.lock

#设置模块
[view] 
path = /srv/view
read only = no
auth users = root
secrets file = /etc/rsyncd.passwd
list = no
```
1）uid、gid：当使用非root账号时，那么一定要确保服务的的文件夹是否有该非root账号写入的权限
 
2）use chroot = no ：是否可以切换到root目录，当chroot为yes的时候，客户端连接模块的时候，先chroot到模块参数指定的目录下，必须使用root权限，端口号必须是1024以内，且不能备份path路径外的链接文件
 
3）max connections = 2 ：表示同时最大的连接数，也就是同时只能有两个客户端对自己进行连接并且此选项必须与lock file = /var/run/rsyncd.lock 共同使用，若不指定，默认为/var/run/rsyncd.lock
 
4）path = /captain/shell：表示的是当客户端把数据同步过来将保存的路径
 
5）read only = no ：如果为只读，那么将不能进行写同步，所以必须关闭auth users = rsync ：用来进行同步的用户，不需要系统用户中有，虚拟的就行
 
7）secrets file = /etc/rsyncd.secrets ：表示的是账号密码文件，此文件可随意指定，文件里必须以username：password的格式 
`root:123456`
此文件权限必须为600，否则会报错
```javascript
#执行命令：
echo "root:123456" > /etc/rsyncd.passwd
chmod 600 /etc/rsyncd.passwd
```
8）list = no ：表示的是当服务端拒绝客户端的请求时，是否是直接显示权限拒绝，还是现实模块不存在，一般与hosts allow 和hosts deny一起使用
 
当一个被服务端拒绝的请求进来时，如果设置为 list = no，那么直接返回模块不存在,如果不设置，那么是什么错就返回什么错

##### Travis配置文件
```javascript
#指定node版本
language: node_js
node_js:
- '8'   

#指定只有检测到master分支有变动时才执行任务
branchs:
  only:
  - master  

# 指定缓存模块，可选。缓存可加快编译速度。
cache:
  directories:
    - node_modules

install:
- echo  $RSYNCPWD > rsyncd.passwd 
- chmod 600 rsyncd.passwd
- npm install
script:
- npm run build

after_success:
- rsync --delete --password-file=./rsyncd.passwd -r ./dist ${SERVER_NAME}@${SERVER_IP}::view

#$RSYNCPWD 跟你在服务器端的密码保持一致(不需要带userName)
#${SERVER_NAME} travisWeb端配置的环境变量(userName)
#${SERVER_IP} 服务器IP
#::view 设置的模块
```
