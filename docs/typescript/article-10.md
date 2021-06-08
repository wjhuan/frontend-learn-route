---
title: 类型声明
---

# 类型声明

- 声明文件可以让我们不需要将`JS`重构为`TS`，只需要加上声明文件就可以使用系统
- 类型声明在编译的时候都会被删除，不会影响真正的代码
- 关键字 `declare` 表示声明的意思，我们可以用它来做出各种声明

```typescript
declare var 声明全局变量
declare function 声明全局方法
declare class 声明全局类
declare enum 声明全局枚举类型
declare namespace 声明(含有子属性的)全局对象
interface 和 type 声明全局类型
```

## 普通类型声明

```typescript
declare let age: number
declare function sum(a: string, b: string): void
declare class Animal {}
declare const enum Seaons {
  Spring,
  Summer,
  Autumn,
  Winter,
}
declare interface Person {
  name: string
  age: number
}
```

声明`jQuery`对象

```typescript
declare const $: (selector: string) => {
  //变量
  click(): void
  width(length: number): void
}
$('#root').click()
console.log($('#root').width)
```

命名空间声明

```typescript
declare namespace jQuery {
  function ajax(url: string, otpions: object): void
  namespace fn {
    function extend(obj: object): void
  }
}
jQuery.ajax('/', {})
jQuery.fn.extend({})
```

## 类型声明文件

- 我们可以把类型声明放在一个单独的类型声明文件中
- 可以在类型声明文件中使用类型声明
- 文件命名规范为`*.d.ts`
- 观看类型声明文件有助于了解库的使用方式

```typescript
// jquery.d.ts
declare const $: (selector: string) => {
  height(num?: number): void
  width(num?: number): void
}

declare namespace jQuery {
  function ajax(url: string, otpions: object): void
  namespace fn {
    function extend(obj: object): void
  }
}
```

## 第三方声明文件

配置`tsconfig.json`

```typescript
"moduleResolution": "node",
"baseUrl": "./",
"paths": {
    "*": ["types/*"]
},
```

```typescript
// types/jquery/index.d.ts

declare function jQuery(selector: string): HTMLElement
declare namespace jQuery {
  function ajax(url: string): void
}
export = jQuery
```

`events`模块声明文件

```typescript
import { EventEmitter } from 'zf-events'
var e = new EventEmitter()
e.on('message', function (text) {
  console.log(text)
})
e.emit('message', 'hello')
```

```typescript
export type Listener = (...args: any[]) => void
export type Type = string | symbol

export class EventEmitter {
  static defaultMaxListeners: number
  emit(type: Type, ...args: any[]): boolean
  addListener(type: Type, listener: Listener): this
  on(type: Type, listener: Listener): this
  once(type: Type, listener: Listener): this
}
```

`@types`是一个约定的前缀，所有的第三方声明的类型库都会带有这样的前缀

```typescript
npm install @types/jquery -S
```

> 当使用`jquery`时默认会查找 `node_modules/@types/jquery/index.d.ts` 文件

查找规范

```typescript
node_modules/jquery/package.json 中的types字段
node_modules/jquery/index.d.ts
node_modules/@types/jquery/index.d.ts
```

## 模块导入导出

```typescript
import $ from 'jquery' // 只适用于 export default $

const $ = require('jquery') // 没有声明文件可以直接使用 require语法

import * as $ from 'jquery' // 为了支持 Commonjs规范 和 AMD规范 导出时采用export = jquery

import $ = require('jquery') // export = jquery 在commonjs规范中使用
```
