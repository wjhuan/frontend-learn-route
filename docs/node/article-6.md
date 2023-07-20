---
title: Node
---

# Node

## Node 基本概念

`Node.js`是一个基于`Chrome V8`引擎的`JavaScript`运行环境`(runtime)`，`Node`不是一门语言是让`js`运行在后端的运行时,并且不包括`javascript`全集，因为在服务端中不包含`DOM`和`BOM`，`Node`也提供了一些新的模块例如`http`、`fs`模块等。`Node.js`使用了事件驱动、非阻塞式`I/O`的模型，使其轻量又高效并且`Node.js`的包管理器 `npm`，是全球最大的开源库生态系统。

- `node`中没有锁的概念
- `node`的应用场景 处理 `I/O` (文件读写)密集型，不适合处理`cpu`密集型 (压缩加密 和计算相关的)
- `node`中处理多个异步操作同一个文件件的场景 `（靠队列实现）`

## Node 解决了哪些问题

`Node`在处理高并发，`I/O`密集场景有明显的性能优势

- 高并发，是指在同一时间并发访问服务器
- `I/O`密集指的是文件操作、网络操作、数据库，相对的有`CPU`密集，`CPU`密集指的是逻辑处理运算、压缩、解压、加密、解密
- 可以解析`js`语法用于服务端渲染 vue，react
- 可以做中间层 （跨域）
- 前端会用`node`来实现很多工具
- 也可以做后端 `mongo mysql`

## JS 单线程

`javascript`在最初设计时设计成了单线程，为什么不是多线程呢？如果多个线程同时操作`DOM`那岂不会很混乱？这里所谓的单线程指的是主线程是单线程的，所以在`Node`中主线程依旧是单线程的。

- 单线程特点是节约了内存，并且不需要在切换执行上下文
- 而且单线程不需要管锁的问题

## 同步异步和阻塞非阻塞

- 同步就是在执行某段代码时，代码没有得到返回之前，其他代码无法执行，当得到了返回值后可以继续执行其他代码
- 异步就是在执行某段代码时，代码不会立即得到返回结果，可以继续执行其他代码，返回值通过回调来获取

![](./img/async.png)

## Node 中全局对象

服务端全局变量原则是是`global`，但是`node`在执行的时候为了实现模块化，会在执行代码时，外部包装一个函数，这个函数在执行的时候，会改变`this`指向

- `Buffer`
- `process`
  - `process.platform` 识别系统
  - `process.cwd()` 获取执行命令时的路径，`webpack`(查找配置文件，在当前执行命令的路径下查找)
  - `process.env.NODE_ENV` 在执行命令的时候（添加的变量），可以去读取环境变量中的属性，`windows`下 可以使用`set`命令来设置，`mac`下使用`export`命令来设置，`cross-env`可以实现系统兼容，环境变量都是临时的，窗口关掉就消失了
  - `process.argv` 执行命令时所带的参数 1.代表的是可执行`node.exe` 2.执行的是哪个文件
- `setInterval,setTimeout,setImmediate`
- `console`
- `queueMicrotask`

## Node 中的模块

下面五个可以直接用，但是不能用`global`来调用，因为他们是函数的参数

- `__dirname` 文件所在的目录 是一个绝对路径
- `__filename` 代表文件的所在位置 是一个绝对路径
- `exports`
- `module`
- `require()`

## commonjs 规范

1. 每个 js 文件都是一个模块
2. 模块的导出 module.exports
3. 模块的导入 require

### node 中的模块的分类

1. 核心模块/内置模块 fs http path 不需要安装 引入的时候不需要增加相对路径、绝对路径
2. 第三方模块需要安装
3. 自定义模块需要通过绝对路径或者相对路径进行引入

### 模块华实现

```js
const fs = require('fs')
const path = require('path')
const vm = require('vm')

function Module(id) {
  this.id = id
  this.exports = {}
}
Module.wrapper = [
  `(function(exports,require,module,__filename,__dirname){`,
  `})`,
]
Module._extensions = {
  '.js'(module) {
    let content = fs.readFileSync(module.id, 'utf8')
    content = Module.wrapper[0] + content + Module.wrapper[1]
    let fn = vm.runInThisContext(content)
    let exports = module.exports
    let dirname = path.dirname(module.id)
    fn.call(exports, exports, req, module, module.id, dirname)
  },
  '.json'(module) {
    let content = fs.readFileSync(module.id, 'utf8')
    module.exports = JSON.parse(content)
  },
}
Module._resolveFilename = function (filename) {
  let absPath = path.resolve(__dirname, filename)
  let isExists = fs.existsSync(absPath)
  if (isExists) {
    return absPath
  } else {
    let keys = Object.keys(Module._extensions)
    for (let i = 0; i < keys.length; i++) {
      let newPath = absPath + keys[i]
      let flag = fs.existsSync(newPath)
      if (flag) {
        return newPath
      }
    }
    throw new Error('module not exists')
  }
}
Module.prototype.load = function () {
  let extName = path.extname(this.id)
  Module._extensions[extName](this)
}
Module._cache = {}

function req(filename) {
  filename = Module._resolveFilename(filename)
  let cacheModule = Module._cache[filename]
  if (cacheModule) {
    return cacheModule.exports
  }
  let module = new Module(filename)
  Module._cache[filename] = module
  module.load()
  return module.exports
}
```

## Events 模块

node 中自己实现的发布订阅模块,订阅是将方法对应成一种一对多的关系，on 方法用来订阅事件

```js
function EventEmitter() {
  this._events = Object.create(null)
}
EventEmitter.prototype.on = function (eventName, callback) {
  if (!this._events) this._events = Object.create(null)

  // 如果用户绑定的不是newListener 让newListener的回调函数执行
  if (eventName !== 'newListener') {
    if (this._events['newListener']) {
      this._events['newListener'].forEach((fn) => fn(eventName))
    }
  }
  if (this._events[eventName]) {
    this._events[eventName].push(callback)
  } else {
    this._events[eventName] = [callback] // {newListener:[fn1]}
  }
}
```

off 方法可以移除对应的事件监听

```js
// 移除绑定的事件
EventEmitter.prototype.off = function (eventName, callback) {
  if (this._events[eventName]) {
    this._events[eventName] = this._events[eventName].filter((fn) => {
      return fn != callback && fn.l !== callback
    })
  }
}
```

emit 用来执行订阅的事件

```js
EventEmitter.prototype.emit = function (eventName, ...args) {
  if (this._events[eventName]) {
    this._events[eventName].forEach((fn) => {
      fn.call(this, ...args)
    })
  }
}
```

once 绑定事件当执行后自动删除订阅的事件

```js
EventEmitter.prototype.once = function (eventName, callback) {
  let one = (...args) => {
    callback.call(this, ...args)
    // 删除掉这个函数
    this.off(eventName, one) // 执行完后在删除掉
  }
  one.l = callback // one.l = fn;
  // 先绑定一个once函数，等待emit触发完后执行one函数 ，执行原有的逻辑，执行后删除once函数
  this.on(eventName, one)
}
```
