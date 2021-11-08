---
title: 初识Promise
---

# 初识 Promise

## 什么是 Promise

- `Promise`是一个类，我们可以`new Promise`创造一个实例
- `Promise`有三个状态
  1. 默认状态叫等待态`pending`
  2. `resolve`表示成功态`fulfilled`
  3. `reject`表示变成失败态`rejected`
- 只有在`pending`的状态的时候才能改变状态，不能从成功变成失败，不能从失败变成成功
- 成功有成功的原因，失败同样也有失败的原因，除了调用`resolve`和`reject`能改变状态外，还可以使用`throw new Error`抛出异常也会执行到失败的逻辑

```javascript
let promise = new Promise((resolve, reject) => {
  // throw new Error('error')
  reject('ok') // 让promise变成成功态
  resolve('ok')
  // return new Error('失败')
})

promise.then(
  (value) => {
    // then方法中提供两个参数 1. 成功回调 2.失败的回调
    console.log(value, 'success')
  },
  (reason) => {
    console.log(reason, 'fail')
  }
)
```

## 简易版 Promise 实现

```javascript
const PENDING = 'PENDING' // 默认等待态
const FULFILLED = 'FULFILLED' // 成功态
const REJECTED = 'REJECTED' // 失败态
class Promise {
  constructor(executor) {
    // executor 会默认被执行  同步执行
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    // 用户调用resolve和reject 可以将对应的结果暴露在当前的promise实实例上
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    const resolve = (value) => {
      if (this.status == PENDING) {
        this.value = value
        this.status = FULFILLED
        this.onResolvedCallbacks.forEach((fn) => fn())
      }
    }
    const reject = (reason) => {
      if (this.status == PENDING) {
        this.reason = reason // 这里先保存了reason
        this.status = REJECTED
        // 调用了失败的逻辑
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    }
    try {
      executor(resolve, reject) // 默认new Promise中的函数会立即执行
    } catch (e) {
      // 如果执行时出错，我们将错误传递到reject中 -》 执行到了失败的逻辑
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status == FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status == REJECTED) {
      onRejected(this.reason)
    }
    if (this.status == PENDING) {
      // 在外部调用then方法时
      this.onResolvedCallbacks.push(() => {
        // todo  可以实现其他逻辑
        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        // todo  可以实现其他逻辑
        onRejected(this.reason)
      })
      // 发布订阅模式
    }
  }
}
module.exports = Promise
```

## Promise A+ 实现

[Promise A+规范](https://promisesaplus.com/)

```javascript
const PENDING = 'PENDING' // 默认等待态
const FULFILLED = 'FULFILLED' // 成功态
const REJECTED = 'REJECTED' // 失败态
function resolvePromise(x, promise2, resolve, reject) {
  // 我们还需要考虑 x 可能是别人家的promise
  // 希望我的promise可以和别人的promise一起来混用的 q库 bluebird库
  // If promise and x refer to the same object, reject promise with a TypeError as the reason
  if (x === promise2) {
    return reject(new TypeError('循环引用'))
  }
  // 继续判断x 是不是一个promise  promsise需要有then方法 (啥时候是函数的？ 别人写的proimise 就有可能是函数)
  if ((typeof x === 'object' && x !== null) || typeof x == 'function') {
    // 才有可能是一个promise, 继续判断x 是否有then
    // Let then be x.then
    let called = false
    try {
      let then = x.then // 尝试取then方法
      if (typeof then == 'function') {
        // 我就认为他是promise了
        // x.then // 这个会再次取一次属性 触发get方法
        // then.call(x) // 这个不会
        then.call(
          x,
          (y) => {
            // y有可能还是一个promise ，所以要再次进行解析流程
            // 我需要不停的解析成功的promise中返回的成功值，直到这个值是一个普通值
            if (called) return
            called = true
            resolvePromise(y, promise2, resolve, reject)
          },
          (r) => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } else {
        // {then:1}
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e) // 让promise2 变成失败态
    }
  } else {
    // x 是一个普通值
    resolve(x)
  }
  // 1.如果x 是一个普通值 则直接调用resolve即可
  // 2. 如果x 是一个promise那么应该采用这个promise的状态 决定调用的是 resolve还是reject
}
class Promise {
  constructor(executor) {
    // executor 会默认被执行  同步执行
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    // 用户调用resolve和reject 可以将对应的结果暴露在当前的promise实实例上
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    const resolve = (value) => {
      // value.then
      if (value instanceof Promise) {
        // 这个方法并不属于 规范中的，只是为了和原生的promise表现形式一样
        return value.then(resolve, reject) // === resolvePromise
      }
      if (this.status == PENDING) {
        this.value = value
        this.status = FULFILLED
        this.onResolvedCallbacks.forEach((fn) => fn())
      }
    }
    const reject = (reason) => {
      if (this.status == PENDING) {
        this.reason = reason // 这里先保存了reason
        this.status = REJECTED
        // 调用了失败的逻辑
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    }
    try {
      executor(resolve, reject) // 默认new Promise中的函数会立即执行
    } catch (e) {
      // 如果执行时出错，我们将错误传递到reject中 -》 执行到了失败的逻辑
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : (v) => v
    onRejected =
      typeof onRejected == 'function'
        ? onRejected
        : (e) => {
            throw e
          }
    // 每次调用then方法 都必须返回一个全新的promise
    let promise2 = new Promise((resolve, reject) => {
      // x 就是上一个then成功或者失败的返回值，这个x决定proomise2 走成功还是走失败
      if (this.status == FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status == REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status == PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise2
  }
  catch(errFn) {
    return this.then(null, errFn)
  }
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value)
    })
  }
  static reject(err) {
    return new Promise((resolve, reject) => {
      reject(err)
    })
  }
}
Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = Promise

// npm install promises-aplus-tests -g;
// promises-aplus-tests promise/index.js
```

## deferred 延迟对象静态方法

```javascript
// 把Promise的实例，resolve和reject方法都挂在一个对象上面
Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
```

`deferred`静态方法原生的`Promise`是没有的，这个是咱们自己实现的

例如下面这段代码，其实就是`fs.readFile`去读文件，但是为了解决链式调用`（回调地狱）`，所以封装的一层`Promise`，但是看起来代码也很冗余，那么就可以用延迟对象雷解决这个问题

```javascript
function readFile(...args) {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, function (err, data) {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
```

延迟对象写法

```javascript
// 延迟对象来解决嵌套问题
function readFile(...args) {
  let dfd = Promise.deferred()
  fs.readFile(...args, function (err, data) {
    if (err) return dfd.reject(err)
    dfd.resolve(data)
  })
  return dfd.promise
}
```

## catch 捕获异常方法

- 为了方便单独捕获错误，`Promise`提供了一个`catch`方法来专门捕获错误
- `then`方法的第二个参数失败回调函数其实和这里要实现的`catch`方法作用是一样的
- 那么`catch`就是`then`方法的第一个参数成功的回调是`null`，第二个参数失败的回调还是正常的函数

```javascript
catch(errFn) {
  return this.then(null, errFn)
}
```

```javascript
readFile('./a1.txt', 'utf8')
  .then((data) => {
    console.log(data)
  })
  .then(null, (err) => {
    console.log(err)
  }) // catch后面可以 继续调用then方法

readFile('./a1.txt', 'utf8')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  }) // catch后面可以 继续调用then方法
```

## resolve 和 reject 静态方法

```javascript
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value)
    })
  }
  static reject(err) {
    return new Promise((resolve, reject) => {
      reject(err)
    })
  }
```

## all 静态方法实现

```javascript
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    // 将数组中的promise依次执行
    let result = []
    let index = 0
    function process(v, k) {
      // after 实现是一致的
      result[k] = v
      if (++index == promises.length) {
        // 解决多个异步并发问题 只能靠计数器
        resolve(result)
      }
    }
    for (let i = 0; i < promises.length; i++) {
      let p = promises[i]
      if (p && typeof p.then === 'function') {
        p.then((data) => {
          // 异步
          process(data, i)
        }, reject) // 如果有一个promise失败了 那么就执行最后的失败逻辑
      } else {
        process(p, i) // 同步的
      }
    }
  })
}

// Promise.all 表示全部成功才成功，如果一个失败了则失败
Promise.all([
  fs.readFile('name.txt', 'utf8'),
  fs.readFile('age.txt', 'utf8'),
  11,
])
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
```

## finally 实例方法实现

```javascript
Promise.prototype.finally = function (cb) {
  return this.then(
    (y) => {
      return Promise.resolve(cb()).then((d) => y)
    },
    (r) => {
      // cb执行一旦报错 就直接跳过后续的then的逻辑，直接将错误向下传递
      return Promise.resolve(cb()).then(() => {
        throw r
      })
    }
  )
}
Promise.reject('ok')
  .finally(() => {
    // finally 如果返回的是一个promise那么会有等待效果
    console.log('无论成功失败都执行')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('xxxxxxxxxxx') // 如果是失败 会用这里的失败作为失败的原因
      }, 1000)
    })
  })
  .then((data) => {
    console.log('成功', data)
  })
  .catch((err) => {
    console.log('失败', err)
  })
```

## race 静态方法实现

```javascript
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let promise of promises) {
      if (promise && typeof promise.then == 'function') {
        promise.then(resolve, reject)
      } else {
        resolve(promise)
      }
    }
  })
}
```
