---
title: computed&watch
---

# computed&watch

## computed 实现原理

接受一个 getter 函数，并根据 getter 的返回值返回一个不可变的响应式 ref 对象。

```js
import { isFunction } from "@vue/shared";
import { activeEffect, ReactiveEffect, trackEffects, triggerEffects } from "./effect";

class ComputedRefImpl {
    public effect;
    public _value;
    public dep;
    public _dirty = true;
    constructor(getter,public setter) {
        this.effect = new ReactiveEffect(getter,()=>{
            if(!this._dirty){ // 依赖的值变化更新dirty并触发更新
                this._dirty = true;
                triggerEffects(this.dep)
            }
        });
    }
    get value(){ // 取值的时候进行依赖收集
        if(activeEffect){
            trackEffects(this.dep || (this.dep = new Set));
        }
        if(this._dirty){ // 如果是脏值, 执行函数
            this._dirty = false;
            this._value = this.effect.run();
        }
        return this._value;
    }
    set value(newValue){
        this.setter(newValue)
    }
}
export function computed(getterOrOptions) {
    const onlyGetter = isFunction(getterOrOptions); // 传入的是函数就是getter
    let getter;
    let setter;
    if (onlyGetter) {
        getter = getterOrOptions;
        setter = () => { }
    } else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    // 创建计算属性
    return new ComputedRefImpl(getter, setter)
}
```

> 创建 ReactiveEffect 时，传入 scheduler 函数，稍后依赖的属性变化时调用此方法！

```js
export function triggerEffects(effects) {
  effects = new Set(effects)
  for (const effect of effects) {
    if (effect !== activeEffect) {
      // 如果effect不是当前正在运行的effect
      if (effect.scheduler) {
        effect.scheduler()
      } else {
        effect.run() // 重新执行一遍
      }
    }
  }
}
export function trackEffects(dep) {
  // 收集dep 对应的effect
  let shouldTrack = !dep.has(activeEffect)
  if (shouldTrack) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}
```

## WatchAPI 实现原理

watch 的核心就是观测一个响应式数据，当数据变化时通知并执行回调 （那也就是说它本身就是一个 effect）

```js
watch(state, (oldValue, newValue) => {
  // 监测一个响应式值的变化
  console.log(oldValue, newValue)
})
```

## 监测响应式对象

```js
function traverse(value, seen = new Set()) {
  if (!isObject(value)) {
    return value
  }
  if (seen.has(value)) {
    return value
  }
  seen.add(value)
  for (const k in value) {
    // 递归访问属性用于依赖收集
    traverse(value[k], seen)
  }
  return value
}
export function isReactive(value) {
  return !!(value && value[ReactiveFlags.IS_REACTIVE])
}
export function watch(source, cb) {
  let getter
  if (isReactive(source)) {
    // 如果是响应式对象
    getter = () => traverse(source) // 包装成effect对应的fn, 函数内部进行遍历达到依赖收集的目的
  }
  let oldValue
  const job = () => {
    const newValue = effect.run() // 值变化时再次运行effect函数,获取新值
    cb(newValue, oldValue)
    oldValue = newValue
  }
  const effect = new ReactiveEffect(getter, job) // 创建effect
  oldValue = effect.run() // 运行保存老值
}
```

## 监测函数

```js
export function watch(source, cb) {
  let getter
  if (isReactive(source)) {
    // 如果是响应式对象
    getter = () => traverse(source)
  } else if (isFunction(source)) {
    getter = source // 如果是函数则让函数作为fn即可
  }
  // ...
}
```

## watch 中回调执行时机

```js
export function watch(source,cb,{immediate} = {} as any){
	const effect = new ReactiveEffect(getter,job) // 创建effect
    if(immediate){ // 需要立即执行，则立刻执行任务
        job();
    }
    oldValue = effect.run();
}
```

## watch 中 cleanup 实现

> 连续触发 watch 时需要清理之前的 watch 操作

```js
const state = reactive({ flag: true, name: 'jw', age: 30 })
let i = 2000
function getData(timer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(timer)
    }, timer)
  })
}
watch(
  () => state.age,
  async (newValue, oldValue, onCleanup) => {
    let clear = false
    onCleanup(() => {
      clear = true
    })
    i -= 1000
    let r = await getData(i) // 第一次执行1s后渲染1000， 第二次执行0s后渲染0， 最终应该是0
    if (!clear) {
      document.body.innerHTML = r
    }
  },
  { flush: 'sync' }
)
state.age = 31
state.age = 32
```

```js
let cleanup
let onCleanup = (fn) => {
  cleanup = fn
}
const job = () => {
  const newValue = effect.run()
  if (cleanup) cleanup() // 下次watch执行前调用上次注册的回调
  cb(newValue, oldValue, onCleanup) // 传入onCleanup函数
  oldValue = newValue
}
```
