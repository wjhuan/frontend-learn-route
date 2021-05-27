---
title: 类
---

# 类

对于传统的 `JavaScript` 程序我们会使用函数和基于原型的继承来创建可重用的组件，但对于熟悉使用面向对象方式的程序员使用这些语法就有些棘手，因为他们用的是基于类的继承并且对象是由类构建出来的。 从 `ECMAScript 2015`，也就是 `ES6` 开始， `JavaScript` 程序员将能够使用基于类的面向对象的方式。 使用 TypeScript，我们允许开发者现在就使用这些特性，并且编译后的 `JavaScript` 可以在所有主流浏览器和平台上运行，而不需要等到下个 `JavaScript` 版本。

## 类的定义

```typescript
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return 'Hello, ' + this.greeting
  }
}

let greeter = new Greeter('world')
```

```typescript
/**
 * 当我们写一个类的时候,会得到2个类型
 * 1. 构造函数类型的函数类型
 * 2. 类的实例类型
 */
class Component {
  static myName: string = '静态名称属性'
  myName: string = '实例名称属性'
}
let com = Component
//Component类名本身表示的是实例的类型
//ts 一个类型 一个叫值
//冒号后面的是类型
//放在=后面的是值
let c: Component = new Component()
let f: typeof Component = com
```

实例上的属性需要先声明在使用，构造函数中的参数可以使用可选参数和剩余参数

```typescript
class Pointer {
  x: number // 实例上的属性必须先声明
  y: number
  constructor(x: number, y?: number, ...args: number[]) {
    this.x = x
    this.y = y as number
  }
}
let p = new Pointer(100, 200)
```

## 存取器

在 `TypeScript` 中，我们可以通过存取器`getters/setters`来改变一个类中属性的读取和赋值行为

对于存取器有下面几点需要注意的：

首先，存取器要求你将编译器设置为输出 `ECMAScript 5` 或更高。 不支持降级到 `ECMAScript 3`。其次，只带有 `get` 不带有 `set` 的存取器自动被推断为 `readonly`。这在从代码生成 `.d.ts` 文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值

```typescript
class User {
  myname: string
  constructor(myname: string) {
    this.myname = myname
  }
  get name() {
    return this.myname
  }
  set name(value) {
    this.myname = value
  }
}

let user = new User('zhufeng')
user.name = 'jiagou'
console.log(user.name)
```

## 参数属性

```typescript
class User {
  constructor(public myname: string) {}
  get name() {
    return this.myname
  }
  set name(value) {
    this.myname = value
  }
}

let user = new User('admin')
console.log(user.name)
user.name = 'wangjiahuan'
console.log(user.name)
```

## readonly

- `readonly` 修饰的变量只能在构造函数中初始化
- 在 `TypeScript` 中，`const` 是常量标志符，其值不能被重新分配
- `TypeScript` 的类型系统同样也允许将 `interface、type、 class` 上的属性标识为 `readonly`
- `readonly` 实际上只是在编译阶段进行代码检查。而 `const` 则会在运行时检查（在支持 `const` 语法的 `JavaScript` 运行时环境中）

```typescript
class Animal {
  public readonly name: string
  constructor(name: string) {
    this.name = name
  }
  changeName(name: string) {
    this.name = name
  }
}

let a = new Animal('cat')
a.changeName('miaomiao')
```

## 继承

- 子类继承父类后子类的实例就拥有了父类中的属性和方法，可以增强代码的可复用性
- 将子类公用的方法抽象出来放在父类中，自己的特殊逻辑放在子类中重写父类的逻辑
- `super`可以调用父类上的方法和属性

```typescript
class Person {
  name: string //定义实例的属性，默认省略public修饰符
  age: number
  constructor(name: string, age: number) {
    //构造函数
    this.name = name
    this.age = age
  }
  getName(): string {
    return this.name
  }
  setName(name: string): void {
    this.name = name
  }
}
class Student extends Person {
  no: number
  constructor(name: string, age: number, no: number) {
    super(name, age)
    this.no = no
  }
  getNo(): number {
    return this.no
  }
}
let s1 = new Student('wangjiahuan', 25, 1)
console.log(s1)
```

## 修饰符

`public` 修饰符（谁都可以访问到）

```typescript
class Animal {
  public name!: string // 不写public默认也是公开的
  public age!: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}
class Cat extends Animal {
  constructor(name: string, age: number) {
    super(name, age)
    console.log(this.name, this.age) // 子类访问
  }
}
let p = new Cat('Tom', 18)
console.log(p.name, p.age) // 外层访问
```

我们可以通过参数属性来简化父类中的代码

```typescript
class Animal {
  constructor(public name: string, public age: number) {
    this.name = name
    this.age = age
  }
}
```

`protected`修饰符 (自己和子类可以访问到)

```typescript
class Animal {
  constructor(protected name: string, protected age: number) {
    this.name = name
    this.age = age
  }
}
class Cat extends Animal {
  constructor(name: string, age: number) {
    super(name, age)
    console.log(this.name, this.age)
  }
}
let p = new Cat('Tom', 18)
console.log(p.name, p.age) // 无法访问
```

`private`修饰符 （除了自己都访问不到）

```typescript
class Animal {
  constructor(private name: string, private age: number) {
    this.name = name
    this.age = age
  }
}
class Cat extends Animal {
  constructor(name: string, age: number) {
    super(name, age)
    console.log(this.name, this.age) // 无法访问
  }
}
let p = new Cat('Tom', 18)
console.log(p.name, p.age) // 无法访问
```

## 静态属性方法

静态属性和静态方法是可以被子类所继承的

```typescript
class Animal {
  static type = '哺乳动物' // 静态属性
  static getName() {
    // 静态方法
    return '动物类'
  }
  private _name: string = 'Tom'

  get name() {
    // 属性访问器
    return this._name
  }
  set name(name: string) {
    this._name = name
  }
}
let animal = new Animal()
console.log(animal.name)
```

## 装饰器

- 装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的行为
- 常见的装饰器有类装饰器、属性装饰器、方法装饰器和参数装饰器
- 装饰器的写法分为普通装饰器和装饰器工厂

### 类装饰器

```typescript
function addSay(target: any) {
  target.prototype.say = function () {
    console.log('say')
  }
}
@addSay
class Person {
  say: Function
}
let person = new Person()
person.say()
```

还可以使用装饰器工厂

```typescript
function addNameEatFactory(name: string) {
  return function (constructor: Function) {
    constructor.prototype.name = name
    constructor.prototype.eat = function () {
      console.log('eat')
    }
  }
}
@addNameEatFactory('wangjiahuan')
class Person {
  name!: string
  eat!: Function
  constructor() {}
}
let p: Person = new Person()
console.log(p.name)
p.eat()
```

还可以替换类,不过替换的类要与原类结构相同

```typescript
function enhancer(constructor: Function) {
  return class {
    name: string = 'wangjiahuan'
    eat() {
      console.log('吃饭饭')
    }
  }
}
@enhancer
class Person {
  name!: string
  eat!: Function
  constructor() {}
}
let p: Person = new Person()
console.log(p.name)
p.eat()
```

### 属性装饰器

- 属性装饰器表达式会在运行时当作函数被调用，传入下列 2 个参数
- 属性装饰器用来装饰属性
  - 第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
  - 第二个参数是属性的名称
- 方法装饰器用来装饰方法

  - 第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
  - 第二个参数是方法的名称
  - 第三个参数是方法描述符

```typescript
//修饰实例属性
function upperCase(target: any, propertyKey: string) {
  let value = target[propertyKey]
  const getter = function () {
    return value
  }
  // 用来替换的setter
  const setter = function (newVal: string) {
    value = newVal.toUpperCase()
  }
  // 替换属性，先删除原先的属性，再重新定义属性
  if (delete target[propertyKey]) {
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    })
  }
}
//修饰实例方法
function noEnumerable(
  target: any,
  property: string,
  descriptor: PropertyDescriptor
) {
  console.log('target.getName', target.getName)
  console.log('target.getAge', target.getAge)
  descriptor.enumerable = true
}
//重写方法
function toNumber(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  let oldMethod = descriptor.value
  descriptor.value = function (...args: any[]) {
    args = args.map((item) => parseFloat(item))
    return oldMethod.apply(this, args)
  }
}
class Person {
  @upperCase
  name: string = 'wangjiahuan'
  public static age: number = 10
  constructor() {}
  @noEnumerable
  getName() {
    console.log(this.name)
  }
  @toNumber
  sum(...args: any[]) {
    return args.reduce((accu: number, item: number) => accu + item, 0)
  }
}
let p: Person = new Person()
for (let attr in p) {
  console.log('attr=', attr)
}
p.name = 'wjh'
p.getName()
console.log(p.sum('1', '2', '3'))
```

### 参数装饰器

- 会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元数据
  - 第 1 个参数对于静态成员是类的构造函数，对于实例成员是类的原型对象
  - 第 2 个参数的名称
  - 第 3 个参数在函数列表中的索引

```typescript
interface Person {
  age: number
}
function addAge(target: any, methodName: string, paramsIndex: number) {
  console.log(target)
  console.log(methodName)
  console.log(paramsIndex)
  target.age = 10
}
class Person {
  login(username: string, @addAge password: string) {
    console.log(this.age, username, password)
  }
}
let p = new Person()
p.login('wangjiahuan', '123456')
```

### 装饰器执行顺序

- 有多个参数装饰器时：从最后一个参数依次向前执行
- 方法和方法参数中参数装饰器先执行。
- 类装饰器总是最后执行
- 方法和属性装饰器，谁在前面谁先执行。因为参数属于方法一部分，所以参数会一直紧紧挨着方法执行
- 类比`React`组件的`componentDidMount` 先上后下、先内后外

```typescript
function Class1Decorator() {
  return function (target: any) {
    console.log('类1装饰器')
  }
}
function Class2Decorator() {
  return function (target: any) {
    console.log('类2装饰器')
  }
}
function MethodDecorator() {
  return function (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('方法装饰器')
  }
}
function Param1Decorator() {
  return function (target: any, methodName: string, paramIndex: number) {
    console.log('参数1装饰器')
  }
}
function Param2Decorator() {
  return function (target: any, methodName: string, paramIndex: number) {
    console.log('参数2装饰器')
  }
}
function PropertyDecorator(name: string) {
  return function (target: any, propertyName: string) {
    console.log(name + '属性装饰器')
  }
}

@Class1Decorator()
@Class2Decorator()
class Person {
  @PropertyDecorator('name')
  name: string = 'zhufeng'
  @PropertyDecorator('age')
  age: number = 10
  @MethodDecorator()
  greet(@Param1Decorator() p1: string, @Param2Decorator() p2: string) {}
}
/**
name属性装饰器
age属性装饰器
参数2装饰器
参数1装饰器
方法装饰器
类2装饰器
类1装饰器
 */
```

## 抽象类

- 抽象描述一种抽象的概念，无法被实例化，只能被继承
- 无法创建抽象类的实例
- 抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现，而且必须实现

抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。不同于接口，抽象类可以包含成员的实现细节。 `abstract` 关键字是用于定义抽象类和在抽象类内部定义抽象方法。

```typescript
abstract class Animal {
  abstract makeSound(): void
  move(): void {
    console.log('roaming the earth...')
  }
}
```

抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 `abstract` 关键字并且可以包含访问修饰符。

```typescript
abstract class Department {
  name: string

  constructor(name: string) {
    this.name = name
  }

  printName(): void {
    console.log('Department name: ' + this.name)
  }

  abstract printMeeting(): void // 必须在派生类中实现
}

class AccountingDepartment extends Department {
  constructor() {
    super('Accounting and Auditing') // 在派生类的构造函数中必须调用 super()
  }

  printMeeting(): void {
    console.log('The Accounting Department meets each Monday at 10am.')
  }

  generateReports(): void {
    console.log('Generating accounting reports...')
  }
}

let department: Department // 允许创建一个对抽象类型的引用
department = new Department() // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment() // 允许对一个抽象子类进行实例化和赋值
department.printName()
department.printMeeting()
department.generateReports() // 错误: 方法在声明的抽象类中不存在
```

| 名称             |                   修饰符 |
| ---------------- | -----------------------: |
| 访问控制修饰符   | private protected public |
| 只读属性         |                 readonly |
| 静态属性         |                   static |
| 抽象类、抽象方法 |                 abstract |

## 重写(override) vs 重载(overload)

- 重写是指子类重写继承自父类中的方法
- 重载是指为同一个函数提供多个类型定义

```typescript
class Animal {
  speak(word: string): string {
    return '动作叫:' + word
  }
}
class Cat extends Animal {
  speak(word: string): string {
    return '猫叫:' + word
  }
}
let cat = new Cat()
console.log(cat.speak('hello'))
//--------------------------------------------
function double(val: number): number
function double(val: string): string
function double(val: any): any {
  if (typeof val == 'number') {
    return val * 2
  }
  return val + val
}

let r = double(1)
console.log(r)
```

## 继承 vs 多态

- 继承`(Inheritance)`子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态`(Polymorphism)`由继承而产生了相关的不同的类，对同一个方法可以有不同的行为

```typescript
class Animal {
  speak(word: string): string {
    return 'Animal: ' + word
  }
}
class Cat extends Animal {
  speak(word: string): string {
    return 'Cat:' + word
  }
}
class Dog extends Animal {
  speak(word: string): string {
    return 'Dog:' + word
  }
}
let cat = new Cat()
console.log(cat.speak('hello'))
let dog = new Dog()
console.log(dog.speak('hello'))
```
