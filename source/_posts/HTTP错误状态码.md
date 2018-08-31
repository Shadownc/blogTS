---
title: HTTP错误状态码
date: 2018-03-12 13:11:28
categories:
- JavaScript
tags:
- JavaScript
---
HTTP错误状态码及含义
<!-- more -->
``` JavaScript
1~5开头的HTTP状态码分别是什么含义：
1XX ：此类型的状态码是临时响应，代表着请求已经被接受，但需要继续处理，值得注意的是，由于HTTP/1.0 协议中并没有定义1XX状态码，除非在试验条件下，服务器是禁止向客户端发送1XX响应的。
2XX ：此类型的状态码代表着请求已经被服务器接收、理解、并接受
3XX ：此类状态码代表着客户端需要采取进一步的操作才能完成请求，通常，这些状态码是用来**重定向**的，按照 HTTP/1.0 版规范的建议，浏览器不应自动访问超过5次的重定向。
4XX ：此类型的状态码代表着**客户端可能发生了错误，阻碍了服务器的处理。**
5XX ：此类状态码代表了**服务器在处理请求的过程中有错误或者异常状态发生，也有可能是服务器意识到以当前的软硬件资源无法完成对请求的处理**。

200 —  表示请求成功 一切正常
301 Moved Permanently —  重定向，客户请求的文档在其他地方，新的URL在Location头中给出，浏览器应该自动地访问新的URL
302 Found —  临时重定向，类似于301，但新的URL应该被视为临时性的替代，而不是永久性的。
304 Not Modified —  客户端有缓冲的文档并发出了一个条件性的请求。服务器告诉客户，原来缓冲的文档还可以继续使用。
400 Bad Request —  请求出现语法错误。
403 Forbidden —  资源不可用。
404 Not Found —  无法找到指定位置的资源。
405 Method Not Allowed —  请求方法（GET、POST、HEAD、Delete、PUT、TRACE等）对指定的资源不适用。
500 Internal Server Error — 服务器遇到了意料不到的情况，不能完成客户的请求。
501 Not Implemented — 请求未完成。服务器不支持所请求的功能。
502 Bad Gateway — 请求未完成。服务器从上游服务器收到一个无效的响应。
503 Service Unavailable — 请求未完成。服务器临时过载或当机。
504 Gateway Timeout — 网关超时。
505 HTTP Version Not Supported — 服务器不支持请求中指明的HTTP协议版本。```