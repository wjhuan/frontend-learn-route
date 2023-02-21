---
title: 组件渲染原理
---

# 组件渲染原理

## text、Fragment 渲染

> 除了元素虚拟节点之外，Vue3 中还有很多其他类型的虚拟节点，这里我们先来说下 Text 和 Fragment 的实现

```js
export const Text = Symbol('Text')
export const Fragment = Symbol('Fragment')
```

## 文本类型

```js
renderer.render(h(Text, 'jw handsome'), document.getElementById('app'))
```

```js
const patch = (n1, n2, container, anchor?) => {
  // 初始化和diff算法都在这里喲
  if (n1 == n2) {
    return
  }
  if (n1 && !isSameVNodeType(n1, n2)) {
    // 有n1 是n1和n2不是同一个节点
    unmount(n1)
    n1 = null
  }
  const { type, shapeFlag } = n2
  switch (type) {
    case Text:
      processText(n1, n2, container) // 处理文本
      break
    case Fragment:
      processFragment(n1, n2, container) // 处理fragment
      break
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(n1, n2, container, anchor) // 之前处理元素的逻辑
      }
  }
}
```

```js
const processText = (n1, n2, container) => {
  if (n1 == null) {
    hostInsert((n2.el = hostCreateText(n2.children)), container)
  } else {
    const el = (n2.el = n1.el)
    if (n2.children !== n1.children) {
      hostSetText(el, n2.children)
    }
  }
}
```

## Fragment 类型

```js
renderer.render(
  h(Fragment, [h(Text, 'hello'), h(Text, 'jw')]),
  document.getElementById('app')
)
```

```js
const processFragment = (n1, n2, container) => {
  if (n1 == null) {
    mountChildren(n2.children, container)
  } else {
    patchChildren(n1, n2, container)
  }
}
```

> 为了让 Vue3 支持多根节点模板，Vue.js 提供 Fragment 来实现，核心就是一个无意义的标签包裹多个节点。

同时这里要处理下卸载的逻辑，如果是 fragment 则删除子元素

```js
const unmount = (vnode) => {
  if (vnode.type === Fragment) {
    return unmountChildren(vnode.children)
  }
  hostRemove(vnode.el)
}
```

## 组件的挂载流程

> 组件需要提供一个 render 函数，渲染函数需要返回虚拟 DOM

```js
const VueComponent = {
  data() {
    return { age: 13 }
  },
  render() {
    return h('p', [h(Text, "I'm Jiang sir"), h('span', this.age + '')])
  },
}
createRenderer(renderOptions).render(
  h(VueComponent),
  document.getElementById('app')
)
```

### 添加组件类型

h 方法中传入一个对象说明要渲染的是一个组件。（后续还有其他可能）

```js
export const createVNode = (type, props, children = null) => {
  const shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT
    : isObject(type)
    ? ShapeFlags.STATEFUL_COMPONENT
    : 0
  // ... 稍后可以根据类型来进行组件的挂载
}
```

### 组件的渲染

```js
const patch = (n1, n2, container, anchor?) => {
  // 初始化和diff算法都在这里喲
  if (n1 == n2) {
    return
  }
  if (n1 && !isSameVNodeType(n1, n2)) {
    // 有n1 是n1和n2不是同一个节点
    unmount(n1)
    n1 = null
  }
  const { type, shapeFlag } = n2
  switch (type) {
    // ...
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(n1, n2, container, anchor)
      } else if (shapeFlag & ShapeFlags.COMPONENT) {
        processComponent(n1, n2, container, anchor)
      }
  }
}
```

```js
const mountComponent = (n2, container, anchor) => {
  const { render, data = () => ({}) } = n2.type
  const state = reactive(data())
  const instance = {
    state, // 组件的状态
    isMounted: false, // 组件是否挂载
    subTree: null, // 子树
    update: null,
    vnode: n2,
  }
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      const subTree = render.call(state, state)
      patch(null, subTree, container, anchor)
      instance.subTree = subTree
      instance.isMounted = true
    } else {
      const subTree = render.call(state, state)
      patch(instance.subTree, subTree, container, anchor)
      instance.subTree = subTree
    }
  }
  const effect = new ReactiveEffect(componentUpdateFn)
  const update = (instance.update = effect.run.bind(effect))
  update()
}
const processComponent = (n1, n2, container, anchor) => {
  if (n1 == null) {
    mountComponent(n2, container, anchor)
  } else {
    // 组件更新逻辑
  }
}
```

## 组件异步渲染

修改调度方法，将更新方法压入到队列中

```js
const effect = new ReactiveEffect(componentUpdateFn, () =>
  queueJob(instance.update)
)
const update = (instance.update = effect.run.bind(effect))
```

批处理操作`scheduler.js`

```js
const queue = []
let isFlushing = false
const resolvedPromise = Promise.resolve()
export function queueJob(job) {
  if (!queue.includes(job)) {
    queue.push(job)
  }
  if (!isFlushing) {
    isFlushing = true
    resolvedPromise.then(() => {
      isFlushing = false
      for (let i = 0; i < queue.length; i++) {
        let job = queue[i]
        job()
      }
      queue.length = 0
    })
  }
}
```

## 组件 Props、Attrs 实现

`Props`和`Attrs`关系是：没有定义在`component.props`中的属性将存储到`attrs`对象中

```js
const VueComponent = {
  data() {
    return { age: 13 }
  },
  props: {
    address: String,
  },
  render() {
    return h('p', [
      h(Text, "I'm Jiang sir"),
      h('span', this.age),
      h('span', this.address),
      h(Text, this.$attrs.a + this.$attrs.b),
    ])
  },
}
createRenderer(renderOptions).render(
  h(VueComponent, { address: '天龙苑', a: 1, b: 2 }),
  document.getElementById('app')
)
```

### initProps

```js
function initProps(instance, propsOptions, propsData) {
  const props = {}
  const attrs = {}
  for (const key in propsData) {
    if (key in propsOptions) {
      // 如果组件中声明了
      props[key] = propsData[key]
    } else {
      attrs[key] = propsData[key]
    }
  }
  instance.props = reactive(props)
  instance.attrs = attrs
}
const mountComponent = (n2, container, anchor) => {
  const { render, data = () => ({}), props: propsOptions = {} } = n2.type
  const state = reactive(data())
  const instance = {
    state, // 组件的状态
    isMounted: false, // 组件是否挂载
    subTree: null, // 子树
    update: null,
    vnode: n2,
    attrs: {},
    props: {},
  }
  n2.component = instance // 用于更新
  //               用户写的props 及 传入的props
  initProps(instance, propsOptions, n2.props) // 初始化属性
}
```

### 属性代理

```js
const publicPropertiesMap = {
  $attrs: (i) => i.attrs,
}
const renderContext = new Proxy(instance, {
  get(target, key) {
    const { state, props } = target
    if (state && hasOwn(state, key)) {
      return state[key]
    } else if (hasOwn(props, key)) {
      return props[key]
    }
    const publicGetter = publicPropertiesMap[key]
    if (publicGetter) {
      return publicGetter(instance)
    }
  },
  set(target, key, value) {
    const { state, props } = target
    if (state && hasOwn(state, key)) {
      state[key] = value
      return true
    } else if (hasOwn(props, key)) {
      console.warn(`Attempting to mutate prop "${key}". Props are readonly.`)
      return false
    }
    return true
  },
})
```

### 属性更新

```js
const My = {
  props: { address: String },
  render() {
    return h('div', this.address)
  },
}
const VueComponent = {
  data() {
    return { flag: true }
  },
  props: { address: String },
  render() {
    setTimeout(() => {
      this.flag = false
    }, 1000)
    return h(My, { address: this.flag ? '天龙苑' : '回龙观' })
  },
}
createRenderer(renderOptions).render(
  h(VueComponent),
  document.getElementById('app')
)
```

```js
const updateComponent = (n1, n2) => {
  const instance = (n2.component = n1.component)
  const { props: prevProps } = n1
  const { props: nextProps } = n2
  if (hasPropsChanged(prevProps, nextProps)) {
    // 比较前后属性是否一致
    for (const key in nextProps) {
      // 循环props
      instance.props[key] = nextProps[key] // 响应式属性更新后会重新渲染
    }
    for (const key in instance.props) {
      // 循环props
      if (!(key in nextProps)) {
        delete instance.props[key]
      }
    }
  }
}
const processComponent = (n1, n2, container, anchor) => {
  if (n1 == null) {
    mountComponent(n2, container, anchor)
  } else {
    // 组件更新逻辑
    updateComponent(n1, n2)
  }
}
```

> 这里我们将更新逻辑放到 componentFn 中

```js
const updateComponent = (n1, n2) => {
  const instance = (n2.component = n1.component)
  const { props: prevProps } = n1
  const { props: nextProps } = n2
  if (hasPropsChanged(prevProps, nextProps)) {
    instance.next = n2 // 将新的虚拟节点放到next属性上
    instance.update() // 属性变化手动调用更新方法
  }
}
```

```js
const updateComponentPreRender = (instance, next) => {
  instance.next = null
  instance.vnode = next
  for (const key in next.props) {
    // 循环props
    instance.props[key] = next.props[key]
  }
  for (const key in instance.props) {
    // 循环props
    if (!(key in next.props)) {
      delete instance.props[key]
    }
  }
}
const componentUpdateFn = () => {
  if (!instance.isMounted) {
    // ...
  } else {
    let { next } = instance
    if (next) {
      // 更新组件在渲染前更新
      updateComponentPreRender(instance, next)
    }
    const subTree = render.call(renderContext, renderContext)
    patch(instance.subTree, subTree, container, anchor)
    instance.subTree = subTree
  }
}
```

## setup 函数作用

组件的 render 函数每次更新时都会重新执行,但是 setup 函数只会在组件挂载时执行一次。

- setup 函数是 compositionAPI 的入口
- 可以在函数内部编写逻辑，解决 vue2 中反复横跳问题
- setup 返回函数时为组件的 render 函数,返回对象时对象中的数据将暴露给模板使用
- setup 中函数的参数为 props、context({slots,emit,attrs,expose})

```js
const mountComponent = (n2, container, anchor) => {
  let { render, data = () => ({}), props: propsOptions = {}, setup } = n2.type
  const state = reactive(data())
  const instance = {
    state, // 组件的状态
    isMounted: false, // 组件是否挂载
    subTree: null, // 子树
    update: null,
    attrs: {},
    props: {},
    next: null,
    setupState: null,
    vnode: n2,
  }
  n2.component = instance
  // 用户写的props 及 传入的props
  initProps(instance, propsOptions, n2.props) // 初始化属性

  if (setup) {
    // 对setup做相应处理
    const setupContext = {}
    const setupResult = setup(instance.props, setupContext)
    if (isFunction(setupResult)) {
      render = setupResult
    } else if (isObject(setupResult)) {
      instance.setupState = proxyRefs(setupResult)
    }
  }
  const renderContext = new Proxy(instance, {
    get(target, key) {
      const { state, props, setupState } = target
      if (state && hasOwn(state, key)) {
        return state[key]
      } else if (hasOwn(props, key)) {
        return props[key]
      } else if (setupState && hasOwn(setupState, key)) {
        // setup返回值做代理
        return setupState[key]
      }
      const publicGetter = publicPropertiesMap[key]
      if (publicGetter) {
        return publicGetter(instance)
      }
    },
    set(target, key, value) {
      const { state, props } = target
      if (state && hasOwn(state, key)) {
        state[key] = value
        return true
      } else if (hasOwn(props, key)) {
        console.warn(`Attempting to mutate prop "${key}". Props are readonly.`)
        return false
      }
      return true
    },
  })
}
```

### 实现 emit 方法

```js
const VueComponent = {
  setup(props, ctx) {
    const handleClick = () => {
      ctx.emit('myEvent')
    }
    return () => h('button', { onClick: handleClick }, '点我啊')
  },
}
const app = createApp(
  h(VueComponent, {
    onMyEvent: () => {
      alert(1000)
    },
  })
)
app.mount(document.getElementById('app'))
```

```js
const setupContext = {
  attrs: instance.attrs,
  emit: (event, ...args) => {
    const eventName = `on${event[0].toUpperCase() + event.slice(1)}`
    const handler = instance.vnode.props[eventName] // 找到绑定的方法
    // 触发方法执行
    handler && handler(...args)
  },
}
```

### slot 实现

```js
const MyComponent = {
  render() {
    return h(Fragment, [
      h('div', [this.$slots.header()]), // 获取插槽渲染
      h('div', [this.$slots.body()]),
      h('div', [this.$slots.footer()]),
    ])
  },
}
const VueComponent = {
  setup() {
    return () =>
      h(MyComponent, {
        // 渲染组件时传递对应的插槽属性
        header: () => h('p', '头'),
        body: () => h('p', '体'),
        footer: () => h('p', '尾'),
      })
  },
}
```

```js
export const createVNode = (type, props, children = null) => {
  // ....
  if (children) {
    let type = 0
    if (Array.isArray(children)) {
      type = ShapeFlags.ARRAY_CHILDREN
    } else if (isObject(children)) {
      // 类型是插槽
      type = ShapeFlags.SLOTS_CHILDREN
    } else {
      children = String(children)
      type = ShapeFlags.TEXT_CHILDREN
    }
    vnode.shapeFlag |= type
  }
  return vnode
}
```

```js
const publicPropertiesMap = {
  $attrs: (i) => i.attrs,
  $slots: (i) => i.slots,
}
function initSlots(instance, children) {
  if (instance.vnode.shapeFlag & ShapeFlags.SLOTS_CHILDREN) {
    instance.slots = children
  } else {
    instance.slots = {}
  }
}
const mountComponent = (n2, container, anchor) => {
  const instance = {
    // ...
    slots: null,
  }
  // ...
  initProps(instance, propsOptions, n2.props)
  initSlots(instance, n2.children) // 初始化插槽

  if (setup) {
    // 对setup做相应处理
    const setupContext = {
      // ...
      slots: instance.slots, // 挂载插槽
    }
  }
}
```

### 生命周期实现原理

```js
export let currentInstance = null
export function setCurrentInstance(instance) {
  currentInstance = instance // 用于记住当前实例
}
```

```js
setCurrentInstance(instance) // 在调用setup的时候保存当前实例
const setupResult = setup(instance.props, setupContext)
setCurrentInstance(null)
```

### 创建生命周期钩子

```js
export const enum LifecycleHooks {
    BEFORE_MOUNT = 'bm',
    MOUNTED = 'm',
    BEFORE_UPDATE = 'bu',
    UPDATED = 'u'
}
function createHook(type){
    return (hook,target = currentInstance) =>{ // 调用的时候保存当前实例
        if(target){
            const hooks = target[type] || (target[type] = []);
            const wrappedHook = () =>{
                setCurrentInstance(target); // 当生命周期调用时 保证currentInstance是正确的
                hook.call(target);
                setCurrentInstance(null);
            }
            hooks.push(wrappedHook);
        }
    }
}
export const onBeforeMount = createHook(LifecycleHooks.BEFORE_MOUNT);
export const onMounted = createHook(LifecycleHooks.MOUNTED);
export const onBeforeUpdate = createHook(LifecycleHooks.BEFORE_UPDATE);
export const onUpdated = createHook(LifecycleHooks.UPDATED);
```

### 钩子调用

```js
const componentUpdateFn = () => {
  if (!instance.isMounted) {
    const { bm, m } = instance
    if (bm) {
      // beforeMount
      invokeArrayFns(bm)
    }
    const subTree = render.call(renderContext, renderContext)
    patch(null, subTree, container, anchor)
    if (m) {
      // mounted
      invokeArrayFns(m)
    }
    instance.subTree = subTree
    instance.isMounted = true
  } else {
    let { next, bu, u } = instance
    if (next) {
      updateComponentPreRender(instance, next)
    }
    if (bu) {
      // beforeUpdate
      invokeArrayFns(bu)
    }
    const subTree = render.call(renderContext, renderContext)
    patch(instance.subTree, subTree, container, anchor)
    if (u) {
      // updated
      invokeArrayFns(u)
    }
    instance.subTree = subTree
  }
}
```

```js
export const invokeArrayFns = (fns) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i]() // 调用钩子方法
  }
}
```

## 异步组件实现原理

### 基本实现

```js
let asyncComponent = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        render: () => h('div', 'hi jiang'),
      })
    }, 1000)
  })
})
```

```js
export function defineAsyncComponent(loader) {
  let Comp = null
  return {
    setup() {
      const loaded = ref(false)
      loader().then((c) => {
        Comp = c
        loaded.value = true
      })
      return () => {
        return loaded.value ? h(Comp) : h(Fragment, '')
      }
    },
  }
}
```

### 异步组件超时处理

```js
let asyncComponent = defineAsyncComponent({
  loader: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          render() {
            return h('div', 'hi jiang')
          },
        })
      }, 1000)
    })
  },
  timeout: 2000,
  errorComponent: {
    render: () => h('Text', '超时错误'),
  },
})
```

```js
export function defineAsyncComponent(options) {
  if (typeof options === 'function') {
    options = { loader: options }
  }
  let Comp = null
  return {
    setup() {
      const { loader } = options
      const loaded = ref(false)
      const error = ref(false) // 是否超时
      loader()
        .then((c) => {
          Comp = c
          loaded.value = true
        })
        .catch((err) => (error.value = err))
      if (options.timeout) {
        setTimeout(() => {
          error.value = true // 显示错误组件
        }, options.timeout)
      }
      const placeHolder = h(Fragment, '')
      return () => {
        if (loaded.value) {
          return h(Comp)
        } else if (error.value && options.errorComponent) {
          // 超时显示错误组件
          return h(options.errorComponent)
        }
        return placeHolder
      }
    },
  }
}
```

组件卸载的时候需要稍作处理

```js
const unmount = (vnode) => {
  const { shapeFlag } = vnode
  if (vnode.type === Fragment) {
    return unmountChildren(vnode.children)
  } else if (shapeFlag & ShapeFlags.COMPONENT) {
    // 组件那么移除
    return unmount(vnode.component.subTree) // 移除组件
  }
  hostRemove(vnode.el)
}
```

### 异步组件 loading 处理

```js
let asyncComponent = defineAsyncComponent({
  loader: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          render() {
            return h('div', 'hi jiang')
          },
        })
      }, 3000)
    })
  },
  timeout: 2000,
  errorComponent: {
    render: () => h('Text', '超时错误'),
  },
  delay: 1000,
  loadingComponent: {
    render: () => h('h2', 'loading....'),
  },
})
```

```js
// loading逻辑
const loading = ref(false)
let loadingTimer = null
if (options.delay) {
  loadingTimer = setTimeout(() => {
    loading.value = true
  }, options.delay)
} else {
  loading.value = true
}
const error = ref(false)
loader()
  .then((c) => {
    Comp = c
    loaded.value = true
  })
  .catch((err) => (error.value = err))
  .finally(() => {
    loading.value = false
    clearTimeout(loadingTimer) // 加载完毕的时候清理定时器
  })
// ...
return () => {
  if (loaded.value) {
    return h(Comp)
  } else if (error.value && options.errorComponent) {
    return h(options.errorComponent)
  } else if (loading.value && options.loadingComponent) {
    // 显示loading组件
    return h(options.loadingComponent)
  }
  return placeHolder
}
```

### 异步组件加载重试处理

```js
let asyncComponent = defineAsyncComponent({
  loader: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject({
          render() {
            return h('div', 'hi jiang')
          },
        })
      }, 3000)
    })
  },
  timeout: 2000,
  errorComponent: {
    render: () => h('Text', '超时错误'),
  },
  delay: 1000,
  loadingComponent: {
    render: () => h('h2', 'loading....'),
  },
  onError(retry) {
    console.log('错了')
    retry()
  },
})
```

```js
function load() {
  return loader().catch((err) => {
    if (options.onError) {
      return new Promise((resolve, reject) => {
        const retry = () => resolve(load())
        const fail = () => reject(err)
        options.onError(retry, fail)
      })
    } else {
      throw err
    }
  })
}
```

## 函数式组件实现原理

函数式组件本质就是一个函数，函数的返回值就是虚拟 DOM。 在 Vue 3 中，所有的函数式组件都是用普通函数创建的。换句话说，不需要定义 { functional: true } 组件选项。

```js
export const createVNode = (type, props, children = null) => {
  const shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT
    : isObject(type)
    ? ShapeFlags.STATEFUL_COMPONENT
    : isFunction(type)
    ? ShapeFlags.FUNCTIONAL_COMPONENT
    : 0
  // 创建虚拟节点是
}
```

```js
function initProps(instance, propsOptions, propsData) {
  // ... 属性初始化的时候如果是函数式组件则 attrs就是函数式组件的props
  if (instance.vnode.shapeFlag & ShapeFlags.FUNCTIONAL_COMPONENT) {
    instance.props = attrs
  }
}
```

> 产生 subTree 时, 要根据类型做不同的处理

```js
export function renderComponentRoot(instance) {
  let { render, proxy, vnode, props } = instance
  if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    return render.call(proxy, proxy)
  } else {
    return vnode.type(props) // 函数式组件直接调用即可
  }
}
const subTree = renderComponentRoot(instance)
```

## Teleport 实现原理

Vue3 新增组件，该组件可以将制定内容渲染到制定容器中。默认内容都是渲染到元素 app 内，我们可以将其渲染到任意节点 （传送门）

```js
const shapeFlag = isString(type)
  ? ShapeFlags.ELEMENT
  : isTeleport(type) // 如果是穿梭框
  ? ShapeFlags.TELEPORT
  : isObject(type)
  ? ShapeFlags.STATEFUL_COMPONENT
  : isFunction(type)
  ? ShapeFlags.FUNCTIONAL_COMPONENT
  : 0 // 函数式组件
```

> 创建虚拟节点的时候标识组件类型

### 组件挂载

```js
if (shapeFlag & ShapeFlags.TELEPORT) {
  type.process(n1, n2, container, anchor, {
    mountChildren, // 挂载孩子
    patchChildren, // 更新孩子
    move(vnode, container) {
      // 移动元素
      hostInsert(
        vnode.component ? vnode.component.subTree.el : vnode.el,
        container
      )
    },
  })
}
```

```js
export const TeleportImpl = {
  __isTeleport: true,
  process(n1, n2, container, anchor, internals) {
    let { mountChildren, patchChildren, move } = internals
    if (!n1) {
      // 创建一个目标
      const target = (n2.target = document.querySelector(n2.props.to))
      if (target) {
        mountChildren(n2.children, target, anchor)
      }
    } else {
      patchChildren(n1, n2, container) // 比对儿子
      if (n2.props.to !== n1.props.to) {
        // 更新并且移动位置
        // 获取下一个元素
        const nextTarget = document.querySelector(n2.props.to)
        n2.children.forEach((child) => move(child, nextTarget))
      }
    }
  },
}
export const isTeleport = (type) => type.__isTeleport
```
