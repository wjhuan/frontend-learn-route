---
title: Vue3响应式原理
---

# Vue3 响应式原理

## Vue3 对比 Vue2 的变化

- 在`Vue2`的时候使用`defineProperty`来进行数据的劫持, 需要对属性进行重写添加`getter`及`setter` 性能差。
- 当新增属性和删除属性时无法监控变化。需要通过`$set`、`$delete`实现
- 数组不采用`defineProperty`来进行劫持 （浪费性能，对所有索引进行劫持会造成性能浪费）需要对数组单独进行处理

> Vue3 中使用 Proxy 来实现响应式数据变化。从而解决了上述问题。

## CompositionAPI

- 在 Vue2 中采用的是 OptionsAPI, 用户提供的 data,props,methods,computed,watch 等属性 (用户编写复杂业务逻辑会出现反复横跳问题)
- Vue2 中所有的属性都是通过 this 访问，this 存在指向明确问题
- Vue2 中很多未使用方法或属性依旧会被打包，并且所有全局 API 都在 Vue 对象上公开。Composition API 对 tree-shaking 更加友好，代码也更容易压缩。
- 组件逻辑共享问题， Vue2 采用 mixins 实现组件之间的逻辑共享； 但是会有数据来源不明确，命名冲突等问题。 Vue3 采用 CompositionAPI 提取公共逻辑非常方便

> 简单的组件仍然可以采用 OptionsAPI 进行编写，compositionAPI 在复杂的逻辑中有着明显的优势~。 reactivity 模块中就包含了很多我们经常使用到的 API 例如：computed、reactive、ref、effect 等

## Reactivity 模块基本使用

```html
<div id="app"></div>
<script src="./reactivity.global.js"></script>
<script>
  const { reactive, effect, shallowReactive, shallowReadonly, readonly } =
    VueReactivity
  // let state = reactive({ name: 'jw', age: 30 });
  // const state = shallowReactive({ name: 'jw', age: 30 })
  // const state = readonly({ name: 'jw', age: 30 })
  const state = reactive({ name: 'jw', age: 30 })
  effect(() => {
    // 副作用函数 (effect执行渲染了页面)
    app.innerHTML = state.name + '今年' + state.age + '岁了'
  })
  setTimeout(() => {
    state.age++
  }, 1000)
</script>
```

> reactive 方法会将对象变成 proxy 对象， effect 中使用 reactive 对象时会进行依赖收集，稍后属性变化时会重新执行 effect 函数~。

## 编写 reactive 函数

```js
import { isObject } from '@vue/shared'
function createReactiveObject(target: object, isReadonly: boolean) {
  if (!isObject(target)) {
    return target
  }
}
// 常用的就是reactive方法
export function reactive(target: object) {
  return createReactiveObject(target, false)
}
// 后面的方法，不是重点我们先不进行实现...
/*
export function shallowReactive(target: object) {
    return createReactiveObject(target, false)
}
export function readonly(target: object) {
    return createReactiveObject(target, true)
}
export function shallowReadonly(target: object) {
    return createReactiveObject(target, true)
}
*/
```

```js
export function isObject(value: unknown) : value is Record<any,any> {
    return typeof value === 'object' && value !== null
}
```

> 由此可知这些方法接受的参数必须是一个对象类型。否则没有任何效果

```js
const reactiveMap = new WeakMap() // 缓存列表
const mutableHandlers: ProxyHandler<object> = {
  get(target, key, receiver) {
    // 等会谁来取值就做依赖收集
    const res = Reflect.get(target, key, receiver)
    return res
  },
  set(target, key, value, receiver) {
    // 等会赋值的时候可以重新触发effect执行
    const result = Reflect.set(target, key, value, receiver)
    return result
  },
}
function createReactiveObject(target: object, isReadonly: boolean) {
  if (!isObject(target)) {
    return target
  }
  const exisitingProxy = reactiveMap.get(target) // 如果已经代理过则直接返回代理后的对象
  if (exisitingProxy) {
    return exisitingProxy
  }
  const proxy = new Proxy(target, mutableHandlers) // 对对象进行代理
  reactiveMap.set(target, proxy)
  return proxy
}
```

> 这里必须要使用 Reflect 进行操作，保证 this 指向永远指向代理对象

```js
let school = {
  name: 'zf',
  get num() {
    return this.name
  },
}
let p = new Proxy(school, {
  get(target, key, receiver) {
    console.log(key)
    // return Reflect.get(target,key,receiver)
    return target[key]
  },
})
p.num
```

> 将对象使用 proxy 进行代理，如果对象已经被代理过，再次重复代理则返回上次代理结果。 那么，如果将一个代理对象传入呢？

```js
const enum ReactiveFlags {
    IS_REACTIVE = '__v_isReactive'
}
const mutableHandlers: ProxyHandler<object> = {
    get(target, key, receiver) {
        if(key === ReactiveFlags.IS_REACTIVE){ // 在get中增加标识，当获取IS_REACTIVE时返回true
            return true;
        }
    }
}
function createReactiveObject(target: object, isReadonly: boolean) {
    if(target[ReactiveFlags.IS_REACTIVE]){ // 在创建响应式对象时先进行取值，看是否已经是响应式对象
        return target
    }
}
```

> 这样我们防止重复代理就做好了~~~， 其实这里的逻辑相比 Vue2 真的是简单太多了。

## 编写 effect 函数

```js
export let activeEffect = undefined;// 当前正在执行的effect

class ReactiveEffect {
    active = true;
    deps = []; // 收集effect中使用到的属性
    parent = undefined;
    constructor(public fn) { }
    run() {
        if (!this.active) { // 不是激活状态
            return this.fn();
        }
        try {
            this.parent = activeEffect; // 当前的effect就是他的父亲
            activeEffect = this; // 设置成正在激活的是当前effect
            return this.fn();
        } finally {
            activeEffect = this.parent; // 执行完毕后还原activeEffect
            this.parent = undefined;
        }

    }
}
export function effect(fn, options?) {
    const _effect = new ReactiveEffect(fn); // 创建响应式effect
    _effect.run(); // 让响应式effect默认执行
}
```

## 依赖收集

> 默认执行 effect 时会对属性，进行依赖收集

```js
get(target, key, receiver) {
    if (key === ReactiveFlags.IS_REACTIVE) {
        return true;
    }
    const res = Reflect.get(target, key, receiver);
    track(target, 'get', key);  // 依赖收集
    return res;
}
```

```js
const targetMap = new WeakMap() // 记录依赖关系
export function track(target, type, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target) // {对象：map}
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set())) // {对象：{ 属性 :[ dep, dep ]}}
    }
    let shouldTrack = !dep.has(activeEffect)
    if (shouldTrack) {
      dep.add(activeEffect)
      activeEffect.deps.push(dep) // 让effect记住dep，这样后续可以用于清理
    }
  }
}
```

> 将属性和对应的 effect 维护成映射关系，后续属性变化可以触发对应的 effect 函数重新 run

## 触发更新

```js
set(target, key, value, receiver) {
    // 等会赋值的时候可以重新触发effect执行
    let oldValue = target[key]
    const result = Reflect.set(target, key, value, receiver);
    if (oldValue !== value) {
        trigger(target, 'set', key, value, oldValue)
    }
    return result;
}
```

```js
export function trigger(target, type, key?, newValue?, oldValue?) {
  const depsMap = targetMap.get(target) // 获取对应的映射表
  if (!depsMap) {
    return
  }
  const effects = depsMap.get(key)
  effects &&
    effects.forEach((effect) => {
      if (effect !== activeEffect) effect.run() // 防止循环
    })
}
```

## 分支切换与 cleanup

在渲染时我们要避免副作用函数产生的遗留

```js
const state = reactive({ flag: true, name: 'jw', age: 30 })
effect(() => {
  // 副作用函数 (effect执行渲染了页面)
  console.log('render')
  document.body.innerHTML = state.flag ? state.name : state.age
})
setTimeout(() => {
  state.flag = false
  setTimeout(() => {
    console.log('修改name，原则上不更新')
    state.name = 'zf'
  }, 1000)
}, 1000)
```

```js
function cleanupEffect(effect) {
    const { deps } = effect; // 清理effect
    for (let i = 0; i < deps.length; i++) {
        deps[i].delete(effect);
    }
    effect.deps.length = 0;
}
class ReactiveEffect {
    active = true;
    deps = []; // 收集effect中使用到的属性
    parent = undefined;
    constructor(public fn) { }
    run() {
        try {
            this.parent = activeEffect; // 当前的effect就是他的父亲
            activeEffect = this; // 设置成正在激活的是当前effect
+           cleanupEffect(this);
            return this.fn(); // 先清理在运行
        }
    }
}
```

> 这里要注意的是：触发时会进行清理操作（清理 effect），在重新进行收集（收集 effect）。在循环过程中会导致死循环。

```js
let effect = () => {}
let s = new Set([effect])
s.forEach((item) => {
  s.delete(effect)
  s.add(effect)
}) // 这样就导致死循环了
```

## 停止 effect

```js
export class ReactiveEffect {
  stop() {
    if (this.active) {
      cleanupEffect(this)
      this.active = false
    }
  }
}
export function effect(fn, options?) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()

  const runner = _effect.run.bind(_effect)
  runner.effect = _effect
  return runner // 返回runner
}
```

## 调度执行

> trigger 触发时，我们可以自己决定副作用函数执行的时机、次数、及执行方式

```js
export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler) // 创建响应式effect
  // if(options){
  //     Object.assign(_effect,options); // 扩展属性
  // }
  _effect.run() // 让响应式effect默认执行
  const runner = _effect.run.bind(_effect)
  runner.effect = _effect
  return runner // 返回runner
}

export function trigger(target, type, key?, newValue?, oldValue?) {
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  let effects = depsMap.get(key)
  if (effects) {
    effects = new Set(effects)
    for (const effect of effects) {
      if (effect !== activeEffect) {
        if (effect.scheduler) {
          // 如果有调度函数则执行调度函数
          effect.scheduler()
        } else {
          effect.run()
        }
      }
    }
  }
}
```

## 深度代理

```js
 get(target, key, receiver) {
    if (key === ReactiveFlags.IS_REACTIVE) {
        return true;
    }
    // 等会谁来取值就做依赖收集
    const res = Reflect.get(target, key, receiver);
    track(target, 'get', key);

    if(isObject(res)){
        return reactive(res);
    }
    return res;
}
```

> 当取值时返回的值是对象，则返回这个对象的代理对象，从而实现深度代理
