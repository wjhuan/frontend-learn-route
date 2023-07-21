---
title: VUE2 VUE3面试题
---

# VUE2 VUE3 面试题

## Vue computed 和 watch 区别

### 两者设计用途不同

- computed 用于产出二次处理之后的数据，如对于一个列表进行 filter 处理
- watch 用于监听数据变化（如 v-model 时，数据可能被动改变，需要监听才能拿到）

### computed 有缓存

- computed 有缓存，data 不变则缓存不失效
- methods 无缓存，实时计算

### 答案

- computed 就已有数据产出新数据，有缓存
- watch 监听已有数据

## Vue 组件通讯

### props / $emit

适用于父子组件。

- 父组件向子组件传递 props 和事件
- 子组件接收 props ，使用 `this.$emit` 调用事件

### 自定义事件

适用于兄弟组件，或者“距离”较远的组件。

常用 API
- 绑定事件 `event.on(key, fn)` 或 `event.once(key, fn)`
- 触发事件 `event.emit(key, data)`
- 解绑事件 `event.off(key, fn)`

Vue 版本的区别
- Vue 2.x 可以使用 Vue 实例作为自定义事件
- Vue 3.x 需要使用第三方的自定义事件，例如 https://www.npmjs.com/package/event-emitter

【注意】组件销毁时记得 `off` 事件，否则可能会造成内存泄漏

### $attrs

`$attrs` 存储是父组件中传递过来的，且未在 `props` 和 `emits` 中定义的属性和事件。<br>
相当于 `props` 和 `emits` 的一个补充。

继续向下级传递，可以使用 `v-bind="$attrs"`。这会在下级组件中渲染 DOM 属性，可以用 `inheritAttrs: false` 避免。

【注意】Vue3 中移除了 `$listeners` ，合并到了 `$attrs` 中。

### $parent

通过 `this.$parent` 可以获取父组件，并可以继续获取属性、调用方法等。

【注意】Vue3 中移除了 `$children` ，建议使用 `$refs`

### $refs

通过 `this.$refs.xxx` 可以获取某个子组件，前提是模板中要设置 `ref="xxx"`。

【注意】要在 `mounted` 中获取 `this.$refs` ，不能在 `created` 中获取。

### provide / inject

父子组件通讯方式非常多。如果是多层级的上下级组件通讯，可以使用 provide 和 inject 。<br>
在上级组件定一个 provide ，下级组件即可通过 inject 接收。

- 传递静态数据直接使用 `provide: { x: 10 }` 形式
- 传递组件数据需要使用 `provide() { return { x: this.xx } }` 形式，但做不到响应式
- 响应式需要借助 `computed` 来支持

### Vuex

Vuex 全局数据管理

### 答案

- 父子组件通讯
    - `props` `emits` `this.$emit`
    - `$attrs` （也可以通过 `v-bind="$attrs"` 向下级传递）
    - `$parent` `$refs`
- 多级组件上下级
    - `provide` `inject`
- 跨级、全局
    - 自定义事件
    - Vuex

## Vuex mutation action 区别

### 答案

- mutation
    - 建议原子操作，每次只修改一个数据，不要贪多
    - 必须是同步代码，方便查看 devTools 中的状态变化
- action
    - 可包含多个 mutation
    - 可以是异步操作

Vue 每个生命周期都做了什么

## Vue 生命周期

![](./img/vue-lifecycle.png)

### beforeCreate

初始化一个空的 Vue 实例，`data` `methods` 等尚未被初始化，无法调用。

### created

Vue 实例初始化完成，`data` `methods` 都已初始化完成，可调用。<br>
但尚未开始渲染模板。

### beforeMount

编译模板，调用 `render` 函数生成 vdom ，但还没有开始渲染 DOM

### mounted

渲染 DOM 完成，页面更新。组件创建完成，开始进入运行阶段。

### beforeUpdate

在数据发生改变后，DOM 被更新之前被调用。这里适合在现有 DOM 将要被更新之前访问它，比如移除手动添加的事件监听器。

### updated

在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。

注意，尽量不要在 `updated` 中继续修改数据，否则可能会触发死循环。

### onActivated

被 `keep-alive` 缓存的组件激活时调用。

### onDeactivated

被 `keep-alive` 缓存的组件停用时调用。

### beforeUnmount

组件进入销毁阶段。

卸载组件实例后调用，在这个阶段，实例仍然是完全正常的。<br>
移除、解绑一些全局事件、自定义事件，可以在此时操作。

### unmounted

卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。

---

### 连环问：如何正确的操作 DOM

`mounted` 和 `updated` 都不会保证所有子组件都挂载完成，如果想等待所有视图都渲染完成，需要使用 `$nextTick`

```js
mounted() {
  this.$nextTick(function () {
    // 仅在整个视图都被渲染之后才会运行的代码
  })
}
```

### 连环问：ajax 放在哪个生命周期合适？

一般有两个选择：`created` 和 `mounted` ，建议选择后者 `mounted` 。

执行速度
- 从理论上来说，放在 `created` 确实会快一些
- 但 ajax 是网络请求，其时间是主要的影响因素。从 `created` 到 `mounted` 是 JS 执行，速度非常快。
- 所以，两者在执行速度上不会有肉眼可见的差距

代码的阅读和理解
- 放在 `created` 却会带来一些沟通和理解成本，从代码的执行上来看，它会一边执行组件渲染，一边触发网络请求，并行
- 放在 `mounted` 就是等待 DOM 渲染完成再执行网络请求，串行，好理解

所以，综合来看，更建议选择 `mounted` 。

### 连环问：Composition API 生命周期有何不同 

- `setup` 代替了 `beforeCreate` 和 `created`
- 生命周期换成了函数的形式，如 `mounted` -> `onMounted` 参考 https://v3.cn.vuejs.org/api/composition-api.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90

```js
import { onUpdated, onMounted } from 'vue'

export default {
    setup() {
        onMounted(() => {
            console.log('mounted')
        })
        onUpdated(() => {
            console.log('updated')
        })
    } 
}
```

## Vue-router 模式

### v4 的升级

Vue-router v4 升级之后，`mode: 'xxx'` 替换为 API 的形式，但功能是一样的
- `mode: 'hash'` 替换为 `createWebHashHistory()`
- `mode: 'history'` 替换为 `createWebHistory()`
- `mode: 'abstract'` 替换为 `createMemoryHistory()`

PS：个人感觉，叫 `memory` 比叫 `abstract` 更易理解，前者顾名思义，后者就过于抽象。

### hash

```js
// http://127.0.0.1:8881/hash.html?a=100&b=20#/aaa/bbb
location.protocol // 'http:'
location.hostname // '127.0.0.1'
location.host // '127.0.0.1:8881'
location.port // '8881'
location.pathname // '/hash.html'
location.search // '?a=100&b=20'
location.hash // '#/aaa/bbb'
```

hash 的特点
- 会触发页面跳转，可使用浏览器的“后退” “前进”
- 但不会刷新页面，支持 SPA 必须的特性
- hash 不会被提交到 server 端（因此刷新页面也会命中当前页面，让前端根据 hash 处理路由）

url 中的 hash ，是不会发送给 server 端的。前端 `onhashchange` 拿到自行处理。

```js
// 页面初次加载，获取 hash
document.addEventListener('DOMContentLoaded', () => {
    console.log('hash', location.hash)
})
// hash 变化，包括：
// a. JS 修改 url
// b. 手动修改 url 的 hash
// c. 浏览器前进、后退
window.onhashchange = (event) => {
    console.log('old url', event.oldURL)
    console.log('new url', event.newURL)

    console.log('hash', location.hash)
}
```

### H5 history API

常用的两个 API
- `history.pushState`
- `window.onpopstate`

页面刷新时，**服务端要做处理**，可参考[文档](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)。。即无论什么 url 访问 server ，都要返回该页面。

按照 url 规范，不同的 url 对应不同的资源，例如：
- `https://github.com/` server 返回首页
- `https://github.com/username/` server 返回用户页
- `https://github.com/username/project1/` server 返回项目页

但是用了 SPA 的前端路由，就改变了这一规则，假如 github 用了的话：
- `https://github.com/` server 返回首页
- `https://github.com/username/` server 返回首页，前端路由跳转到用户页
- `https://github.com/username/project1/` server 返回首页，前端路由跳转到项目页

所以，从开发者的实现角度来看，前端路由是一个违反规则的形式。
但是从不关心后端，只关心前端页面的用户，或者浏览器来看，更喜欢 `pushState` 这种方式。

代码参考 history-api.html

### 三种模式的区别

- hash - 使用 url hash 变化记录路由地址
- history - 使用 H5 history API 来改 url 记录路由地址
- abstract - 不修改 url ，路由地址在内存中，**但页面刷新会重新回到首页**。


## 你在实际工作中，做过哪些 Vue 优化？

### v-if 和 v-show

区别
- `v-if` 组件销毁/重建
- `v-show` 组件隐藏（切换 CSS `display`）

场景
- 一般情况下使用 `v-if` 即可，普通组件的销毁、渲染不会造成性能问题
- 如果组件创建时需要大量计算，或者大量渲染（如复杂的编辑器、表单、地图等），可以考虑 `v-show`

### v-for 使用 key

`key` 可以优化内部的 diff 算法。注意，遍历数组时 `key` 不要使用 `index` 。

```html
<ul>
    <!-- 而且，key 不要用 index -->
    <li v-for="(id, name) in list" :key="id">{{name}}</li>
</ul>
```

### computed 缓存

`computed` 可以缓存计算结果，`data` 不变则缓存不失效。

```js
export default {
    data() {
        return {
            msgList: [ ... ] // 消息列表
        }
    },
    computed: {
        // 未读消息的数量
        unreadCount() {
            return this.msgList.filter(m => m.read === false).length
        }
    }
}
```

### keep-alive

`<keep-alive>` 可以缓存子组件，只创建一次。通过 `activated` 和 `deactivated` 生命周期监听是否显示状态。<br>
代码参考 components/KeepAlive/index.vue

场景
- 局部频繁切换的组件，如 tabs
- 不可乱用 `<keep-alive>` ，缓存太多会占用大量内存，而且出问题不好 debug

### 异步组件

对于体积大的组件（如编辑器、表单、地图等）可以使用异步组件
- 拆包，需要时异步加载，不需要时不加载
- 减少 main 包的体积，页面首次加载更快

vue3 使用 `defineAsyncComponent` 加载异步组件，代码参考 components/AsyncComponent/index.vue

### 路由懒加载

对于一些补偿访问的路由，或者组件提交比较大的路由，可以使用路由懒加载。

```js
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
```

### SSR

SSR 让网页访问速度更快，对 SEO 友好。

但 SSR 使用和调试成本高，不可乱用。例如，一个低代码项目（在线制作 H5 网页），toB 部分不可用 SSR ， toC 部分适合用 SSR 。

### 答案

- v-if 和 v-show
- v-for 使用 key
- computed 缓存
- keep-alive
- 异步组件
- 路由懒加载
- SSR

## 连环问：Vue 遇到过哪些坑？？？

全局事件、自定义事件要在组件销毁时解除绑定
- 内存泄漏风险
- 全局事件（如 `window.resize`）不解除，则会继续监听，而且组件再次创建时会重复绑定

Vue2.x 中，无法监听 data 属性的新增和删除，以及数组的部分修改 —— Vue3 不会有这个问题
- 新增 data 属性，需要用 `Vue.set`
- 删除 data 属性，需要用 `Vue.delete`
- 修改数组某一元素，不能 `arr[index] = value` ，要使用 `arr.splice` API 方式

路由切换时，页面会 scroll 到顶部。例如，在一个新闻列表页下滑到一定位置，点击进入详情页，在返回列表页，此时会 scroll 到顶部，并重新渲染列表页。所有的 SPA 都会有这个问题，并不仅仅是 Vue 。
- 在列表页缓存数据和 `scrollTop`
- 返回列表页时（用 Vue-router [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)，判断 `from`），使用缓存数据渲染页面，然后 `scrollTo(scrollTop)`

## Vue 错误监听

### window.onerror

可以监听当前页面所有的 JS 报错，jQuery 时代经常用。<br>
注意，全局只绑定一次即可。不要放在多次渲染的组件中，这样容易绑定多次。

```js
window.onerror = function(msg, source, line, column, error) {
    console.log('window.onerror---------', msg, source, line, column, error)
}
// 注意，如果用 window.addEventListener('error', event => {}) 参数不一样！！！
```

### errorCaptured 生命周期

会监听所有**下级组件**的错误。可以返回 `false` 阻止向上传播，因为可能会有多个上级节点都监听错误。

```js
errorCaptured(error, instance, info) {
    console.log('errorCaptured--------', error, instance, info)
}
```

### errorHandler

全局的错误监听，所有组件的报错都会汇总到这里来。PS：如果 `errorCaptured` 返回 `false` 则**不会**到这里。

```js
const app = createApp(App)
app.config.errorHandler = (error, instance, info) => {
    console.log('errorHandler--------', error, instance, info)
}
```

请注意，`errorHandler` 会阻止错误走向 `window.onerror`。

PS：还有 `warnHandler`

### 异步错误

组件内的异步错误 `errorHandler` 监听不到，还是需要 `window.onerror`

```js
mounted() {
    setTimeout(() => {
        throw new Error('setTimeout 报错')
    }, 1000)
},
```

### 答案

方式
- `errorCaptured` 监听下级组件的错误，可返回 `false` 阻止向上传播
- `errorHandler` 监听 Vue 全局错误
- `window.onerror` 监听其他的 JS 错误，如异步

建议：结合使用
- 一些重要的、复杂的、有运行风险的组件，可使用 `errorCaptured` 重点监听
- 然后用 `errorHandler` `window.onerror` 候补全局监听，避免意外情况

### 扩展

Promise 监听报错要使用 `window.onunhandledrejection`
