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

## 进程与线程

- 进程（Process）是计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位
- 线程（Thread）是操作系统能够进行运算调度的最小单位。它被包含在进程之中，是进程中的实际运作单位。

> Node 特点主线程是单线程的 一个进程只开一个主线程,基于事件驱动的、异步非阻塞 I/O，可以应用于高并发场景

> Nodejs 中没有多线程，为了充分利用多核 cpu,可以使用子进程实现内核的负载均衡

那我们就要解决以下问题

- Node.js 做耗时的计算时候阻塞问题
- Node.js 如何开启多进程
- 开发过程中如何实现进程守护

### 先看问题

```js
const http = require('http')
http
  .createServer((req, res) => {
    if (req.url === '/sum') {
      // 求和
      let sum = 0
      for (let i = 0; i < 10000000000; i++) {
        sum += i
      }
      res.end(sum + '')
    } else {
      res.end('end')
    }
  })
  .listen(3000)
// 这里我们先访问/sum，在新建一个浏览器页卡访问/
// 会发现要等待/sum路径处理后才能处理/路径
```

### 开启进程

Node.js 进程创建，是通过 child_process 模块

- child_process.spawn(） 异步生成子进程
- child_process.fork() 产生一个新的 Node.js 进程，并使用建立的 IPC 通信通道调用指定的模块，该通道允许在父级和子级之间发送消息。
- child_process.exec() 产生一个 shell 并在该 shell 中运行命令
- child_process.execFile() 无需产生 shell

### spawn

spawn 产卵，可以通过此方法创建一个子进程

```js
let { spawn } = require('child_process')
let path = require('path')
// 通过node命令执行sub_process.js文件
let childProcess = spawn('node', ['sub_process.js'], {
  cwd: path.resolve(__dirname, 'test'), // 找文件的目录是test目录下
  stdio: [0, 1, 2],
})
// 监控错误
childProcess.on('error', function (err) {
  console.log(err)
})
// 监听关闭事件
childProcess.on('close', function () {
  console.log('close')
})
// 监听退出事件
childProcess.on('exit', function () {
  console.log('exit')
})
```

> stdio 这个属性非常有特色，这里我们给了 0,1,2 那么分别代表什么呢？

1. 0,1,2 分别对应当前主进程的 process.stdin,process.stdout,process.stderr,意味着主进程和子进程共享标准输入和输出

```js
let childProcess = spawn('node', ['sub_process.js'], {
  cwd: path.resolve(__dirname, 'test'), // 找文件的目录是test目录下
  stdio: [0, 1, 2],
})
```

可以在当前进程下打印 sub_process.js 执行结果

2. 默认不提供 stdio 参数时，默认值为 stdio:['pipe']，也就是只能通过流的方式实现进程之间的通信

```js
let { spawn } = require('child_process')
let path = require('path')
// 通过node命令执行sub_process.js文件
let childProcess = spawn('node', ['sub_process.js'], {
  cwd: path.resolve(__dirname, 'test'),
  stdio: ['pipe'], // 通过流的方式
})
// 子进程读取写入的数据
childProcess.stdout.on('data', function (data) {
  console.log(data)
})
// 子进程像标准输出中写入
process.stdout.write('hello')
```

3. 使用 ipc 方式通信,设置值为 stdio:['pipe','pipe','pipe','ipc'],可以通过 on('message')和 send 方法进行通信

```js
let { spawn } = require('child_process')
let path = require('path')
// 通过node命令执行sub_process.js文件
let childProcess = spawn('node', ['sub_process.js'], {
  cwd: path.resolve(__dirname, 'test'),
  stdio: ['pipe', 'pipe', 'pipe', 'ipc'], // 通过流的方式
})
// 监听消息
childProcess.on('message', function (data) {
  console.log(data)
})
// 发送消息
process.send('hello')
```

4. 还可以传入 ignore 进行忽略 , 传入 inherit 表示默认共享父进程的标准输入和输出
   产生独立进程

```js
let { spawn } = require('child_process')
let path = require('path')
// 通过node命令执行sub_process.js文件
let child = spawn('node', ['sub_process.js'], {
  cwd: path.resolve(__dirname, 'test'),
  stdio: 'ignore',
  detached: true, // 独立的线程
})
child.unref() // 放弃控制
```

### fork

衍生新的进程,默认就可以通过 ipc 方式进行通信

```js
let { fork } = require('child_process')
let path = require('path')
// 通过node命令执行sub_process.js文件
let childProcess = fork('sub_process.js', {
  cwd: path.resolve(__dirname, 'test'),
})
childProcess.on('message', function (data) {
  console.log(data)
})
```

> fork 是基于 spawn 的，可以多传入一个 silent 属性, 设置是否共享输入和输出

fork 原理

```js
function fork(filename, options) {
  let stdio = ['inherit', 'inherit', 'inherit']
  if (options.silent) {
    // 如果是安静的  就忽略子进程的输入和输出
    stdio = ['ignore', 'ignore', 'ignore']
  }
  stdio.push('ipc') // 默认支持ipc的方式
  options.stdio = stdio
  return spawn('node', [filename], options)
}
```

写到这我们就可以解决开始的问题了

```js
const http = require('http')
const { fork } = require('child_process')
const path = require('path')
http
  .createServer((req, res) => {
    if (req.url === '/sum') {
      let childProcess = fork('calc.js', {
        cwd: path.resolve(__dirname, 'test'),
      })
      childProcess.on('message', function (data) {
        res.end(data + '')
      })
    } else {
      res.end('ok')
    }
  })
  .listen(3000)
```

### execFile

通过 node 命令,直接执行某个文件

```js
let childProcess = execFile(
  'node',
  ['./test/sub_process'],
  function (err, stdout, stdin) {
    console.log(stdout)
  }
)
```

> 内部调用的是 spawn 方法

### exec

内部调用的是 execFile,其实以上的三个方法都是基于 spawn 的

```js
let childProcess = exec(
  "node './test/sub_process'",
  function (err, stdout, stdin) {
    console.log(stdout)
  }
)
```

### cluster

Node.js 的单个实例在单个线程中运行。为了利用多核系统，用户有时会希望启动 Node.js 进程集群来处理负载。

自己通过进程来实现集群

```js
let { fork } = require('child_process')
let len = require('os').cpus().length
let child = fork('server.js', {})

const http = require('http')
const path = require('path')
// 创建服务
let server = http
  .createServer((req, res) => {
    res.end(process.pid + ':process')
  })
  .listen(3000, function () {
    console.log('服务启动')
  })
for (let i = 0; i < len; i++) {
  let child = fork('server.js')
  child.send('server', server) // 让子进程监听同一个服务
}
```

使用 cluster 模块

```js
let cluster = require('cluster')
let http = require('http')
let cpus = require('os').cpus().length
const workers = {}
if (cluster.isMaster) {
  cluster.on('exit', function (worker) {
    console.log(worker.process.pid, 'death')
    let w = cluster.fork()
    workers[w.pid] = w
  })
  for (let i = 0; i < cpus; i++) {
    let worker = cluster.fork()
    workers[worker.pid] = worker
  }
} else {
  http
    .createServer((req, res) => {
      res.end(process.pid + '', 'pid')
    })
    .listen(3000)
  console.log('server start', process.pid)
}
```

## pm2 应用

pm2 可以把你的应用部署到服务器所有的 CPU 上,实现了多进程管理、监控、及负载均衡

### 安装 pm2

```sh
npm install pm2 -g # 安装pm2
pm2 start server.js --watch -i max # 启动进程
pm2 list # 显示进程状态
pm2 kill # 杀死全部进程
```

```sh
pm2 start npm -- run dev # 启动npm脚本
```

### pm2 配置文件

```sh
pm2 ecosystem
```

配置项目自动部署

```js
module.exports = {
  apps: [
    {
      name: 'my-project',
      script: 'server.js',
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: 'one two',
      instances: 2,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: '39.106.14.146',
      ref: 'origin/master',
      repo: 'https://github.com/wakeupmypig/pm2-deploy.git',
      path: '/home',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
    },
  },
}
```

```sh
pm2 deploy ecosystem.config.js production setup # 执行git clone
pm2 deploy ecosystem.config.js production # 启动pm2
```
