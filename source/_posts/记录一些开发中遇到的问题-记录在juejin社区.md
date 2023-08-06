---
title: 记录一些开发中遇到的问题(记录在juejin社区)
date: 2021-11-06 14:39:29
categories:
- JavaScript
tags:
- JavaScript
---
平时开发中遇到的一些问题及解决方法(记录在juejin社区)
<!-- more -->
## 安装node js，输入命令，提示：'node' 不是内部或外部命令，也不是可运行的程序 或批处理文件的解决方法
> 大概率问题是环境变量未配置的问题
* 控制面板>系统>高级系统设置>高级>环境变量
* 新建用户环境变量`NODE_PATH`(变量名),值就是`nodejs`安装路径(`C:\Program Files\nodejs`)**默认安装路径**
* 编辑用户变量`Path`把`nodejs`路径直接添加在后面即可
## Vue报错Uncaught TypeError: Cannot read property 'match' of undefined
vue页面后退控制台报错  
是因为`a`标签没有设置`href`属性，加上`href`属性就好了

## vue-awesome-swiper 使用loop:true后点击事件不生效的问题
``` html
<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide @click="next">Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
  import { swiper, swiperSlide } from "vue-awesome-swiper";
  import "swiper/swiper-bundle.css";

  export default {
    name: 'swiper-example-loop',
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    },
    methods:{
      next(){
        console.log(11)
      }
    }
  }
</script>
```
> 会发现`loop`出来的点击事件不生效
``` js
//解决
data() {
      let vm=this;
      return {
        swiperOption: {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          on:function(e){
            vm.next(e)//获取所需要的参数
          }
        }
      }
    }
```
## js动态往body添加dom
``` js
let elem = document.createElement("div");
elem.className='loading' ;
// 或者 elem.id='loading';
elem.innerHTML = `<div class="load-3">
        <div class="indexLine"></div>
        <div class="indexLine"></div>
        <div class="indexLine"></div>
      </div>`;
  document.body.appendChild(elem);
```
## 监听页面关闭或刷新执行
**原理**
``` js
window.onbeforeunload = function (e) {
      e = e || window.event;

      // 兼容IE8和Firefox 4之前的版本
      if (e) {
        //     e.returnValue = '关闭提示';
      }

      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      //   return '关闭提示';
      localStorage.removeItem("ax");
    };
```
**在`vue`中使用**
``` js
  created(){
    window.addEventListener('beforeunload', this.leaveConfirm)
  },
  methods: {
    leaveConfirm (e) {
      e = e || window.event
      if (e) {
        // e.returnValue = '关闭提示'
      }
      // return '关闭提示'
      // 执行一些操作
      localStorage.removeItem('xx')
    },
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.leaveConfirm);
  },
```
## Vue无痕刷新
``` js
//App.vue
<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
</style>

//要用到刷新的组件 调用this.reload()
<script>
export default {
  inject: ['reload'],
  data() {
    return {};
  },
  methods: {
      refresh(){
          this.reload();
      }
      },
  };
</script>
```
> 还有两种方法（体验一般）
1. 这两种都可以刷新当前页面的，缺点就是相当于按`ctrl+F5` 强制刷新那种，整个页面重新加载，会出现一个瞬间的空白页面，体验不好
``` js
location.reload()
this.$router.go(0)
```
2. 先跳转一个空白页，再跳转回来,这种方法就是地址栏url会有瞬间变化
``` js
<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    let redirect = this.$route.query.redirect;
    this.$router.replace(redirect);
  },
};
</script>

<style lang="less" scoped>
</style>
```
## ElementUI DatePicker选择月当前月份高亮样式修改
``` js
<template>
  <div class="home">
    <el-date-picker
      v-model="value2"
      type="month"
      popper-class="month"
      placeholder="选择月"
    >
    </el-date-picker>
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      value2: new Date(2021, 8, 1),//设置默认选择2021九月
    };
  },
};
</script>
<style lang="less">
.month {
  .el-month-table {
    td.today {
      .cell {
        font-weight: normal !important;
        color: unset !important;
      }
    }
  }
}
</style>
```
## Css实现滚动时隐藏滚动条
``` css
html {
    -ms-overflow-style:none; 
    overflow:-moz-scrollbars-none; 
}
html::-webkit-scrollbar{
    width:0px
}
```
## Vue install 使用
``` js
const plugin = {
    install(Vue, opts = {}) {
        // 组件
        // 指令
        // 混入
        // 挂载vue原型
        //传入的参数
        console.log(opts);
        Vue.directive('copy', {
            bind(el, { value }) {
                el.$value = value
                el.handler = () => {
                    if (!el.$value) {
                        // 值为空的时候，给出提示。可根据项目UI仔细设计
                        console.log('无复制内容')
                        return
                    }
                    // 动态创建 textarea 标签
                    const textarea = document.createElement('textarea')
                    // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
                    textarea.readOnly = 'readonly'
                    textarea.style.position = 'absolute'
                    textarea.style.left = '-9999px'
                    // 将要 copy 的值赋给 textarea 标签的 value 属性
                    textarea.value = `${el.$value} - ${opts.name}`
                    // 将 textarea 插入到 body 中
                    document.body.appendChild(textarea)
                    // 选中值并复制
                    textarea.select()
                    const result = document.execCommand('Copy')
                    if (result) {
                        console.log('复制成功') // 可根据项目UI仔细设计
                    }
                    document.body.removeChild(textarea)
                }
                // 绑定点击事件，就是所谓的一键 copy 啦
                el.addEventListener('click', el.handler)
            },
            // 当传进来的值更新的时候触发
            componentUpdated(el, { value }) {
                el.$value = value
            },
            // 指令与元素解绑的时候，移除事件绑定
            unbind(el) {
                el.removeEventListener('click', el.handler)
            }
        });
    }
}


export default plugin
```
**在main.js中引入**
``` js
import copy from './assets/js/plugin' //plugin.js根据项目中的位置自己定
Vue.use(copy,{name:'shadow'}) //使用与传参
```
## jsonp判断url是否能打开
``` js
$.ajax({
       url:'http://ybj.zj.gov.cn/art/2019/8/7/art_1229225623_1181747.html',
        cache: false,
        dataType: "jsonp", //跨域采用jsonp方式 
        processData: false,
        timeout:10000, //超时时间，毫秒
        complete: function (data) {
          if(data.status==200){
            //可访问
          }else{
            //不可访问
          }
        }
     })
```
## 获取Url参数(兼容哈希)
``` js
let url='https://xxx.cn/phone/dist/index.html?dataOpenId=oppyn1BSQzOA4C1706jNWLUoaSnU&dataUserId=406f3640614511ebad49bd6e5d36a63a#/home'

getQueryString = (name, search) => {
  search = search ||  window.location.search.substr(1) || window.location.hash.split("?")[1];
  let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  let r = search.match(reg);
  if (r != null) return  unescape(r[2]); return null;
}

//getQueryString('dataOpenId')  //'oppyn1BSQzOA4C1706jNWLUoaSnU'
//getQueryString('dataUserId')  //'406f3640614511ebad49bd6e5d36a63a'
//getQueryString('dataUserId',url) //'406f3640614511ebad49bd6e5d36a63a#/home'
```
## Element`el-cascader`级联选择器动态加载及回显
>误区:默认不需要自己去加载第一层数据，会自动请求第一层数据  
>回显只需要传入address数组即选中的id回显会自动去请求回显  
>addressList设置空数组即可
``` js
 <el-cascader
      ref="cascaderAddr"
      :props="addressProps"
      v-model="address"
      :options="addressList"
      @change="addressChange"
    ></el-cascader>
    <script>

export default {
  name: "Home",
  data() {
    return {
      addressList:[],
      address:[],
      addressProps:{
        label:'title',
        value:'key',
        lazy: true,
        lazyLoad(node, resolve){
          const { level } = node;
          const nodes = []; 
          homeRecommendApi.getTree({pId:node.value}).then(res=>{
            res.data.map(item=>{
              let obj = {
                  key: item.key,
                  title: item.title,
                  leaf: level >= 3, 
                };
                nodes.push(obj);
            })
            resolve(nodes);
          })
        }
      },
    };
  },
};
</script>
```
## 微信小程序使用Echarts控制台报错非法颜色none
**在`ec-canvas`文件夹下`wx-canvas.js`文件的`_initStyle()`方法中加入代码**
> 使用`force-use-old-canvas="true"`属性引起（该属性解决图表不随屏幕滚动问题）
``` wxml
<ec-canvas id="progressChart" canvas-id="mychart-bar" ec="{{ ecProgress }}"  force-use-old-canvas="true">
</ec-canvas>
```
``` js
var styles = [
      "fillStyle",
      "strokeStyle",
      "globalAlpha",
      "textAlign",
      "textBaseAlign",
      "shadow",
      "lineWidth",
      "lineCap",
      "lineJoin",
      "lineDash",
      "miterLimit",
      "fontSize",
    ];
    styles.forEach((style) => {
      Object.defineProperty(ctx, style, {
        set: (value) => {
          if (
            (style !== "fillStyle" && style !== "strokeStyle") ||
            (value !== "none" && value !== null)
          ) {
            ctx["set" + style.charAt(0).toUpperCase() + style.slice(1)](value);
          }
        },
      });
    });
```
## 将字符串转换成数组(`"[上海, 天津, 河南]"`)
``` js
"[上海, 天津, 河南]".replace (/\[|]/g, '').split(',')
```
## 浙里办数据脱敏
``` js
const desensitization = (str, beginLen, endLen = -1) => {
    let len = str.length;
    if (beginLen == 0) {
        endLen = endLen * len + 1;
    }
    let firstStr = str.substr(0, beginLen);
    let lastStr = str.substr(endLen);
    let middleStr = str.substring(beginLen, len - Math.abs(endLen)).replace(/[\s\S]/ig, '*');
    return `${firstStr}${middleStr}${lastStr}`;
}
//姓名脱敏
desensitization(userName,0)
//手机号脱敏
desensitization(phone,3,-4)
//身份证号脱敏
desensitization(idCard,1,-1)
```
## 字符串首字脱敏展示
```
const maskChineseString=(s)=>s.replace(/^(.)/, "*")

maskChineseString('abc') //*bc
maskChineseString('张三丰') //*三丰
```
## Element的el-time-picker选择了时间点确定后鼠标快速移入选择框选择框再次显示问题
1. 通过修改`css`的方法(缺点：会移除显示隐藏的动画)
``` css
.el-time-panel {
  transition: none !important;
}
```
2. 失去焦点事件内手动执行关闭显示框
``` js
setTimeout(() => {
  this.$refs.timePicker.pickerVisible = false;
}, 50);
```
3. 最优解
``` js
  data () {
    return {
      externalVisible:false
    }
  },
  methods:{
    handleOnFocus (ref) {
      if(ref.pickerVisible && this.externalVisible) {
          ref.pickerVisible = false
          ref.blur()
      }
    },
    handleOnBlur (ref) {
      ref.picker.$on("dodestroy", () => {
          this.externalVisible = false
        })
        this.externalVisible = true
    },
  }
```
