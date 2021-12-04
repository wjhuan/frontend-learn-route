---
title: Event Loop
---

# Event Loop

## 进程与线程

- 进程计算机分配任务的和调度的任务最小单位，浏览器是一个多进程模型，每个页卡都是一个独立的进程 （更稳定）
- 把这些概念拿到浏览器中来说，当你打开一个 Tab 页时，其实就是创建了一个进程，一个进程中可以有多个线程，比如`渲染线程`、`JS 引擎线程`、`HTTP 请求线程`等等。当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁。
- `JS`是单线程的？只是主线程是单线程的。

线程包括哪些

- `GUI`渲染，页面渲染，绘图，绘制，`3d`动画
- `js`渲染引擎：执行 `js` 代码，当 `js` 执行时渲染线程会挂起`=>`渲染时不能执行`js`
- 事件触发线程 `EventLoop`
- `webApi` 也会创建线程：`事件`、`定时器`、`ajax请求`都会创造一个线程
- `webworker`

> 微任务队列每次都会创建一个全新的队列、事件队列仅有一个

- 事件队列、消息队列：存放定时器到达时间的回调函数、`ajax`回调成功的函数等
- 事件循环：不断检测调用栈是否为空，如果为空则从事件对列中取出一个来执行

## 宏任务和微任务

- 宏任务 `script`、`ui 渲染`、`setTimeout`、`setInterval`、`postMessage`、`MessageChannel`、`setImmediate`
- 微任务 `promise`、`mutationObserver`、`process.nextTick(node)`

> 每循环一次会执行一个宏任务，并清空对应的微任务队列，每次事件循环完毕后会判断页面是否需要重新渲染 （大约 16.6ms 会渲染一次）

1. 先执行`script`脚本，将宏任务和微任务进行分类，如果调用的是浏览器`api`，浏览器会开一个线程，等时间到了，会自动的放入到宏任务队列中，微任务是直接放到微任务队列中的
2. `js`执行完毕后，会清空所有的微任务，如果微任务在产生微任务，会放到当前微任务队列的尾部
3. 如果页面需要渲染，则会执行渲染流程
4. 事件触发线程会不停的扫描宏任务队列，如果宏任务队列中有对应的回调，会取出来执行一个，继续执行上述过程
5. 宏任务每次调用一个，微任务是请空所有

> 微任务队列每次执行宏任务 都会创造一个新的队列，宏任务队列只有一个

## 微任务和 GUI 渲染问题

```javascript
// 这道题最终渲染的颜色以黄色为主，而且不会闪烁
// 因为Promise.resolve()为微任务执行完微任务，如果有必要才回去执行UI渲染
<script>
        document.body.style.background = 'red';
        console.log(1)
        Promise.resolve().then(()=>{
            console.log(2)
            document.body.style.background = 'yellow';
        })
        console.log(3);
</script>

// 这道题最终渲染的颜色以黄色为主，而且不会闪烁
// 因为Promise.resolve()为微任务执行完微任务，如果有必要才回去执行UI渲染
<script>
        document.body.style.background = 'red';
        console.log(1)
        setTimeout(() => {
            console.log(2)
            document.body.style.background = 'yellow';
        }, 0);
        console.log(3);
</script>
```

```javascript
console.log(1)
async function async() {
  console.log(2)
  await console.log(3)
  console.log(4)
}
setTimeout(() => {
  console.log(5)
}, 0)
const promise = new Promise((resolve, reject) => {
  console.log(6)
  resolve(7)
})
promise.then((res) => {
  console.log(res)
})
async()
console.log(8)

// async 执行后返回的是一个promise
// await 后面包装的内容 await console.log(3); => return Promise.resolve(console.log(3)).then(()=>console.log(4))

//  1  6  2  3  8   7 4    5
```
