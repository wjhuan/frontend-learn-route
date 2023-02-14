---
title: Vue3渲染原理
---

# Vue3 渲染原理

## Vue3 自定义渲染器

渲染器的作用是把虚拟 DOM 渲染为特定平台上的真实元素。在浏览器中，渲染器会把虚拟 DOM 渲染成真实 DOM 元素。

```js
const { createRenderer, h } = Vue
const renderer = createRenderer({
  createElement(element) {
    return document.createElement(element)
  },
  setElementText(el, text) {
    el.innerHTML = text
  },
  insert(el, container) {
    container.appendChild(el)
  },
})
renderer.render(h('h1', 'hello world'), document.getElementById('app'))
```

## 创建 runtime-dom 包

runtime-dom 针对浏览器运行时，包括 DOM API 、属性、事件处理等

> runtime-dom/package.json

```json
{
  "name": "@vue/runtime-dom",
  "main": "index.js",
  "module": "dist/runtime-dom.esm-bundler.js",
  "unpkg": "dist/runtime-dom.global.js",
  "buildOptions": {
    "name": "VueRuntimeDOM",
    "formats": ["esm-bundler", "cjs", "global"]
  }
}
```

```sh
pnpm install @vue/shared@workspace --filter @vue/runtime-dom
```

## 实现节点常用操作

> `runtime-dom/src/nodeOps` 这里存放常见 DOM 操作 API，不同运行时提供的具体实现不一样，最终将操作方法传递到`runtime-core`中，所以`runtime-core`不需要关心平台相关代码~

```js
export const nodeOps = {
  insert: (child, parent, anchor) => {
    // 添加节点
    parent.insertBefore(child, anchor || null)
  },
  remove: (child) => {
    // 节点删除
    const parent = child.parentNode
    if (parent) {
      parent.removeChild(child)
    }
  },
  createElement: (tag) => document.createElement(tag), // 创建节点
  createText: (text) => document.createTextNode(text), // 创建文本
  setText: (node, text) => (node.nodeValue = text), //  设置文本节点内容
  setElementText: (el, text) => (el.textContent = text), // 设置文本元素中的内容
  parentNode: (node) => node.parentNode, // 父亲节点
  nextSibling: (node) => node.nextSibling, // 下一个节点
  querySelector: (selector) => document.querySelector(selector), // 搜索元素
}
```

## 比对属性方法

```js
export const patchProp = (el, key, prevValue, nextValue) => {
  if (key === 'class') {
    patchClass(el, nextValue)
  } else if (key === 'style') {
    patchStyle(el, prevValue, nextValue)
  } else if (/^on[^a-z]/.test(key)) {
    patchEvent(el, key, nextValue)
  } else {
    patchAttr(el, key, nextValue)
  }
}
```

## 操作类名

```js
function patchClass(el, value) {
  // 根据最新值设置类名
  if (value == null) {
    el.removeAttribute('class')
  } else {
    el.className = value
  }
}
```

## 操作样式

```js
export function patchStyle(el, prev, next) {
  if (next) {
    // 更新style
    const style = el.style
    for (const key in next) {
      // 用最新的直接覆盖
      style[key] = next[key]
    }
    if (prev) {
      for (const key in prev) {
        // 老的有新的没有删除
        if (next[key] == null) {
          style[key] = null
        }
      }
    }
  } else {
    el.removeAttribute('style')
  }
}
```

## 操作事件

```js
function createInvoker(initialValue) {
  const invoker = (e) => invoker.value(e)
  invoker.value = initialValue
  return invoker
}
function patchEvent(el, rawName, nextValue) {
  // 更新事件
  const invokers = el._vei || (el._vei = {})
  const exisitingInvoker = invokers[rawName] // 是否缓存过

  if (nextValue && exisitingInvoker) {
    exisitingInvoker.value = nextValue
  } else {
    const name = rawName.slice(2).toLowerCase() // 转化事件是小写的
    if (nextValue) {
      // 缓存函数
      const invoker = (invokers[rawName] = createInvoker(nextValue))
      el.addEventListener(name, invoker)
    } else if (exisitingInvoker) {
      el.removeEventListener(name, exisitingInvoker)
      invokers[rawName] = undefined
    }
  }
}
```

> 在绑定事件的时候，绑定一个伪造的事件处理函数 invoker，把真正的事件处理函数设置为 invoker.value 属性的值

## 操作属性

```js
function patchAttr(el, key, value) {
  // 更新属性
  if (value == null) {
    el.removeAttribute(key)
  } else {
    el.setAttribute(key, value)
  }
}
```

## 创建渲染器

> 最终我们在 index.js 中引入写好的方法，渲染选项就准备好了。 稍后将虚拟 DOM 转化成真实 DOM 会调用这些方法

```js
import { nodeOps } from './nodeOps'
import { patchProp } from './patchProp'

// 准备好所有渲染时所需要的的属性
const renderOptions = Object.assign({ patchProp }, nodeOps)
createRenderer(renderOptions).render(
  h('h1', 'wjh'),
  document.getElementById('app')
)
```

> createRenderer 接受渲染所需的方法，h 方法为创建虚拟节点的方法。这两个方法和平台无关，所以我们将这两个方法在 runtime-core 中实现。

## 创建 runtime-core 包

runtime-core 不关心运行平台。

runtime-core/package.json

```json
{
  "name": "@vue/runtime-core",
  "module": "dist/runtime-core.esm-bundler.js",
  "types": "dist/runtime-core.d.ts",
  "files": ["index.js", "dist"],
  "buildOptions": {
    "name": "VueRuntimeCore",
    "formats": ["esm-bundler", "cjs"]
  }
}
```

> `runtime-core`中需要依赖 `@vue/shared` 及 `@vue/reactivity`

```sh
pnpm install @vue/shared@workspace @vue/reactivity@workspace --filter @vue/runtime-core
```

最后我们将开发环境下的打包入口改为 runtime-dom

## 虚拟节点的实现

通过组合可以描述虚拟节点的类型

```js
export const enum ShapeFlags { // vue3提供的形状标识
    ELEMENT = 1,
    FUNCTIONAL_COMPONENT = 1 << 1,
    STATEFUL_COMPONENT = 1 << 2,
    TEXT_CHILDREN = 1 << 3,
    ARRAY_CHILDREN = 1 << 4,
    SLOTS_CHILDREN = 1 << 5,
    TELEPORT = 1 << 6,
    SUSPENSE = 1 << 7,
    COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
    COMPONENT_KEPT_ALIVE = 1 << 9,
    COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT
}
```

### createVNode 实现

```js
export function isVNode(value: any) {
  return value ? value.__v_isVNode === true : false
}
export const createVNode = (type, props, children = null) => {
  const shapeFlag = isString(type) ? ShapeFlags.ELEMENT : 0
  const vnode = {
    __v_isVNode: true,
    type,
    props,
    key: props && props['key'],
    el: null,
    children,
    shapeFlag,
  }
  if (children) {
    let type = 0
    if (Array.isArray(children)) {
      type = ShapeFlags.ARRAY_CHILDREN
    } else {
      children = String(children)
      type = ShapeFlags.TEXT_CHILDREN
    }
    vnode.shapeFlag |= type
    // 如果shapeFlag为9 说明元素中包含一个文本
    // 如果shapeFlag为17 说明元素中有多个子节点
  }
  return vnode
}
```

> `createVNode`的写法比较死板，我们让他变的更灵活些

### h 实现

```js
export function h(type, propsOrChildren?, children?) {
  const l = arguments.length
  if (l === 2) {
    // 只有属性，或者一个元素儿子的时候
    if (isObject(propsOrChildren) && !Array.isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        // h('div',h('span'))
        return createVNode(type, null, [propsOrChildren])
      }
      return createVNode(type, propsOrChildren) // h('div',{style:{color:'red'}});
    } else {
      // 传递儿子列表的情况
      return createVNode(type, null, propsOrChildren) // h('div',null,[h('span'),h('span')])
    }
  } else {
    if (l > 3) {
      // 超过3个除了前两个都是儿子
      children = Array.prototype.slice.call(arguments, 2)
    } else if (l === 3 && isVNode(children)) {
      children = [children] // 儿子是元素将其包装成 h('div',null,[h('span')])
    }
    return createVNode(type, propsOrChildren, children) // h('div',null,'jw')
  }
}
// 注意子节点是：数组、文本、null
```

### createRenderer 实现

render 方法就是采用 runtime-dom 中提供的方法将虚拟节点转化成对应平台的真实节点渲染到指定容器中。

```js
export function createRenderer(options) {
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
  } = options
  const patch = (n1, n2, container) => {
    // 初始化和diff算法都在这里喲
  }
  const render = (vnode, container) => {
    if (vnode == null) {
      if (container._vnode) {
      } // 卸载
    } else {
      patch(container._vnode || null, vnode, container) // 初始化和更新
    }
    container._vnode = vnode
  }
  return {
    render,
  }
}
```

## 创建真实 DOM

```js
const mountChildren = (children, container) => {
  for (let i = 0; i < children.length; i++) {
    patch(null, children[i], container)
  }
}
const mountElement = (vnode, container) => {
  const { type, props, shapeFlag } = vnode
  let el = (vnode.el = hostCreateElement(type)) // 创建真实元素，挂载到虚拟节点上
  if (props) {
    // 处理属性
    for (const key in props) {
      // 更新元素属性
      hostPatchProp(el, key, null, props[key])
    }
  }
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    // 文本
    hostSetElementText(el, vnode.children)
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    // 多个儿子
    mountChildren(vnode.children, el)
  }
  hostInsert(el, container) // 插入到容器中
}
const patch = (n1, n2, container) => {
  // 初始化和diff算法都在这里喲
  if (n1 == n2) {
    return
  }
  if (n1 == null) {
    // 初始化的情况
    mountElement(n2, container)
  } else {
    // diff算法
  }
}
```

## 卸载 DOM

```js
createRenderer(renderOptions).render(null, document.getElementById('app'))
```

```js
const unmount = (vnode) => {
  hostRemove(vnode.el)
}
const render = (vnode, container) => {
  if (vnode == null) {
    if (container._vnode) {
      // 卸载
      unmount(container._vnode) // 找到对应的真实节点将其卸载
    }
  } else {
    patch(container._vnode || null, vnode, container) // 初始化和更新
  }
  container._vnode = vnode
}
```
