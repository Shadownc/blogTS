---
title: js时间日期相关函数
date: 2021-10-21 10:27:30
categories:
- JavaScript
tags:
- JavaScript
---
js时间日期相关函数
<!-- more -->
## Date对象

获取当前时间毫秒值

```js
// 方式一
Date.now(); // 1606381881650
// 方式二
new Date() - 0; // 1606381881650
// 方式三
new Date().getTime() // 1606381881650
```

创建`Date`对象的兼容性问题。

```js
// window和安卓支持，ios和mac不支持
new Date('2020-11-26'); 
// window和安卓支持，ios和mac支持
new Date('2020/11/26');
```

标准时间转时间戳

```js
let date = new Date('2020-03-12 18:00:00');

// 有三种方式转化
let time1 = date.getTime();
let time2 = date.valueOf();
let time3 = Date.parse(date);

console.log(time1); //  1584007200000
console.log(time2); //  1584007200000
console.log(time3); //  1584007200000
```

## 时间戳转化成YMD格式

```js
let date = Date.parse(new Date()) //  获取当前时间戳(毫秒)

/*
*   timestamp 当前时间戳，毫秒
*   formats 时间格式，包括：
*               1. Y-m-d
*               2. Y-m-d H:i:s
*               3. Y年m月d日
*               4. Y年m月d日 H时i分s秒
*/

dateFormat = (timestamp, formats) => {
    formats = formats || 'Y-m-d';
    let zero = v => v < 10 ? `0${v}` : v
    let myDate = timestamp ? new Date(timestamp) : new Date();
    let year = myDate.getFullYear();
    let month = zero(myDate.getMonth() + 1);
    let day = zero(myDate.getDate());
    let hour = zero(myDate.getHours());
    let minute = zero(myDate.getMinutes());
    let second = zero(myDate.getSeconds());

    return formats.replace(/Y|m|d|H|i|s/ig, matches => {
        return ({
            Y: year,
            m: month,
            d: day,
            H: hour,
            i: minute,
            s: second
        })[matches];
    });
};

console.log(dateFormat(date,'Y-m-d H:i:s'));
```

## 获取当前时间

```js
const getTime = (time = Date.parse(new Date()), payload = 'Y-M-d h:m:s') => {
    let newDate = new Date(time);
    let zero = v => v < 10 ? `0${v}` : v
    let { y, M, d, h, m, s } = { y: newDate.getFullYear(), M: zero(newDate.getMonth() + 1), 
        d: zero(newDate.getDate()), h: zero(newDate.getHours()), m: zero(newDate.getMinutes()), 
        s: zero(newDate.getSeconds()) 
     };
    return payload.replace(/Y|m|d|H|i|s/ig, matches => {
        return ({
            Y: y,
            M: M,
            d: d,
            h: h,
            m: m,
            s: s
        })[matches];
    });
}
//获取当前年份
console.log(getTime(Date.parse(new Date()),'Y'));//2021
//获取当前年月
console.log(getTime(Date.parse(new Date()),'Y-M'));//2021-10
//获取当前年月日
console.log(getTime(Date.parse(new Date()),'Y-M-d'));//2021-10-21
//获取当前年月日时分秒(默认获取)
console.log(getTime(Date.parse(new Date()),'Y-M-d h:m:s'));//2021-10-21 10:03:17
```

**简易版（只获取时分秒）**

```js
const timeFromDate = date => date.toTimeString().slice(0, 8);
timeFromDate(new Date()) //08:30:34
console.log(timeFromDate(new Date(2021, 0, 10, 17, 25, 0))); // Result: "17:25:00"
```

## 获取星期

```js
const getWeek = function (date) {
    let Stamp = date ? new Date(date) : new Date()
    let weeks = ['日', '一', '二', '三', '四', '五', '六'];
    return `星期${weeks[Stamp.getDay()]}`;
};
console.log(getWeek());//星期四
console.log(getWeek('2021-10-19'));//星期二
```

## 计算时间N之前

```js
const time_filter = time => {
    time -= 0;
    let difTime = new Date().getTime() - time;
    let { h, m, s } = { h: parseInt(difTime / (3600 * 1000)),
                        m: parseInt(difTime / (60 * 1000)), 
                        s: parseInt(difTime / 1000) 
                       };
    let msg = "";
    if (m < 1) {
        msg = `${s}秒前`
    } else if (m >= 1 && h < 1) {
        msg = `${m}分钟前`;
    } else if (h >= 1 && h <= 24) {
        msg = `${h}小时前`;
    } else if (h > 24) {
        h = parseInt(h / 24)
        msg = `${h}天前`;
    }
    return msg;
}


console.log(time_filter(1634781600000));  //13分钟前
console.log(time_filter(new Date('2021-10-21 10:00:00')));//13分钟前
```

## 获取某一天时间，或某一天前后的时间(默认获取当天日期)

```js
/**
 * 获取某一天时间，或某一天前后的时间
 * @param {Number} AddDayCount 与某一天相比的相差的天数 必填 0 当天
 * @param {String} dateStr 某一天时间
 * @return {String} 返回一个格式为'yyyy-mm-dd'的字符串
 */
 getDateStr = (AddDayCount=0, dateStr = new Date()) => {
    let date = new Date(dateStr)
    let addZero = value => { return value < 10 ? `0${value}` : value }
    date.setDate(date.getDate() + AddDayCount)
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()
    return `${y}-${addZero(m)}-${addZero(d)}`
}
getDateStr() //默认获取当前日期 2021-10-21
getDateStr(5)// 2021-10-26
getDateStr(-5) //2021-10-16
```

## 两个日期间的天数

```js
const diffDays = (startDate, endDate) =>
    Math.ceil(
        Math.abs(new Date(startDate) - new Date(endDate)) /
            (1000 * 60 * 60 * 24)
    );

console.log(diffDays("2021-06-01", "2021-10-21")); // 142
```

## 计算日期到现在隔了多少天

```js
const getDuration = registTime => {
    var start = new Date(registTime)
    var end = new Date()
    var dates = Math.floor((end - start) / (1000 * 60 * 60 * 24))
    return dates
}
//getDuration('2021-11-01')
//返回 386
```

## 计算本周开始和结束的日期

```js
const now=new Date()
const one_day=86400000;// 24 * 60 * 60 * 1000
const day=now.getDay();//返回0-6 0是周日
const weekStartDate=new Date(now.getTime()-(day-1)*86400000)
const weekEndDate=new Date(now.getTime()+(7-day)*86400000)
```

## 计算本月的总天数

```js
const mGetDate=(month)=>{
    var date = new Date();
     var year = date.getFullYear();
     var month = month;
     var d = new Date(year, month, 0);
     return d.getDate();
}
// mGetDate(2) //28
```

## 转换日期格式x月x日的数据,输出`xx/xx`(如4月7日转换成`04/07`)

```js
const dateFormatter=date=>{
      const [month, day] = date.split("月").join("/").split("日")[0].split('/');
      console.log( month, day);
      const formattedDate = `${month.padStart(2, "0")}/${day.padStart(2, "0")}`;
      return formattedDate
    }
 console.log(dateFormatter('4月7日'));==>04/07
```

## 计算相差时间(精确到毫秒)

```js
const getTimeDifference = (startTime, endTime) => {
    //传入日期时间字符串或者时间戳（13位）
    startTime = new Date(startTime);
    endTime = new Date(endTime);
    const difference = endTime.getTime() - startTime.getTime(); // 计算两个时间之间的差异（以毫秒为单位）
    const days = Math.floor(difference / (1000 * 60 * 60 * 24)); // 计算天数
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // 计算小时数
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)); // 计算分钟数
    const seconds = Math.floor((difference % (1000 * 60)) / 1000); // 计算秒数
    const milliseconds = difference % 1000; // 计算毫秒数
    return `${days}天 ${hours}小时 ${minutes}分钟${seconds}秒${milliseconds}毫秒`; // 格式化差异为所需的字符串格式
}

```

## 获取指定日期的前后多少天/周的日期

```js
/**
 * 获取指定日期的前后多少天/周的日期。
 * @param {Date|string|number} date 指定日期对象、格式为"YYYY-MM-DD"的字符串或对应的时间戳。
 * @param {number} days 偏移天数，正数表示未来日期，负数表示过去日期。
 * @param {string} format 日期展示格式，默认为"YYYY-MM-DD"。
 * @returns {string|null} 若传入格式错误，则返回 null，否则返回对应的日期字符串。
 */
function getDateByOffset(date, days, format = 'YYYY-MM-DD') {
    let targetDate = null;
    if (typeof date === 'number') {
        targetDate = new Date(date);
    } else if (typeof date === 'string') {
        targetDate = new Date(date.replace(/-/g, '/'));
        if (isNaN(targetDate)) {
            return null;
        }
    } else if (date instanceof Date) {
        targetDate = date;
    } else {
        return null;
    }

    const targetTimestamp = targetDate.getTime() + days * 24 * 60 * 60 * 1000;
    const targetDateObject = new Date(targetTimestamp);
    const yyyy = targetDateObject.getFullYear();
    const mm = String(targetDateObject.getMonth() + 1).padStart(2, '0');
    const dd = String(targetDateObject.getDate()).padStart(2, '0');

    const placeholders = {
        YYYY: yyyy,
        MM: mm,
        DD: dd
    };
    return format.replace(/YYYY|MM|DD/g, match => placeholders[match]);
}

getDateByOffset('2023-05-19', 7)//2023-05-26
getDateByOffset(new Date(), 7)//2023-05-26
getDateByOffset(1684480885835, 7) //2023-05-26

//or
let getDate = (startDate = new Date(), n, type = 'day') => {
    let currentDate = new Date(startDate);
    let targetDate = new Date(currentDate);

    if (type === 'day') {
        targetDate.setDate(currentDate.getDate() + n);
    } else if (type === 'week') {
        targetDate.setDate(currentDate.getDate() + n * 7);
    }

    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let day = targetDate.getDate();

    // 使用padStart方法补零
    month = month.toString().padStart(2, '0');
    day = day.toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

getDate('2023-05-19', 7)//2023-05-26
getDate(new Date(), 7)//2023-05-26
getDate(1684480885835, 7) //2023-05-26
getDate(1684480885835, 1,'week') //2023-05-26
```