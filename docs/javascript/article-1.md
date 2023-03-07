---
title: 数据类型
---

## 原始数据类型[值类型/基本数据类型]

- `number` 数字类型

  > `number` 包括 `正数` `负数` `0` `1.2` `NaN(不是一个数、但是它属于number类型)` `Infinity(无限大)` `-Infinity(无限小)`

- `string` 字符串类型
- `boolean` 布尔类型
- `null` 空对象指针
- `undefined` 未定义
- `symbol` 唯一值

```javascript
console.log(Symbol() === Symbol()) //false
console.log(Symbol('AA') === Symbol('AA')) //false
console.log(new Symbol()) //Uncaught TypeError: Symbol is not a constructor
// 作用1：可以给对象设置唯一值类型的属性「对象“属性名”的类型：string、symbol」
let a = [10, 20]
let sym = Symbol('BB')
let obj = {
  name: 'zhufeng',
  age: 13,
  0: 100,
  [{ xxx: 'xxx' }]: 200, // "[object Object]":200
  [a]: 300, // "10,20":300
  [Symbol('AA')]: 400,
  [sym]: 500,
}
console.log(obj['name'])
console.log(obj[0])
console.log(obj['0'])
console.log(obj[Symbol('AA')]) //undefined  这是两个不同的唯一值
console.log(obj[sym]) //500
// ----
for (let key in obj) {
  //问题：for in循环是无法迭代symbol类型的私有属性
  console.log(key)
}
// ----
let keys = Object.keys(obj); //获取非symbol类型的私有属性(返回包含属性名的数组)
keys = keys.concat(Object.getOwnPropertySymbols(obj)); //获取symbol类型的私有属性
console.log(keys);
// ----
let keys = Reflect.ownKeys(obj); //获取所有私有属性，不论是啥类型
console.log(keys); */
// 作用2：把Symbol做为对象，提供的很多静态属性方法，是JS很多的知识的底层实现原理
 Symbol.toPrimitive/hasInstance/toStringTag/iterator/asyncIterator...
// 作用3：vuex/redux中我们需要派发很多行为标识，我们可以把这些行为标识统一管理，为了保证行为标识的唯一性，所以可以基于symbol处理
```

- `bigint` 大数
  > `Number.MAX_SAFE_INTEGER` 最大安全数字 `9007199254740991`，超过这个数字进行运算，运算结果不一定准确
  > 需求：服务器端数据库存储值有 longInt(大数类型),如果服务器返回这样的值(一般会以字符串形式返回),而且需要客户端在这个值基础上再次运算,我们该如何处理呢?

1. 把服务器获取的值[value]先转换为 bigint 类型 BigInt([value]) -> BV 数组后加 n
2. 基于 BV 进行运算(运算的另外一个值也是 bigint 类型的)
3. 把运算的结果转换为字符串(去掉 n)再传递给服务器即可

## 对象类型[引用数据类型]

- 标准普通对象 `object`
- 标准特殊对象 `Array`、`RegExp`、`Date`、`Math`、`Error`....
- 非标准特殊对象 `Number`、`String`、`Boolean`....
- 可调用/执行对象[函数] `function`....

## 数据类型检测的方式

1. Object.prototype.toString.call([value])
2. [value] instanceof [Constructor]
3. [value].constructor
4. Array.isArray([value])
5. isNaN([value])

### typeof 数据类型检测的底层机制

```js
12.5.6.1 Runtime Semantics: Evaluation
UnaryExpression : typeof UnaryExpression
Let val be the result of evaluating UnaryExpression.
If Type(val) is Reference, then
If IsUnresolvableReference(val) is true, return “undefined”.
Let val be GetValue(val).
ReturnIfAbrupt(val).
Return a String according to Table 35.

UnaryExpression: UnaryExpression的类型
设val为对UnaryExpression求值的结果。
如果类型(val)是引用，则
如果IsUnresolvableReference(val)为真，则返回“undefined”。
让val为GetValue(val)。
ReturnIfAbrupt (val)。
根据表35返回一个字符串。
```

1. 特点 1：返回的结果是字符串，字符串中包含了对应的数据类型
   > typeof typeof typeof [1,2,3]
2. 特点 2：按照计算机底层存储的二进制进行检测「效率高」

   - 计算机科学：计算机原理、进制转化、计算机网络、数据结构和算法……
   - 000 对象
   - 1 整数
   - 010 浮点数
   - 100 字符串
   - 110 布尔
   - 000000 null
   - -2^30 undefined

3. 特点 3：typeof null -> “object”

   - JS 中创建的所有类型值，在计算机底层都是按照“二进制”形式进行存储
   - typeof 检测也是根据二进制值进行检测，其中就有一条规则,如果是以“000”开始的二进制，则被识别为对象(null 存储的二进制值都是 0，符合以 000 开始)；然后再去看对象是否实现了[[call]]，实现了则为函数(返回“function”)，没实现就是对象(返回“object”)；
   - 因为是按照二进制值进行检测，所以检测速度是比较快的

4. 特点 4：typeof 对象 -> “object” && typeof 函数 -> “function”
   > 验证是否是对象的判断,typeof 检测对象类型，除函数被识别为“function”，其余都是“object”「不能细分对象」
   ```js
   if (val !== null && (typeof val === 'object' || typeof val === 'function')) {
   }
   if (val !== null && /^(object|function)$/i.test(typeof val)) {
   }
   ```
5. typeof 未被声明的变量 -> “undefined”

   > 插件封装中的暴露 API

   ```js
   ;(function () {
     let utils = {
       // ...
     }

     if (typeof window !== 'undefined') window.utils = utils
     if (typeof module === 'object' && typeof module.exports === 'object')
       module.exports = utils
   })()
   ```
