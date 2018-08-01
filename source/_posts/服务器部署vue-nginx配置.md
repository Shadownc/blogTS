---
title: 服务器部署vue+nginx配置
date: 2018-08-01 15:52:51
categories:
- Vue
tags:
- Vue
---
##### nginx 配置
```JavaScript
//修改nginx.conf配置文件,在http下面添加一行代码:include vhost/*.conf; 表示每个项目单独配置,方便管理.
include shadow/*.conf;
```
##### conf文件夹下面建立shadow文件夹,再在shadow 下面建立vue.conf 放入一下内容:
```JavaScript
server {
  #端口
  listen   80;
  #设置文件存放路径
  root /srv/view/dist/;
  index index.html;

  server_name www.shadow.com;

  location / {
    try_files $uri $uri/ /index.html;
  }

  #接口代理
  location /api {
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:3000;
  }
}
//其他路径配置：
 location /vue/ {
    try_files $uri $uri/ @router;
}
location @router {
   rewrite ^.*$ /vue/index.html last;
 }

```