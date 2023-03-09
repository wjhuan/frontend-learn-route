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

## 0.1 + 0.2 != 0.3

1. 所有值在计算机底层都是按照二进制存储的，运算也是基于二进制来的
2. 整数运算一般不会有问题, 最大安全数字`「16位」` `Number.MAX_SAFE_INTEGER === Math.pow(2,53)-1`
3. 小数运算一般会出现问题
4. 浮点数转为二进制会出现“无限循环”的情况，计算机底层存储的时候按照可以识别的最长位数存储，其余的直接干掉... 所以浮点数存储的二进制值本身就是去了精准度,所以最后运算的结果也是缺乏精准度的，而且小数最后面的零会省略，但凡不是 0，都不会省略 => 0.1+0.2=0.30000000000000004 0.1+0.6=0.7(0.70000000000....)
5. 怎么解决精度问题？
   - 将数字转成整数「扩大系数」
   - 三方库：Math.js 、decimal.js、big.js ...

> 把十进制转换为二进制、整数：除 2 取余，最后倒着拼接、小数：乘以 2，取整，一直到结果是 1 为止、[10 进制 value].toString(2)

```js
// 运算保证精准度，实现思路：把小数变为整数（乘以系数）运算,运算后的结果再除以系数
const coefficient = function coefficient(num) {
  num = String(num)
  let [, char = ''] = num.split('.'),
    len = char.length
  return Math.pow(10, len)
}
const plus = function plus(n, m) {
  n = Number(n)
  m = Number(m)
  if (isNaN(n) || isNaN(m)) return NaN
  let coeffic = Math.max(coefficient(n), coefficient(m))
  return (n * coeffic + m * coeffic) / coeffic
}
console.log(plus(0.1, 0.2))
```

## 数据类型转换的底层机制

### 把其他数据类型转换为 Number

#### Number([val])

- 一般用于浏览器的隐式转换中

  1. 数学运算
  2. isNaN 检测
  3. ==比较

- 规则
  1. 字符串转换为数字：空字符串变为`0`，如果出现任何非有效数字字符，结果都是`NaN`
  2. 把布尔转换为数字：`true->1` `false->0`
  3. `null->0` `undefined->NaN`
  4. `Symbol`无法转换为数字，会报错：`Uncaught TypeError: Cannot convert a Symbol value to a number`
  5. `BigInt`去除`n`（超过安全数字的，会按照科学计数法处理）
  6. 把对象转换为数字
     - 先调用对象的 `Symbol.toPrimitive` 这个方法，如果不存在这个方法
     - 再调用对象的 `valueOf` 获取原始值，如果获取的值不是原始值
     - 再调用对象的 `toString` 把其变为字符串
     - 最后再把字符串基于`Number`方法转换为数字
     ```js
     console.log(Number([10]))
     console.log(Number([10, 20])) // NaN  [10, 20].toString()->'10,20'->NaN
     1、[10][Symbol.toPrimitive] -> undefined // 不具备这个方法
     2、[10].valueOf() -> [10] // 不是原始值
     3、[10].toString() -> '10'
     4、Number('10') -> 10
     ```
     ```js
     let obj = { 0: 10, length: 1 }
     console.log(Number(obj)) // NaN
     1、obj[Symbol.toPrimitive] -> undefined
     2、obj.valueOf() -> // 非原始值
     3、obj.toString() -> "[object Object]"
     4、Number("[object Object]") => NaN
     ```
     ```js
     let num = new Number(10)
     onsole.log(Number(num)) // 10
     1、num[Symbol.toPrimitive] -> undefined
     2、num.valueOf() -> 10
     ```
     ```js
     let time = new Date();
     console.log(Number(time)); //1637158306237
     1、time[Symbol.toPrimitive] -> 函数
     2、time[Symbol.toPrimitive]('number')  执行这个方法可以传递三个参数 'number'/'string'/'default'  => 除了Number(对象)按照这个流程处理，String(对象)把对象变为字符串也按照这个规则处理，如果存在Symbol.toPrimitive，则执行传递的是'string'
     ```
     ```js
     console.log(parseInt('12px1312')) //12
     console.log(Number('12px1312')) //NaN
     ```
     ```js
     console.log(parseInt('')) //NaN
     console.log(Number('')) //0
     ```
     ```js
     console.log(parseInt(null)) //NaN   先变为字符串然后处理 parseInt('null')
     console.log(Number(null)) //0
     ```
     - parseInt([val],[radix]) parseFloat([val])
       1. 一般用于手动转换
       2. 规则：[val]值必须是一个字符串，如果不是则先转换为字符串；然后从字符串左侧第一个字符开始找，把找到的有效数字字符最后转换为数字「一个都没找到就是 NaN」；遇到一个非有效数字字符，不论后面是否还有有效数字字符，都不再查找了；`parseFloat`可以多识别一个小数点；
       3. [radix]
          - 在`parseInt`本身处理规则的基础上，还可以设置`[radix]`进制：在`[val]`字符串中，从左到右查找符合`[radix]`进制的内容（遇到一个不符合的则结束查找），把找到的内容当做`[radix]`进制值最后转换为`10进制`
          - 把其它进制转换为`10进制` `按权展开求和`
          ```js
          // '10011'(2进制) -> 10进制
          1*2^4 + 0*2^3 + 0*2^2 + 1*2^1 + 1*2^0 => 19
          ```
          - `[radix]`不设置（或者设置为零），则默认值是`10`；但是如果字符串是以`‘0x’`开头的，则默认值是`16`；
          - `[radix]`有取值范围：`2~36`，不在范围内，最后处理的结果都是`NaN`
          - 在浏览器中有一个特殊情况：如果数字(不是字符串)是以`0`开始的，浏览器会认为这应该是`8进制`的值，它会把`8进制`默认转化为`10进制`再处理
          ```js
          // 012 -> 10
          0*8^2+1*8^1+2*8^0 => 10
          ```

### parseInt 练习题

```js
let arr = [27.2, 0, '0013', '14px', 123]
// arr = arr.map((item, index) => {
//   console.log(item, index)
//   return '@'
// })
// console.log(arr)
arr = arr.map(parseInt)
parseInt(27.2,0) -> parseInt('27.2',10) -> 27
parseInt(0,1) -> NaN
parseInt('0013',2) -> '001' 二进制转十进制 -> 0*2^2+0*2^1+1*2^0 -> 1
parseInt('14px',3) -> '1' 三进制转十进制 -> 1*3^0 -> 1
parseInt(123,4) -> parseInt('123',4) -> '123' 四进制转十进制 -> 1*4^2+2*4^1+3*4^0 -> 27
console.log(arr) //=>[27,NaN,1,1,27]
```

## 其他数据类型转换为 String

> 其它类型值转换为字符串`String([value])`常用于隐式转换 或者 `[value].toString()`常用于显示转换

> 对象转换为字符串基于这两种方式还是有区别的

1. 对象.toString():直接调取所属类原型上的 toString 方法进行处理
2. String(对象):首先获取对象`[Symbol.toPrimitive]` 这个属性，如果存在这个属性则`对象[Symbol.toPrimitive]('string')`；如果不存在，则继续调用 `对象.valueOf()`，如果获取的是原始值则结束即可；如果不是，才会调用`toString`方法进行处理...
3. 标准普通对象调用的`toString`是`Object.prototype.toString`，是用来检测数据类型的，而不是转换为字符串的

> 常见的隐式转换为字符串情况

1. 字符串拼接「“+” 在 JS 中除了数学运算也有字符串拼接的意思」

   - 有两边，一边是字符串，一定是字符串拼接,`代码：[value]+'' => 把[value]转换为字符串`
   - 有两边，一边是对象：可能会是字符串拼接，因为其要把对象转换为数字，转换过程中如果遇到转换为字符串，则直接变为字符串拼接；如果遇不到还是数学运算；
   - 只有一边 +[value]：一定是把[value]转换为数字的

```js
console.log(12 + [13]) // '1213'
1、[13][Symbol.toPrimitive] -> [13].valueOf() -> [13].toString() "13" 直接变为字符串拼接了  => “1213”
```

```js
console.log(12 + new Date());
new Date()[Symbol.toPrimitive]('default') 'Fri Nov 19 2021 20:36:52 GMT+0800 (中国标准时间)' 字符串拼接
```

```js
console.log(12 + new Number(13)); // 25
new Number(13)[Symbol.toPrimitive] -> new Number(13).valueOf()  13 数学运算 => 25
```

```js
let i = '10'
i++ // 一定是数学运算，转换为数字累加1
i = i + 1
i += 1 // 有字符串拼接的情况
console.log(i)
```

```js
let i = '10'
console.log(10 + ++i) //++i 先把i累加1->11  再拿累加的结果和10运算  =>21 i=11
i = '10'
console.log(10 + i++) //i++ 先拿i的值和10运算，再让i累加1  =>20 i=11
```

```js
let result =
  100 + true + 21.2 + null + undefined + 'Tencent' + [] + null + 9 + false
console.log(result) // "NaNTencentnull9false"
```

## 其他数据类型转换为 Boolean

> 转换规则：除了`“0/NaN/空字符串/null/undefined”`五个值是`false`，其余都是`true`
> 出现情况

1. Boolean([val]) 或者 !/!!
2. 条件判断

## “==”比较时候的相互转换规则

> “==”相等，两边数据类型不同，需要先转为相同类型，然后再进行比较

1. 对象==字符串 对象转字符串「Symbol.toPrimitive -> valueOf -> toString」
2. null==undefined -> true null/undefined 和其他任何值都不相等
3. null===undefined -> false
4. 对象==对象 比较的是堆内存地址，地址相同则相等
5. NaN!==NaN
6. 除了以上情况，只要两边类型不一致，剩下的都是转换为数字，然后再进行比较的

> “===”绝对相等，如果两边类型不同，则直接是 false，不会转换数据类型「推荐」

```js
console.log([] == false) //都转换为数字  0==0  =>  true
console.log(![] == false) //![] 先转换为布尔再取反 false==false => true
```

## 综合练习题

```js
var a = ?;
if (a == 1 && a == 2 && a == 3) {
    console.log('OK');
}
```

> 方案一：利用==比较会把 a 转换为数字，再根据对象转数字会经理一系列的步骤，此时我们可以重写某一步骤，实现自己的需求

```js
var a = {
  i: 0,
  // 重写：Symbol.toPrimitive/valueOf/toString
  [Symbol.toPrimitive]() {
    return ++this.i
  },
}
// a == 1  Number(a) -> a[Symbol.toPrimitive]()
if (a == 1 && a == 2 && a == 3) {
  console.log('OK')
}
```

```js
var a = {
  i: 0,
  // 重写：Symbol.toPrimitive/valueOf/toString
  valueOf: function () {
    return ++this.i
  },
}
if (a == 1 && a == 2 && a == 3) {
  console.log('OK')
}
```

```js
var a = {
  i: 0,
  // 重写：Symbol.toPrimitive/valueOf/toString
  toString: function () {
    return ++this.i
  },
}
if (a == 1 && a == 2 && a == 3) {
  console.log('OK')
}
```

> 方案二：在全局上下文中基于 var 声明变量，是给 window 全局对象设置属性，再利用数据劫持，可以实现这个需求

```js
var i = 0
Object.defineProperty(window, 'a', {
  get() {
    return ++i
  },
})
if (a == 1 && a == 2 && a == 3) {
  console.log('OK')
}
```
