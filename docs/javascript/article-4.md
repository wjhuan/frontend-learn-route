---
title: this的几种基本情况
---

# this 的几种基本情况

## this 指向判断

> THIS 是执行主体：通俗来讲，是谁把它执行的，而不是在哪执行的，也不是在哪定义的，所以 THIS 是谁和在哪执行以及在哪定义都没有直接的关系；

1. 全局上下文中的`this->window`
2. 块级上下文中没有自己的 this，在此上下文中遇到的`this`，都是其所处环境(上级上下文)中的`this`
3. `ES6`中的箭头函数和块级上下文类似，也是没有自己的`this`，遇到的`this`也是其上级上下文中的
4. 给`DOM元`素进行事件绑定`(不论是DOM0还是DOM2)`，当事件行为触发，绑定的方法执行，方法中的`THIS`是当前`DOM`元素本身!!
5. 当方法执行，我们看函数前面是否有“点”
   - 有：“点”之前是谁`THIS`就是谁
   - 没有：`THIS`就是`window`(非严格模式)或者`undefined`(严格模式 `use strict`)
   - 匿名函数(自执行函数或者回调函数等)中的`THIS`一般都是`window/undefined`，除非做过特殊的处理！！

```js
var x = 3,
  obj = { x: 5 }
obj.fn = (function () {
  this.x *= ++x
  return function (y) {
    this.x *= ++x + y
    console.log(x)
  }
})()
var fn = obj.fn
obj.fn(6)
fn(4)
console.log(obj.x, x)
```

![](./img/this1.jpg)
