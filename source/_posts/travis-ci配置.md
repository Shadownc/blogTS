---
title: travis-ci配置
date: 2018-07-18 15:52:53
categories:
- git
tags:
- git
---
##### .travis.yml--贴一下配置文件
```JavaScript
language: node_js
node_js: stable

# 指定缓存模块，可选。缓存可加快编译速度。
cache:
  directories:
    - node_modules

    
#安装hexo及插件
install:
  - npm install  

#清除 生成
script:
  - hexo clean  
  - hexo g

after_script:
  - cd ./public
  - git init
  - git config user.name "username"
  - git config user.email "useremail"
  - git add .
  - git commit -m "update"
  - git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:master
  #- git push --force --quiet "https://${GH_TOKEN}@${你得项目地址(如果源码跟发布的不在一个分支 这里是分发布用的分支地址)，不带https}" master:master

#默认一个分支可以忽略此配置--监视github仓库中的master分支，分支出现变化就执行build
#branches:
#  only:
#    - blogTS

#build以后的地址
env:
 global:
   - GH_REF: (分发布用的分支地址)  //讲道理 这个地方我还不太清楚有什么用 有知道的可以告诉我下
```
##### 步骤：
创建 Personal access tokens
Personal access tokens 类似传统的 OAuth access tokens，可以无需通过账号密码的方式操作仓库。

在 `Settings` -> `Developer settings` -> `Personal access tokens` 中可以生成一个新的 token。

权限控制只需要勾选 repo 就可以了，生成的 token 只会显示一次。

##### 配置 Travis CI
注册部分就不再赘述了，完成后需要在 account 中对指定仓库开启服务。在对应仓库的 Settings 中开启 `Build only if .travis.yml is present`。你还可以开启 `Limit concurrent jobs` 限制并发任务。为了使配置文件更具通用性，我们需要在` Environment Variables` 中添加几个要用到的环境变量：
```JavaScript
GH_TOKEN（生成的 Personal access tokens）
GIT_NAME（部署时的提交者名称）
GIT_EMAIL（部署时的提交者邮箱）
CUSTOM_DOMAIN（自定义域名）
CUSTOM_PATH（自定义输出目录）
```
因为 Travis CI 的日志是公开的，所以要注意不要对敏感的内容开启 `Display value in build log`，比如你的 `GH_TOKEN`，否则其它看到日志的人就可以操作你的仓库了。
