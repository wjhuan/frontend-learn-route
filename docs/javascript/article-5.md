---
title: 面向对象
---

# 面向对象

## 面向对象基础

- `OOP`思想：对象、类、实例
- `JS`语言本身就是基于类和实例构建和组成的
- `JS`中有很多的内置类
  1.  每一种数据类型值都有自己所属的内置类(专业叫法：构造函数)
      - 大类：`Object`
      - 小类：`Number`、`String`、`Boolean`、`Symbol`、`BigInt`、`Function`、`Array`、`RegExp`、`Date`、`Set`、`Map`....
  2.  每一 HTML 标签(或者每一个节点)，都有自己所属的内置类
      > body -> HTMLBodyElement -> HTMLElement -> Element -> Node -> EventTarget -> Object
- 创建一个函数，执行的时候，把其`new`执行，则当前函数被称为`自定义构造函数(类)`；执行的返回结果一般是当前类的一个`实例`；
  `new`多次会创造多个不同的实例对象`「实例对象的独立性」`；基于`this.xxx=xxx`是给实例对象设置`私有属性方法`；
- 普通函数执行 VS 构造函数执行

```js
function Fn(x, y) {
  let sum = 10
  this.total = x + y
  this.say = function () {
    console.log(`我计算的和是:${this.total}`)
  }
}
let res = Fn(10, 20) // 普通函数执行  Fn执行的返回值赋值给res
let f1 = new Fn(10, 20) //构造函数执行  把Fn当做一个类，f1是创造出来的一个实例
let f2 = new Fn()
console.log(f1.sum)
console.log(f1.total)
console.log(f1.say === f2.say)
```

![](./img/Xnip2021-12-03_21-28-03.jpg)

## 原型 和 原型链

> 大部分`函数数据类型`的值都具备`prototype（原型/显式原型）`属性，属性值本身是一个对象「浏览器会默认为其开辟一个堆内存，用来存储实例可调用的公共的属性和方法」，在浏览器默认开辟的这个堆内存中「原型对象」有一个默认的属性`constructor（构造函数/构造器）`，属性值是当前`函数/类本身`！！

1. 函数数据类型
   - 普通函数（实名或者匿名函数）
   - 箭头函数
   - 构造函数/类「内置类/自定义类」
   - 生成器函数 Generator
2. 不具备`prototype`的函数
   - 箭头函数
   - 基于`ES6`给对象某个成员赋值函数值的快捷操作

> 每一个`对象数据类型`的值都具备一个属性`__proto__（原型链/隐式原型）`，属性值指向`自己所属类的原型prototype`

- `Object.create(null)`创建出的对象是没有原型的

对象数据类型值

1. 普通对象
2. 特殊对象：数组、正则、日期、Math、Error…
3. 函数对象
4. 实例对象
5. 构造函数.prototype

![](./img/Xnip2021-12-05_10-44-45.jpg)

```js
function Fn() {
  this.x = 100
  this.y = 200
  this.getX = function () {
    console.log(this.x)
  }
}
Fn.prototype.getX = function () {
  console.log(this.x)
}
Fn.prototype.getY = function () {
  console.log(this.y)
}
let f1 = new Fn()
let f2 = new Fn()
console.log(f1.getX === f2.getX)
console.log(f1.getY === f2.getY)
console.log(f1.__proto__.getY === Fn.prototype.getY)
console.log(f1.__proto__.getX === f2.getX)
console.log(f1.getX === Fn.prototype.getX)
console.log(f1.constructor)
console.log(Fn.prototype.__proto__.constructor)
f1.getX()
f1.__proto__.getX()
f2.getY()
Fn.prototype.getY()
```

![](./img/Xnip2021-12-03_22-25-44.jpg)

### Object.prototype.hasOwnProperty

> 用来检测是否为私有属性

- 语法：`[对象]`.hasOwnProperty(`[属性]`)
- 检测`[属性]`是否为`[对象]`的私有属性，是返回`TRUE`，不是则返回`FALSE`；只看私有中有没有(和公有是否存在没关系)；

### in 操作符

- 语法：`[属性]` in `[对象]`
- 检测`[属性]`是否率属于这个`[对象]`，不论公有还是私有，只要能访问到这个属性，则结果就是`TRUE`

实现`Object.prototype.hasPubProperty`，用户来检测当前属性是否为对象的公有属性（无关私有中是否存在）

```js
Object.prototype.hasPubProperty = function hasPubProperty(attr) {
  // this->obj要处理的对象  attr->'toString'要检测的属性
  // 思路：跳过私有属性的查找，直接在公有属性中查找，看看是否存在
  // Object.getPrototypeOf([实例对象])：获取当前实例对象的原型对象(或者获取“实例对象.__proto__”)
  let proto = Object.getPrototypeOf(this)
  while (proto) {
    if (proto.hasOwnProperty(attr)) return true
    proto = Object.getPrototypeOf(proto)
  }
  return false
  // 思路：是对象的属性，而且还不是私有的属性，这样只能是公有属性了
  // 问题：如果attr即是私有的属性，也是公有的属性，基于这种方案检测结果是false
  // return attr in this && !this.hasOwnProperty(attr)
}
```

## Class 语法

1. 基于`Class`语法，设置的原型上的公共方法（或者静态私有方法）都是不可枚举的属性；但是基于 `xxx=xxx` 这种写法，设置的属性是可枚举的；
2. 基于`Class`语法创造的构造函数，是不能当做普通函数执行的 `Uncaught TypeError: Class constructor Modal cannot be invoked without`

```js
class Modal {
  // 构造函数体：两种写法都是给实例设置私有的属性方法
  constructor(x, y) {
    this.x = x
    this.y = y
    // this.sum = function () { };
  }
  z = 10
  sum = () => {}

  // 在原型对象上设置供实例调用的“公共方法”「基于Class语法，无法向原型上直接设置公有属性」
  getX() {
    console.log(this.x)
  }
  getY() {
    console.log(this.y)
  }

  // 把其作为普通对象，设置静态私有属性方法
  static n = 200
  static setNumber(n) {
    this.n += n
  }
}
// 向原型扩展公共属性
Modal.prototype.name = 'zhufeng'

let m = new Modal(10, 20)
console.log(m)
```

```js
function Modal(x, y) {
  // 构造函数体 this->实例
  // 这里是给实例设置的私有属性方法
  this.x = x
  this.y = y
}
//把Modal作为构造函数，在其原型对象上设置供实例调用的公共属性方法
Modal.prototype.z = 10
Modal.prototype.getX = function () {
  console.log(this.x)
}
Modal.prototype.getY = function () {
  console.log(this.y)
}
//把Modal作为普通对象，设置的静态私有属性方法
Modal.n = 200
Modal.setNumber = function (n) {
  this.n = n
}
let m = new Model(10, 20)
```

## 函数的三种角色

```js
functionFoo(){
    getName = function () {
       console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```

![](./img/Xnip2021-12-05_14-54-06.jpg)

## 重写内置 new

> 面试题：假如没有`new`关键词，需要我们自己编写`_new`方法，实现出和`new`相同的效果

```js
function Dog(name) {
  this.name = name
}
Dog.prototype.bark = function () {
  console.log('wangwang')
}
Dog.prototype.sayName = function () {
  console.log('my name is ' + this.name)
}
var sanmao = _new(Dog, '三毛', 25)
sanmao.bark() //=>"wangwang"
sanmao.sayName() //=>"my name is 三毛"
console.log(sanmao instanceof Dog) //=>true  instanceof是用来检测某个对象是否是当前构造函数的实例对象
```

`_new` 函数实现

1. 创造当前类 Ctor 的一个实例对象「`空对象`、`__proto__`===`Ctor.prototype`」
2. 把构造函数当做普通函数执行，只不过让函数中的`this`指向创建的实例对象
3. 判断函数执行的返回值，如果返回的是对象，则以自己返回的为主；否则把创建的实例对象返回！

```js
function _new(Ctor, ...params) {
  // @1 创造当前类Ctor的一个实例对象「空对象、__proto__===Ctor.prototype」
  let obj = {}
  obj.__proto__ = Ctor.prototype
  // @2 把构造函数当做普通函数执行，只不过让函数中的this指向创建的实例对象
  let result = Ctor.call(obj, ...params)
  // @3 判断函数执行的返回值，如果返回的是对象，则以自己返回的为主；否则把创建的实例对象返回！
  if (result !== null && /^(object|function)$/.test(typeof result))
    return result
  return obj
}
```

```js
function _new(Ctor, ...params) {
  let obj = {},
    result
  Object.setPrototypeOf(obj, Ctor.prototype) //给某个对象设置原型指向(也就是让obj.__proto__===Ctor.prototype)，只兼容IE11及以上 *!/
  // Object.create(proto)：创建一个空对象，并且把proto作为空对象的原型指向（空对象.__proto__===proto）；proto必须是对象或者null；如果是null则是创造一个没有原型指向的对象； 不兼容IE6~8
  let obj = Object.create(Ctor.prototype),
    result
  result = Ctor.call(obj, ...params)
  if (result !== null && /^(object|function)$/.test(typeof result))
    return result
  return obj
}
```

```js
function _new(Ctor, ...params) {
  let obj,
    result,
    proto = Ctor.prototype
  if (!proto || Ctor === Symbol || Ctor === BigInt)
    throw new TypeError('Ctor is not a constructor')
  obj = Object.create(proto)
  result = Ctor.call(obj, ...params)
  if (result !== null && /^(object|function)$/.test(typeof result))
    return result
  return obj
}
```

最终优化版本

```js
function _new(Ctor) {
  if (typeof Ctor !== 'function')
    throw new TypeError('Ctor is not a constructor')
  if (!Ctor.prototype || Ctor === Symbol || Ctor === BigInt)
    throw new TypeError('Ctor is not a constructor')
  var obj, result, params
  params = [].slice.call(arguments, 1)
  obj = Object.create(Ctor.prototype)
  result = Ctor.apply(obj, params)
  if (result !== null && /^(object|function)$/.test(typeof result))
    return result
  return obj
}
```

## 深浅拷贝

1. 浅拷贝
   > 自己创建一个新的对象，来接受你要重新复制或引用的对象值。如果对象属性是基本的数据类型，复制的就是基本类型的值给新对象；但如果属性是引用数据类型，复制的就是内存中的地址，如果其中一个对象改变了这个内存中的地址，肯定会影响到另一个对象。
   - object.assign
   - 拓展运算符
   - concat 拷贝数组
   - slice 拷贝数组
2. 深拷贝
   > 浅拷贝只是创建了一个新的对象，复制了原有对象的基本类型的值，而引用数据类型只拷贝了一层属性，再深层的还是无法进行拷贝。深拷贝则不同，对于复杂引用数据类型，其在堆内存中完全开辟了一块内存地址，并将原有的对象完全复制过来存放。深拷贝后的对象与原始对象是相互独立、不受影响的，彻底实现了内存上的分离。
   - ​JSON.stringify
     - 无法处理`BigInt`类型的属性值 `Uncaught TypeError: Do not know how to serialize a BigInt`
     - 属性值是 `undefined/symbol/function` 类型的,属性名是 `symbol` 类型的键值对会消失
     - 属性值如果是 `正则对象/错误对象` 会转换为`{}`，值和之前是不一样的
     - 日期对象变为字符串之后就无法在转换回日期对象了
     - 一但内部出现“套娃操作”`（obj.obj=obj）`，直接处理不了 `Uncaught TypeError: Converting circular structure to JSON`

### 深拷贝实现原理

```js
// 检测是否为标准普通对象(纯粹对象)
const isPlainObject = function isPlainObject(obj) {
  let proto, Ctor
  if (!obj || Object.prototype.toString.call(obj) !== '[object Object]')
    return false
  proto = getProto(obj)
  if (!proto) return true
  Ctor =
    Object.prototype.hasOwnProperty.call(proto, 'constructor') &&
    proto.constructor
  return typeof Ctor === 'function' && Ctor === Object
}
const isComplexDataType = (obj) =>
  (typeof obj === 'object' || typeof obj === 'function') && obj !== null

/* 数组/对象的深浅拷贝&深浅合并 */
const deepClone = function (obj, hash = new WeakMap()) {
  if (obj.constructor === Date) return new Date(obj) // 日期对象直接返回一个新的日期对象

  if (obj.constructor === RegExp) return new RegExp(obj) //正则对象直接返回一个新的正则对象

  //如果循环引用了就用 weakMap 来解决

  if (hash.has(obj)) return hash.get(obj)

  let allDesc = Object.getOwnPropertyDescriptors(obj)

  //遍历传入参数所有键的特性

  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)

  //继承原型链

  hash.set(obj, cloneObj)

  for (let key of Reflect.ownKeys(obj)) {
    cloneObj[key] =
      isComplexDataType(obj[key]) && typeof obj[key] !== 'function'
        ? deepClone(obj[key], hash)
        : obj[key]
  }

  return cloneObj
}
```

## 类的继承

1. 原型继承
   > 原型继承的关键： 设置 Child 原型指向 ParentChild.prototype = new Parent()。创建子类实例时，无法向父类构造函数传参

```js
function Parent(name) {
  this.name = name
  this.hobby = [] // 缺点：Parent的引用属性会被所有Child实例共享，互相干扰
}
Parent.prototype.say = function () {
  console.log('Parent say')
}
function Child(type) {
  this.type = type
}
Child.prototype = new Parent() // 原型继承的关键
```

2. 构造函数继承
   > 构造函数继承的关键： 在 Child 构造函数中执行 Parent.call(this)。我发继承父类原型上的方法

```js
function Parent(name) {
  this.name = name
  this.hobby = []
  this.speak = function () {
    console.log('Parent speak')
  } // 缺点1：new多个Child时，Parent构造函数中的方法会在每个Child中拷贝一份，浪费内存
}
Parent.prototype.say = function () {
  console.log('Parent say')
} // 缺点2：Parent原型对象上的方法不会被Child继承
function Child(name, type) {
  Parent.call(this, name) // 构造函数继承的关键
  this.type = type
}
```

3. 组合继承

- 属性使用构造函数继承 —— 避免了原型继承中 Parent 引用属性被所有 Child 实例共享的缺陷
- 方法使用原型继承 —— 避免了构造函数继承中方法重复拷贝、浪费内存的缺陷。

```js
function Parent(name) {
  this.name = name
  this.hobby = [] // 属性放在构造函数中
}
Parent.prototype.say = function () {
  // 方法放在原型中
  console.log('Parent say')
}
function Child(name, type) {
  Parent.call(this, name) // Child继承Parent属性（构造函数继承）
  this.type = type // Child扩展属性
}
Child.prototype = Object.create(Parent.prototype) // Child继承Parent方法（原型继承）
Child.prototype.speak = function () {
  // Child扩展方法
  console.log('Child speak')
}
Child.prototype.constructor = Child // 修复Child的constructor指向，否则Child的constructor会指向Parent
```

4. es6 继承：class+extends+super

- 继承父实例属性：写在父的 constructor 中，子使用 super 访问
- 继承父实例方法：写在父类体中，子实例对象.方法名
- 继承静态方法、静态属性：使用 static 声明，子构造函数.静态方法名/静态属性名

```js
class Animal {
  constructor(name, age, weight) {
    console.log('父类构造器')
    this.name = name
    this.age = age
    this.weight = weight
  }
  sayName() {
    console.log(this.name)
  }
  static animalAttr = '父类静态属性'
  static animalMethod(d) {
    return d instanceof Animal
  }
}

// 继承 1、extends关键字继承 显示调用super()
class Dog extends Animal {
  constructor(name, age, weight, type) {
    // 2、super类似于 Animal.call(this)  继承父的实例属性
    super(name, age, weight) //
    console.log('子类构造器')
    this.type = type
  }
  // 6、当子类存在与父类相同时，优先执行子类
  // sayName() {
  //   console.log('子类的sayName');
  // }
}
let d1 = new Dog('可乐', 12, '10kg', '金毛')
// console.log(d1); //Dog { name: '可乐', age: 12, weight: '10kg', type: '金毛' }
// 3、继承类体方法
d1.sayName() //可乐
// 4、继承静态属性
console.log(Dog.animalAttr) //父类静态属性
// 5、继承静态方法
console.log(Dog.animalMethod(d1)) //true
```
