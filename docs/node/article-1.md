---
title: 高阶函数
---

# 高阶函数

## 什么是高阶函数

- 一个函数的参数是一个函数，我们就可以称之为高阶函数`（回调函数）`
- 一个函数的返回值是一个函数，我们就可以称之为高阶函数`（不单指闭包）`

比如有一个核心函数，需要对这个函数进行拓展，但是不改变核心函数的代码，这时候就需要用到

```javascript
function coreFn(a, b, c) {
  // 实现了核心逻辑
  console.log('core fn', a, b, c)
}
// 如果希望扩展公共的方法， 通过原型链扩展的属性是公共的
Function.prototype.before = function (beforeFn) {
  // this => coreFn
  return (...args) => {
    // newFn, 箭头函数的特点 没有this 没有arguments ， 没有原型链
    // 把所有的参数收集成一个数组
    beforeFn()
    this(...args) // 展开参数
  }
}
let newFn = coreFn.before(() => {
  console.log('before fn')
})
newFn()
```

## 函数柯里化

- 如果一个函数有多个参数，我们可以根据参数的个数转化成`n`个函数，柯里化我们一般都认为参数是一个一个的传递的
- 偏函数：根据参数的个数分解成函数，每次调用函数的参数个数可以不是一个
- 如果我们想暂存参数，可以考虑使用柯里化
- 柯里化算是一个闭包函数因为需要把参数暂存起来
- 柯里化可以把一个函数变的更具体

实现一个判断数据类型的函数

```javascript
// typeof > Array.isArray > Object.prototype.toString.call > instanceof > constructor

function isType(type, val) {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}

let isString = isType('String', '123')
let isNumber = isType('Number', 123)
let isBoolean = isType('Boolean', true)

console.log(isString)
console.log(isNumber)
console.log(isBoolean)
```

那么每次调用`isType`函数都需要传入两个参数非常麻烦，那么就可以进行函数柯里化让函数变得更具体，如下：

```javascript
function isType(type) {
  return function (val) {
    return Object.prototype.toString.call(val) === `[object ${type}]`
  }
}

let isString = isType('String')
let isNumber = isType('Number')
let isBoolean = isType('Boolean')

console.log(isString('123'))
console.log(isNumber(1))
console.log(isBoolean(true))
```

实现通用的函数柯里化

```javascript
function curring(fn) {
  let args = [] // 这里用来记录参数的个数, 记录每次调用传入的总个数
  const inner = (arr = []) => {
    // 每次调用的个数
    args.push(...arr)
    return args.length >= fn.length ? fn(...args) : (...args) => inner(args) // [2,3]
  }
  return inner()
}

function sum(a, b, c, d) {
  return a + b + c + d
}

// 将sum函数用curring进行柯里化
let fn = curring(sum)
let fn1 = fn(1)
let fn2 = fn1(2, 3)
let result = fn2(4)
console.log(result)

// 将isType函数用curring进行柯里化
function isType(type, val) {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}
let isString = curring(isType)('String')
let isNumber = curring(isType)('Number')
let isBoolean = curring(isType)('Boolean')

console.log(isString(123))
console.log(isNumber(456))
console.log(isBoolean(123))
```

## 发布订阅模式

- 发布订阅模式是基于一个中间调度栈，发布和订阅是解耦的
- 发布订阅模式需要两个方法 `“订阅”` `“发布”`
- 观察者模式是基于发布订阅的，是基于类来实现的

例如读取两个文件，想要在读取完两个文件内容之后去干一些事情，再不考虑`Promise`的情况下应该怎么做？

可以采用发布订阅模式

```javascript
const fs = require('fs')
let event = {
  _arr: [],
  data: {},
  on(fn) {
    this._arr.push(fn)
  },
  emit(key, value) {
    this.data[key] = value
    this._arr.forEach((fn) => fn(this.data))
  },
}
event.on((data) => {
  // 订阅第一次
  console.log('收到了一个数据', data)
})
event.on((data) => {
  // 订阅第二次
  if (Reflect.ownKeys(data).length == 2) {
    console.log('收到了全部数据', data)
  }
})
fs.readFile('./name.txt', 'utf8', function (err, data) {
  event.emit('name', data)
})
fs.readFile('./age.txt', 'utf8', function (err, data) {
  event.emit('age', data)
})
```

## 观察者模式

- 观察者模式需要有两个类`被观察者` `观察者`

```javascript
class Subject {
  // 被观察者
  constructor(name) {
    this.name = name
    this.observers = []
    this.state = '开心'
  }
  attach(o) {
    this.observers.push(o) // 订阅模式， 被观察者需要接受观察者
  }
  setState(newState) {
    this.state = newState
    this.observers.forEach((o) => o.update(newState))
  }
}
// 观察者
class Observer {
  constructor(name) {
    this.name = name
  }
  update(state) {
    console.log(this.name + ':' + '当前状态是' + state)
  }
}
// 我家有个小宝宝，爸爸和妈妈要关心小宝包的状态，小宝宝不开心会主动通知观察者
let s = new Subject('宝宝')
let o1 = new Observer('爸爸')
let o2 = new Observer('妈妈')
s.attach(o1)
s.attach(o2)
s.setState('不开心')
s.setState('开心')
```
