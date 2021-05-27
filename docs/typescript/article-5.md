---
title: 接口
---

# 接口

`TypeScript` 的核心原则之一是对值所具有的结构进行类型检查。它有时被称做“鸭式辨型法”或“结构性子类型化”。 在 `TypeScript` 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约

- 接口一方面可以在面向对象编程中表示为行为的抽象，另外可以用来描述对象的形状
- 接口就是把一些类中共有的属性和方法抽象出来,可以用来约束实现此接口的类
- 一个类可以继承另一个类并实现多个接口
- 接口像插件一样是用来增强类的，而抽象类是具体类的抽象概念
- 一个类可以实现多个接口，一个接口也可以被多个类实现，但一个类的可以有多个子类，但只能有一个父类
- `interface`中可以用分号或者逗号分割每一项，也可以什么都不加

## 对象的形状

```typescript
//接口可以用来描述对象的形状,少属性或者多属性都会报错
interface Speakable {
  speak(): void
  name?: string //？表示可选属性
}

let speakman: Speakable = {
  speak() {}, //少属性会报错
  name,
  age, //多属性也会报错
}
```

## 行为的抽象

```typescript
//接口可以在面向对象编程中表示为行为的抽象
interface Speakable {
  speak(): void
}
interface Eatable {
  eat(): void
}
//一个类可以实现多个接口
class Person implements Speakable, Eatable {
  speak() {
    console.log('Person说话')
  }
  eat() {}
}
class TangDuck implements Speakable {
  speak() {
    console.log('TangDuck说话')
  }
  eat() {}
}
```

## 任意属性

```typescript
//无法预先知道有哪些新的属性的时候,可以使用 `[propName:string]:any`,propName名字是任意的
interface Person {
  readonly id: number
  name: string
  [propName: string]: any
}

let p1 = {
  id: 1,
  name: 'wjh',
  age: 25,
}
```

## 接口的继承

和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。

```typescript
interface Shape {
  color: string
}

interface Square extends Shape {
  sideLength: number
}

let square = {} as Square
square.color = 'blue'
square.sideLength = 10
```

一个接口可以继承多个接口，创建出多个接口的合成接口。

```typescript
interface Shape {
  color: string
}

interface PenStroke {
  penWidth: number
}

interface Square extends Shape, PenStroke {
  sideLength: number
}

let square = {} as Square
square.color = 'blue'
square.sideLength = 10
square.penWidth = 5.0
```

## readonly

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 `readonly` 来指定只读属性:

```typescript
interface Point {
  readonly x: number
  readonly y: number
}
```

你可以通过赋值一个对象字面量来构造一个 `Point`。 赋值后，`x` 和 `y` 再也不能被改变了。

```typescript
let p1: Point = { x: 10, y: 20 }
p1.x = 5 // error!
```

`TypeScript` 具有 `ReadonlyArray<T>` 类型，它与 `Array<T>` 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：

```typescript
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a
ro[0] = 12 // error!
ro.push(5) // error!
ro.length = 100 // error!
a = ro // error!
```

上面代码的最后一行，可以看到就算把整个 `ReadonlyArray` 赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：

```typescript
a = ro as number[]
```

### readonly vs const

最简单判断该用 `readonly` 还是 `const` 的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 `const`，若做为属性则使用 `readonly`

## 函数类型

接口能够描述 `JavaScript` 中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。

为了使用接口表示函数类型，我们需要给接口定义一个调用签名。它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean
}
```

这样定义后，我们可以像使用其它接口一样使用这个函数类型的接口。 下例展示了如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。

```typescript
let mySearch: SearchFunc
mySearch = function (source: string, subString: string): boolean {
  let result = source.search(subString)
  return result > -1
}
```

对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。 比如，我们使用下面的代码重写上面的例子：

```typescript
let mySearch: SearchFunc
mySearch = function (src: string, sub: string): boolean {
  let result = src.search(sub)
  return result > -1
}
```

函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。 如果你不想指定类型，`TypeScript` 的类型系统会推断出参数类型，因为函数直接赋值给了 `SearchFunc` 类型变量。 函数的返回值类型是通过其返回值推断出来的（此例是 `false` 和 `true`）。 如果让这个函数返回数字或字符串，类型检查器会警告我们函数的返回值类型与 `SearchFunc` 接口中的定义不匹配。

```typescript
let mySearch: SearchFunc
mySearch = function (src, sub) {
  let result = src.search(sub)
  return result > -1
}
```

## 索引类型

与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型，可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。

- 对数组和对象进行约束
- `UserInterface` 表示`index`的类型是 `number`，那么值的类型必须是 `string`
- `UserInterface2` 表示`index`的类型是 `string`，那么值的类型必须是 `string`

```typescript
interface UserInterface {
  [index: number]: string
}
let arr: UserInterface = ['wjh1', 'wjh2']
console.log(arr)

interface UserInterface2 {
  [index: string]: string
}
let obj: UserInterface2 = { name: 'wjh' }
```

你可以将索引签名设置为只读，这样就防止了给索引赋值

```typescript
interface ReadonlyStringArray {
  readonly [index: number]: string
}
let myArray: ReadonlyStringArray = ['Alice', 'Bob']
myArray[2] = 'Mallory' // error!
```

## 类类型

与 `C#` 或 `Java` 里接口的基本作用一样，`TypeScript` 也能够用它来明确的强制一个类去符合某种契约。

```typescript
interface ClockInterface {
  currentTime: Date
}

class Clock implements ClockInterface {
  currentTime: Date
  constructor(h: number, m: number) {}
}
```

你也可以在接口中描述一个方法，在类里实现它，如同下面的 `setTime` 方法一样：

```typescript
interface ClockInterface {
  currentTime: Date
  setTime(d: Date)
}

class Clock implements ClockInterface {
  currentTime: Date
  setTime(d: Date) {
    this.currentTime = d
  }
  constructor(h: number, m: number) {}
}
```

接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员

## 构造函数类型

在 `TypeScript` 中，我们可以用 `interface` 来描述类，同时也可以使用`interface`里特殊的`new()`关键字来描述类的构造函数类型

```typescript
class Animal {
  constructor(public name: string) {}
}
//不加new是修饰函数的,加new是修饰类的
interface WithNameClass {
  new (name: string): Animal
}
function createAnimal(clazz: WithNameClass, name: string) {
  return new clazz(name)
}
let a = createAnimal(Animal, 'tom')
console.log(a.name)
```

## 混合类型

一个对象可以同时做为函数和对象使用，并带有额外的属性

```typescript
interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = function (start: number) {} as Counter
  counter.interval = 123
  counter.reset = function () {}
  return counter
}

let c = getCounter()
c(10)
c.reset()
c.interval = 5.0
```

## 接口继承类

当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的 `private` 和 `protected` 成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现`implement`。

当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。 这个子类除了继承至基类外与基类没有任何关系。例：

```typescript
class Control {
  private state: any
}

interface SelectableControl extends Control {
  select(): void
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}

// Error：“ImageC”类型缺少“state”属性。
class ImageC implements SelectableControl {
  select() {}
}
```

在上面的例子里，`SelectableControl` 包含了 `Control` 的所有成员，包括私有成员 `state`。 因为 `state` 是私有成员，所以只能够是 `Control` 的子类们才能实现 `SelectableControl` 接口。 因为只有 `Control` 的子类才能够拥有一个声明于`Control` 的私有成员 `state`，这对私有成员的兼容性是必需的。

在 `Control` 类内部，是允许通过 `SelectableControl` 的实例来访问私有成员 `state` 的。 实际上，`SelectableControl` 接口和拥有 `select` 方法的 `Control` 类是一样的。`Button`和 `TextBox` 类是 `SelectableControl` 的子类（因为它们都继承自`Control` 并有 `select` 方法），但 `ImageC` 类并不是这样的。

## 抽象类 vs 接口

- 不同类之间公有的属性或方法，可以抽象成一个接口`（Interfaces）`
- 而抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 抽象类本质是一个无法被实例化的类，其中能够实现方法和初始化属性，而接口仅能够用于描述,既不提供方法的实现，也不为属性进行初始化
- 一个类可以继承一个类或抽象类，但可以实现`（implements）`多个接口
- 抽象类也可以实现接口

```typescript
abstract class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  abstract speak(): void
}
interface Flying {
  fly(): void
}
class Duck extends Animal implements Flying {
  speak() {
    console.log('汪汪汪')
  }
  fly() {
    console.log('我会飞')
  }
}
let duck = new Duck('tom')
duck.speak()
duck.fly()
```
