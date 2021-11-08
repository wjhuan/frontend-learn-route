---
title: 异步编程
---

# 异步编程

## 什么是 generator

- 在函数名前增加一个`*`，表示该函数为`generator`函数
- 函数内部通过`yield`产出值，并且碰到`yield`就会停止
- `generator`函数会返回一个迭代器，调用`next`方法传递参数,就是给上一次`yield`的返回值赋值
- 如果我们自己去迭代一个对象需要实现一个迭代器接口，自己返回一个具有`next`方法的对象，内部会调用这个`next`方法返回结果包含`value`和`done`，当`done`为`true`时迭代完成

迭代器的基本实现

```javascript
const interable = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
interable[Symbol.iterator] = function () {
  let index = 0
  return {
    // 遍历器对象
    next: () => {
      return { value: this[index], done: index++ == this.length }
    },
  }
}
```

通过`generator`生成器实现

```javascript
const iterable = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
iterable[Symbol.iterator] = function* () {
  let index = 0
  while (index !== this.length) {
    yield this[index++]
  }
}
console.log([...iterable])
```

生成器使用

```javascript
let fs = require('fs').promises

function* read() {
  // 更像同步
  const a = yield 'b.txt'
  const b = yield fs.readFile(a, 'utf8')
  return b
}
function co(it) {
  // koa express 都是基于这个写法的
  return new Promise((resolve, reject) => {
    // 同步迭代用for -> 递归
    function next(data) {
      let { value, done } = it.next(data)
      // 浏览器内部resolve方法会判断如果是promise 直接会将promise返回
      if (done) {
        return resolve(value)
      }
      Promise.resolve(value).then((data) => {
        next(data)
      }, reject)
    }
    next()
  })
}
co(read()).then((data) => {
  console.log(data)
})

// let it = read()
// let { value, done } = it.next()
// value.then((data) => {
//   let { value, done } = it.next(data) // 将data 放到a中
//   value.then((data) => {
//     let { value, done } = it.next(data) // 将data 放到a中
//     it.next(data)
//   })
// })
```
