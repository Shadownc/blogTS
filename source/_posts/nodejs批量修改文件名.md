---
title: nodejs批量修改文件名
date: 2018-03-06 13:44:42
categories:
- node
tags:
- node
---
nodejs批量修改文件名源代码及使用方法
<!-- more -->
##### 先上代码：
```JavaScript
let fs = require('fs'),
    src = 'src',
    dist = 'dist',
    args = process.argv.slice(2),//从数组第二个开始返回
    filename = 'image',
    index = 0;

//执行命令错误提示
if (args.length === 0 || args[0].match('--help')) {
    console.log('--help\n \t-src 文件源\n \t-dist 文件目标\n \t-n 文件名\n \t-i 文件名索引\n');
    return false;
}

args.forEach((item, i) => {
    if (item.match('-src')) {
        src = args[i + 1];//获取源文件文件夹名称
    } else if (item.match('-dist')) {
        dist = args[i + 1];//获取目标文件文件夹名称
    } else if (item.match('-n')) {
        filename = args[i + 1];//文件名
    } else if (item.match('-i')) {
        index = args[i + 1];//文件索引 从x开始
    }
});

fs.readdir(src, (err, files) => {//读取源文件目录
    if (err) {
        console.log(err);
    } else {
        console.log(dist);
        fs.access(dist, existing => {
            if (existing) {//如果dist文件夹不存在则新建文件夹
                fs.mkdir(dist, () => {
                    copyFile(files, src, dist, filename, index);
                })
            } else {
                copyFile(files, src, dist, filename, index);
            }
        });
    }
});

function copyFile(files, src, dist, filename, index) {
    files.forEach(n => {
        let readFile,
            writeFile,
            arr = n.split('.'),
            oldPath = src + '/' + n,//老路径
            newPath = dist + '/' + filename + index + '.' + arr[arr.length - 1];//拼接文件后缀名 新路径
        fs.stat(oldPath, (err, stats) => {
            if (err) {
                console.log(err);
            } else if (stats.isFile()) {//判断是否是文件 执行复制移动操作
                readFile = fs.createReadStream(oldPath);
                writeFile = fs.createWriteStream(newPath);
                readFile.pipe(writeFile);//把当前的可读流和另外一个可写流连接起来。可读流中的数据会被自动写入到可写流中。
            }
        });
        index++;
    })
}
```
**使用方法：**`node xx -src imgdir -dist newImgDir -n newName- -i 1`
>xx：js文件；imgdir：需要重命名的图片的文件夹名；newImgDir：重命名以后存放图片的文件夹名
newName：新图片的前缀名；1：索引从1开始 可以自定义

