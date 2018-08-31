---
title: something about Vuex...
date: 2018-01-17 16:41:37
categories:
- Vue
tags:
- Vue
---
Vuex从入门到放弃...哈哈哈
<!-- more -->
安装什么得应该不用多说了吧。。不会安装的点击官网链接

**Vuex:**<https://vuex.vuejs.org/zh-cn/installation.html>

引入使用：
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```
在你的store或者vuex目录下创建一个store：
```javascript
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
       ...
    },
    mutations: {
        ...
    }
})

export default store

//在main.js挂载store
import store from './vuex'
new Vue({
  el: '#app',
  router,
 // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store ,//必须是store
  components: { App },
  template: '<App/>'
})
//这里补充说明一点，挂载必须是store，否则$store会报 '$store" is not defined'
//还有另一种导出方法
export default new Vuex.Store({
  state: {
     ...
  },
  actions,
  getters,
  modules: {
    ...
  }
})
```
**接下来是核心模块**
* state
```javascript
//从store取出state
computed: {
    count () {
      return this.store.state.count
    }
  }
```
##### **mapState 辅助函数**
```javascript
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }  
    //es6
    countPlusLocalState: state => {
        return state.count + this.localCount;
      }
  })
如果你想将一个 state属性另取一个名字，使用对象形式：
当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
//...mapState
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```
* getters
项目中我也没怎么用过，类似于计算属性
>```javascript
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
   ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)//返回done是true的新数组
    }
  }
})
```
**Getter 也可以接受其他 getter 作为第二个参数：**
```javascript
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
store.getters.doneTodosCount // -> 1
```
##### mapGetters 辅助函数去官网看吧 和mapState差不多。。

* mutations
>更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
#
```javascript
 mutations: {
    increment (state,payload) {
      // 变更状态
      payload ? state.count+=payload : state.count++
    }
  }
```
>你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 increment 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：
#
`store.commit('increment') || store.commit('increment',10)`
**payload可以是对象：**
```javascript
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}

store.commit('increment', {
  amount: 10
})

```
**在组件中提交 Mutation**
>你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。
#
```javascript
import { mapMutations } from 'vuex'
methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
      //@click调用：@click='increment(payload) --payload可传可不传'
      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      //@click调用：@click='add() --payload同上'
    })
  }
```
* actions
* Action 类似于 mutation，不同在于：
 Action 提交的是 mutation，而不是直接变更状态。
Action 可以包含任意异步操作。
```javascript
 actions: {
    increment (context) {
      context.commit('increment')
      //Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation
      ，或者通过 context.state 和 context.getters 来获取 state 和 getters。
    }
  }
```
**Action 通过 store.dispatch 方法触发：**
`store.dispatch('increment')`
>实践中，我们会经常用到 ES2015 的 [参数解构](https://github.com/lukehoban/es6features#destructuring) 来简化代码（特别是我们需要调用 `commit` 很多次的时候）：
#
```javascript
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```
**Actions 支持同样的载荷方式和对象方式进行分发：**
```javascript
actions: {
        increment({ commit, state }, payload) {
            commit('increment', payload)//mutations接收payload 如未传则默认null
        }
    }
```
**在组件中分发 Action**
```javascript
import { mapActions } from 'vuex'
//类似于mutations
 methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
```
**组合 Action深入了解[见官网](https://vuex.vuejs.org/zh-cn/actions.html)**
* modules
>Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter
>对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。
>同样，对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState：
#
```javascript
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {//state为moduleA的局部state,rootState是根的state
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```