---
title: 数据类型
---

## 原始数据类型[值类型/基本数据类型]

- `number` 数字类型

```javascript
// number 包括 正数 负数 0 1.2 NaN(不是一个数、但是它属于number类型) Infinity(无限大) -Infinity(无限小)
//
```

- `string` 字符串类型
- `boolean` 布尔类型
- `null` 空对象指针
- `undefined` 未定义
- `symbol` 唯一值

```javascript
// console.log(Symbol() === Symbol());  //false
// console.log(Symbol('AA') === Symbol('AA')); //false
// console.log(new Symbol()); //Uncaught TypeError: Symbol is not a constructor
// 作用1：可以给对象设置唯一值类型的属性「对象“属性名”的类型：string、symbol」
/* let a = [10, 20];
let sym = Symbol('BB');
let obj = {
    name: 'zhufeng',
    age: 13,
    0: 100,
    [{ xxx: 'xxx' }]: 200,  // "[object Object]":200
    [a]: 300, // "10,20":300
    [Symbol('AA')]: 400,
    [sym]: 500
};
// console.log(obj['name']);
// console.log(obj[0]);
// console.log(obj['0']);
// console.log(obj[Symbol('AA')]); //undefined  这是两个不同的唯一值
// console.log(obj[sym]); //500
// ----
// for (let key in obj) { //问题：for in循环是无法迭代symbol类型的私有属性
//     console.log(key);
// }
// ----
// let keys = Object.keys(obj); //获取非symbol类型的私有属性(返回包含属性名的数组)
// keys = keys.concat(Object.getOwnPropertySymbols(obj)); //获取symbol类型的私有属性
// console.log(keys);
// ----
// let keys = Reflect.ownKeys(obj); //获取所有私有属性，不论是啥类型
// console.log(keys); */
// 作用2：把Symbol做为对象，提供的很多静态属性方法，是JS很多的知识的底层实现原理
//  Symbol.toPrimitive/hasInstance/toStringTag/iterator/asyncIterator...
// 作用3：vuex/redux中我们需要派发很多行为标识，我们可以把这些行为标识统一管理，为了保证行为标识的唯一性，所以可以基于symbol处理
// ...
```

- `bigint` 大数

```javascript
// Number.MAX_SAFE_INTEGER 最大安全数字  9007199254740991，超过这个数字进行运算，运算结果不一定准确
// 需求：服务器端数据库存储值有longInt(大数类型),如果服务器返回这样的值(一般会以字符串形式返回),而且需要客户端在这个值基础上再次运算,我们该如何处理呢?
//   把服务器获取的值[value]先转换为bigint类型   BigInt([value]) -> BV   数组后加n
//   基于BV进行运算(运算的另外一个值也是bigint类型的)
//   把运算的结果转换为字符串(去掉n)再传递给服务器即可
```

## 对象类型[引用数据类型]

- 标准普通对象 `object`
- 标准特殊对象 `Array`、`RegExp`、`Date`、`Math`、`Error`....
- 非标准特殊对象 `Number`、`String`、`Boolean`....
- 可调用/执行对象[函数] `function`....
