---
title: Vue3设计思想
---

# Vue3 设计思想

## 声明式框架

> Vue3 依旧是声明式框架，用起来简单

### 命令式和声明式区别

- 早在 JQ 的时代编写的代码都是命令式的，命令式框架重要特点及时关注过程
- 声明式框架更加个按住结果，命令式的代码封装到了 vuejs 中，过程靠 vuejs 来实现

```javascript
// 命令式编程
let numbers = [1, 2, 3, 4, 5]
let total = 0
for (let i = 0; i < numbers.length; i++) {
  total += numbers[i] // 关注过程
}
console.log(total)

// 声明式编程
let total2 = numbers.reduce((memo, current) => {
  // 不关注过程，过程在reduce函数内部
  return memo + current
}, 0)
console.log(total2)
```

## 采用虚拟 DOM

传统更新页面，拼接成完整的一个字符串 innerHTML 全部重新渲染，添加虚拟 DOM 后，可以比较新旧虚拟节点，找到变化在进行更新。虚拟 DOM 就是一个对象，用来描述真实 DOM 的

```javascript
const vnode = {
  __v_isVNode: true,
  __v_skip: true,
  type,
  props,
  key: props && normalizeKey(props),
  ref: props && normalizeKey(props),
  children,
  component: null,
  el: null,
  patchFlag,
  dynamicProps,
  dynamicChildren: null,
  appContext: null,
}
```

## 区分编译时和运行时

- 我们需要一个虚拟 `DOM`。调用渲染方法将虚拟 `DOM` 渲染成真实 `DOM`（缺点就是虚拟 `DOM` 编写麻烦）
- 专门写个编译时可以将模板编译成虚拟 `DOM`（在构建的时候编译性能更高，不需要在运行的时候进行编译，而且 `VUE3` 在编译时做了很多优化）

## Vue3 新增设计

- `Vue3.0` 更注重模块上的拆分，在 `2.0` 中无法单独使用那部分模块，需要引入完整的 `vuejs`（例如：只想使用响应式部分，但是需要引入完整的 `vuejs`），`vue3` 中的模块之间耦合低，模块可以独立使用 `拆分模块`
- `vue2` 中很多方法挂载到了实例中导致没有被使用也会被打包（还有很多组件也是一样）。通过构建工具 `Tree-shaking` 机制实现按需引入，减少用户打包后体积。同事移除看一些不需要的功能`（filter，iniline-template）` `重写API`
- `vue3` 允许自定义渲染器，扩展能力强。不会发生以前的事情，改写 VUE 源码改造渲染方式 `扩展更方便`
