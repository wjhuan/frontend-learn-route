---
title: DOM和BOM面试题
---

# DOM和BOM面试题

## DOM 的本质

讲 DOM 先从 html 讲起，讲 html 先从 XML 讲起。XML 是一种可扩展的标记语言，所谓可扩展就是它可以描述任何结构化的数据，它是一棵树！

```xml
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
  <other>
    <a></a>
    <b></b>
  </other>
</note>
```

HTML 是一个有既定标签标准的 XML 格式，标签的名字、层级关系和属性，都被标准化（否则浏览器无法解析）。同样，它也是一棵树。

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div>
        <p>this is p</p>
    </div>
</body>
</html>
```

我们开发完的 html 代码会保存到一个文档中（一般以`.html`或者`.htm`结尾），文档放在服务器上，浏览器请求服务器，这个文档被返回。因此，最终浏览器拿到的是一个文档而已，文档的内容就是 html 格式的代码。

但是浏览器要把这个文档中的 html 按照标准渲染成一个页面，此时浏览器就需要将这堆代码处理成自己能理解的东西，也得处理成 JS 能理解的东西，因为还得允许 JS 修改页面内容呢。

基于以上需求，浏览器就需要把 html 转变成 DOM，html 是一棵树，DOM 也是一棵树。对 DOM 的理解，可以暂时先抛开浏览器的内部因此，先从 JS 着手，即可以认为 DOM 就是 JS 能识别的 html 结构，一个普通的 JS 对象或者数组。

【附带一个 chrome Element 的截图】

## 获取 DOM 节点

```javascript
const div1 = document.getElementById('div1') // 元素
const divList = document.getElementsByTagName('div')  // 集合
console.log(divList.length)
console.log(divList[0])

const containerList = document.getElementsByClassName('.container') // 集合
const pList = document.querySelectorAll('p') // 集合
```

## prototype

DOM 节点就是一个 JS 对象，它符合之前讲述的对象的特征 ———— 可扩展属性

```javascript
const pList = document.querySelectorAll('p')
const p = pList[0]
console.log(p.style.width)  // 获取样式
p.style.width = '100px'  // 修改样式
console.log(p.className)  // 获取 class
p.className = 'p1'  // 修改 class

// 获取 nodeName 和 nodeType
console.log(p.nodeName)
console.log(p.nodeType)
```

## Attribute

property 的获取和修改，是直接改变 JS 对象，而 Attibute 是直接改变 html 的属性。两种有很大的区别

```javascript
const pList = document.querySelectorAll('p')
const p = pList[0]
p.getAttribute('data-name')
p.setAttribute('data-name', 'imooc')
p.getAttribute('style')
p.setAttribute('style', 'font-size:30px;')
```

## DOM 树操作

新增节点

```javascript
const div1 = document.getElementById('div1')
// 添加新节点
const p1 = document.createElement('p')
p1.innerHTML = 'this is p1'
div1.appendChild(p1) // 添加新创建的元素
// 移动已有节点。注意是移动！！！
const p2 = document.getElementById('p2')
div1.appendChild(p2)
```

获取父元素

```javascript
const div1 = document.getElementById('div1')
const parent = div1.parentNode
```

获取子元素

```javascript
const div1 = document.getElementById('div1')
const child = div1.childNodes
```

删除节点

```javascript
const div1 = document.getElementById('div1')
const child = div1.childNodes
div1.removeChild(child[0])
```

还有其他操作的API，例如获取前一个节点、获取后一个节点等，但是面试过程中经常考到的就是上面几个。

## DOM 性能

DOM 操作是昂贵的 —— 非常耗费性能。因此针对频繁的 DOM 操作一定要做一些处理。

例如缓存 DOM 查询结果

```js
// 不缓存 DOM 查询结果
for (let = 0; i < document.getElementsByTagName('p').length; i++) {
    // 每次循环，都会计算 length ，频繁进行 DOM 查询
}

// 缓存 DOM 查询结果
const pList = document.getElementsByTagName('p')
const length = pList.length
for (let i = 0; i < length; i++) {
    // 缓存 length ，只进行一次 DOM 查询
}
```

再例如，插入多个标签时，先插入 Fragment 然后再统一插入DOM

```js
const listNode = document.getElementById('list')

// 创建一个文档片段，此时还没有插入到 DOM 树中
const frag = document.createDocumentFragment()

// 执行插入
for(let x = 0; x < 10; x++) {
    const li = document.createElement("li")
    li.innerHTML = "List item " + x
    frag.appendChild(li)
}

// 都完成之后，再插入到 DOM 树中
listNode.appendChild(frag)
```

## 事件绑定

```javascript
const btn = document.getElementById('btn1')
btn.addEventListener('click', event => {
    console.log('clicked')
})
```

通用的事件绑定函数

```js
function bindEvent(elem, type, fn) {
    elem.addEventListener(type, fn)
}
const a = document.getElementById('link1')
bindEvent(a, 'click', e => {
    e.preventDefault() // 阻止默认行为
    alert('clicked')
})
```

## 事件冒泡

```html
<body>
    <div id="div1">
        <p id="p1">激活</p>
        <p id="p2">取消</p>
        <p id="p3">取消</p>
        <p id="p4">取消</p>
    </div>
    <div id="div2">
        <p id="p5">取消</p>
        <p id="p6">取消</p>
    </div>
</body>
```

对于以上 html 代码结构，点击`p1`时候进入激活状态，点击其他任何`p`都取消激活状态，如何实现？

```javascript
const p1 = document.getElementById('p1')
const body = document.body
bindEvent(p1, 'click', e => {
    e.stopPropagation() // 注释掉这一行，来体会事件冒泡
    alert('激活')
})
bindEvent(body, 'click', e => {
    alert('取消')
})
```

如果我们在`p1` `div1` `body`中都绑定了事件，它是会根据 DOM 的结构，来冒泡从下到上挨个执行的。但是我们使用`e.stopPropagation()`就可以阻止冒泡。

## 代理

我们设定一种场景，如下代码，一个`<div>`中包含了若干个`<a>`，而且还能继续增加。那如何快捷方便的为所有的`<a>`绑定事件呢？

```html
<div id="div1">
    <a href="#">a1</a>
    <a href="#">a2</a>
    <a href="#">a3</a>
    <a href="#">a4</a>
</div>
<button>点击增加一个 a 标签</button>
```

这里就会用到事件代理，我们要监听`<a>`的事件，但要把具体的事件绑定到`<div>`上，然后看事件的触发点，是不是`<a>`

```javascript
const div1 = document.getElementById('div1')
div1.addEventListener('click', e => {
    const target = e.target
    if (e.nodeName === 'A') {
        alert(target.innerHTML)
    }
})
```

那我们现在完善一下之前写过的通用事件绑定函数，加上事件代理

```javascript
function bindEvent(elem, type, selector, fn) {
    if (fn == null) {
        fn = selector
        selector = null
    }
    elem.addEventListener(type, e => {
        let target
        if (selector) {
            target = e.target
            if (target.matches(selector)) {
                fn.call(target, e)
            }
        } else {
            fn(e)
        }
    })
}
```

然后这样使用

```js
// 使用代理
const div1 = document.getElementById('div1')
bindEvent(div1, 'click', 'a', e => {
    console.log(this.innerHTML)
})

// 不使用代理
const a = document.getElementById('a1')
bindEvent(div1, 'click', e => {
    console.log(a.innerHTML)
})
```

最后，使用代理的优点

- 使代码简洁
- 减少浏览器的内存占用
