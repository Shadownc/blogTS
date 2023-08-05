---
title: hexo新建友链页面且自定义
date: 2023-08-05 19:25:24
categories:
- hexo
tags:
- hexo
---
hexo(3.2.0)新建友链页面且自定义
<!-- more -->
## 新建`links`页面
``` shell
hexo new page links 
```
这样会在`/source/`下创建`links/index.md`
``` md
---
title: 友情链接
date: 2023-08-05 16:32:54
type: links
---
<style>
    .links-content {
        margin-top: 1rem;
    }

    .link-navigation::after {
        content: " ";
        display: block;
        clear: both;
    }

    .card {
        width: 45%;
        font-size: 1rem;
        padding: 10px 20px;
        border-radius: 4px;
        transition-duration: 0.15s;
        margin-bottom: 1rem;
        display: flex;
    }

    .card:nth-child(odd) {
        float: left;
    }

    .card:nth-child(even) {
        float: right;
    }

    .card:hover {
        transform: scale(1.1);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    }

    .card a {
        border: none;
    }

    .card .ava {
        width: 3rem !important;
        height: 3rem !important;
        margin: 0 !important;
        margin-right: 1em !important;
        border-radius: 4px;
    }

    .card .card-header {
        font-style: italic;
        overflow: hidden;
        width: 100%;
    }

    .card .card-header a {
        font-style: normal;
        color: #000;
        font-weight: bold;
        text-decoration: none;
    }

    .card .card-header a:hover {
        color: #d480aa;
        text-decoration: none;
    }

    .card .card-header .info {
        font-style: normal;
        color: #a3a3a3;
        font-size: 14px;
        min-width: 0;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
<div class="post-body">
    <div id="links">
        <div class="links-content"><div class="link-navigation"></div>
        </div>
    </div>
</div>

-----
-----

{% note success %}

## 友链格式

- 网站名称：IMyself
- 网站地址：[https://shadownc.github.io/](https://shadownc.github.io/)
- 网站描述：description
- 网站 Logo/头像：[https://shadownc.github.io/assets/images/logo.jpg](https://shadownc.github.io/assets/images/logo.jpg)
- 老站留言未开通,可去[新站](https://blog.lmyself.top/)留言新增友链
{% endnote %}

```
## 在主题目录文件夹下的`_config.yml`中添加目录
``` yml
menu:
  home: / || home
  #about: /about/ || user
  tags: /tags/ || tags
  categories: /categories/ || th
  archives: /archives/ || archive
  #schedule: /schedule/ || calendar
  #sitemap: /sitemap.xml || sitemap
  #commonweal: /404/ || heartbeat
+  links: /links || link
```
## 修改主题目录文件夹下的`/languages/zh-Hans.yml`
``` yml
menu:
  home: 首页
  archives: 归档
  categories: 分类
  tags: 标签
  about: 关于
  search: 搜索
  schedule: 日程表
  sitemap: 站点地图
  commonweal: 公益404
+  links: 友链
```
## 添加友链的`json`文件
在页面目录`/source/links/`中添加`linklist.json`，示例：
``` json
[
    {
        "nickname": "IMyself",
        "avatar": "https://shadownc.github.io/assets/images/logo.jpg",
        "site": "https://blog.lmyself.top"
    }
]
```
## 加载`link.js`
在`_layout.swig`中添加:
``` html
<body>
  ...
  {# 友链设置 #}
  {% if page.type === 'links' %}
    <script type="text/javascript" src="{{ url_for(theme.js) }}/src/link.js?v={{ theme.version }}"></script>
  {% else %}
  {% endif %}

</body>
```
`link.js`内容:
``` js
link = {
    init: function () {
        var that = this
        //这里设置的是刚才的 linklist.json 文件路径
        $.getJSON('/links/linklist.json', function (data) {
            that.render(data)
        })
    },
    render: function (data) {
        var html,
            nickname,
            avatar,
            site,
            li = ''
        for (var i = 0; i < data.length; i++) {
            nickname = data[i].nickname
            avatar = data[i].avatar
            site = data[i].site
            description = data[i].description || ''
            li += '<div class="card">' +
                '<img class="ava" src="' + avatar + '" />' +
                '<div class="card-header"><div>' +
                ' <a href="' + site + '" target="_blank">' + nickname + '</a></div>' +
                '<div class="info">'+description+'</div></div></div>'
        }
        $('.link-navigation').append(li)
    },
}
link.init()
```
`link.js`存放在主题所在文件夹中的`/source/js/src/`