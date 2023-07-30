---
title: typescript面试题
---

# typescript 面试题

## typescript 的数据类型有哪些

基本类型：`number、string、boolean、null、undefined、symbol、bigint`
数组类型：`number[]、string[]、boolean[]、Array、Array、Array`
元组类型：`[number, string, boolean]`
枚举类型：`enum Color {Red, Green, Blue}`
Any 类型：`any`
Void 类型：`void`
Object 类型：`object、Object`
Never 类型：`never`

## TypeScript 中枚举类型的理解

枚举类型是 TypeScript 中的一种数据类型，它允许我们定义一些具名的常量集合。使用枚举类型可以更加直观地表达代码含义，提高代码可读性和可维护性。
在 TypeScript 中，枚举类型通过 enum 关键字进行定义。例如：

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```

在这个例子中，我们定义了一个名为 Direction 的枚举类型，其中包含了四个常量成员：Up、Down、Left 和 Right。默认情况下，枚举成员的值会从 0 开始自动编号，也可以手动指定值

## TypeScript 中接口的理解

在 TypeScript 中，接口（Interface）是一种抽象的定义，用来描述对象的形状。它定义了一个对象应该具有的属性和方法。

接口的应用场景很广泛，例如在定义函数参数时，可以使用接口来规范参数的类型和结构；在定义类时，可以使用接口来规范类的结构；在定义复杂的对象类型时，可以使用接口来提高代码的可读性和可维护性。

```ts
// 先定义一个接口
interface IUser {
  name: string
  age: number
}
const getUserInfo = (user: IUser): string => {
  return `name: ${user.name}, age: ${user.age}`
}
// 正确的调用
getUserInfo({ name: 'koala', age: 18 })
```

## TypeScript 中类的理解

在 TypeScript 中，类是一种定义对象属性和方法的结构化方式，使用 class 关键字来定义。

类可以包含属性和方法，通过实例化类可以创建对象，对象可以访问类中定义的属性和方法。

与 JavaScript 不同的是，TypeScript 中的类可以使用访问修饰符来控制属性和方法的访问级别，如 public(默认值，可以自由的访问类程序里定义的成员)、private(只能够在该类的内部进行访问) 和 protected(除了在该类的内部可以访问，还可以在子类中仍然可以访问)。

类也可以继承其他类，使用 extends 关键字来实现继承，从而可以复用已有的类定义。

类还可以实现接口，这种方式称为类实现接口，使用 implements 关键字来实现接口。

总的来说，类是面向对象编程的基本组成部分，可以通过类来创建具有一定属性和行为的对象，并且 TypeScript 中的类支持访问修饰符和继承等面向对象编程的概念，使得代码更加规范和易于维护。

## TypeScript 中泛型的理解？

在 TypeScript 中，泛型可以让我们在定义函数、类、接口时不预先定义具体的类型，而是在使用时再指定类型。这使得代码更加灵活且可复用性更高。
以下是一些泛型的基本概念：

1. 泛型函数：使用泛型来定义函数的参数和返回值类型。

```ts
function identity<T>(arg: T): T {
  return arg
}
```

定义泛型的时候，可以一次定义多个类型参数，比如我们可以同时定义泛型 T 和 泛型 U：

2. 泛型接口：使用泛型来定义接口的属性或方法

```ts
interface Array<T> {
  length: number
  push(...items: T[]): void
  forEach(callbackfn: (value: T, index: number, array: T[]) => void): void
}
```

3. 泛型类：使用泛型来定义类的属性和方法的类型。

```ts
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}
let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function (x, y) {
  return x + y
}
```

## TypeScript 中高级类型的理解？

1. 交叉类型
   使用&符号表示，可以将多个类型合并成一个类型。
2. 联合类型
   使用|符号表示，可以表示一个值属于多种类型之一。
3. 类型别名
   使用 type 关键字定义一个类型别名，方便在其他地方引用该类型。
4. 类型索引
   keyof 类似于 Object.keys ，用于获取一个接口中 Key 的联合类型。

```ts
interface Button {type: stringtext: string}type ButtonKeys = keyof Button
```

## TypeScript 中 type 与 interface 区别

- type 可以定义基本类型、联合类型、元组和其他自定义类型，而 interface 只能定义对象类型。
- interface 支持继承，而 type 不支持。
- 当定义类型别名时，type 可以使用联合类型、交叉类型和条件类型等高级类型，而 interface 不支持。
- type 是对类型的重新定义，而 interface 是对类型的声明。在某些情况下，type 可以使用更通用的语法，使得类型定义更加简洁易懂
- 在定义类型时，interface 可以使用 extends、implements 和 keyof 等关键字来增强类型的功能。

## 什么是 any 类型，何时使用 ？

有时你想将值存储在变量中，但事先不知道该变量的类型

当你没有明确提供类型时，TypeScript 假定变量是 any 类型，并且编译器无法从周围的上下文中推断出类型
