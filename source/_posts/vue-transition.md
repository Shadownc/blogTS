---
title: vue-transition
date: 2018-03-02 14:02:44
categories:
- Vue
tags:
- Vue
---
vue的过渡动画css
<!-- more -->
##### 关于vue的过渡动画,先上css:
```css
/* // down */
.slide-down-enter-active {
  transition: all 0.4s ease;
}
.slide-down-leave-active {
  /* transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1); */
  transition: all 0.4s;
}
.slide-down-enter,
.slide-down-leave-active {
  transform: translateY(20px);
  opacity: 0;
}
.slide-down-move {
  transition: all 0.4s;
}
.slide-down-leave-active {
  /* position: absolute !important;
  width: 100%; */
}

/* // up */
.slide-up-enter-active {
  transition: all 0.5s ease 0.3s;
}
.slide-up-leave-active {
  transition: all 0.5s ease;
}
.slide-up-enter,
.slide-up-leave-active {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-up-move {
  transition: all 0.5s;
}

/* // left */
.slide-left-enter-active {
  transition: all 0.5s ease;
}
.slide-left-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter {
  transform: translateX(20px);
  opacity: 0;
}
.slide-left-leave-active {
  transform: translateX(-20px);
  opacity: 0;
}
.slide-left-move {
  transition: all 0.5s;
}

/* // right */
.slide-right-enter-active {
  transition: all 0.5s ease;
}
.slide-right-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-right-enter {
  transform: translateX(-20px);
  opacity: 0;
}
.slide-right-leave-active {
  transform: translateX(20px);
  opacity: 0;
}
.slide-right-move {
  transition: all 0.5s;
}

/* // fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-move {
  transition: transform 0.3s;
}
```
使用方法：
```
<button v-on:click="show = !show">
            展开列表
        </button>
        <transition name="fade">
            <ul v-show="show">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>
        </transition>
```
测试案例就不放了。。自己放到代码里试试效果呗~
**欢迎前端小伙伴加群一起学习进步：163958730**