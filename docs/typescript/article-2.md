---
title: 数据类型
---

# 数据类型

## 布尔类型(boolean)

最基本的数据类型就是简单的 `true/false` 值，在`JavaScript` 和 `TypeScript` 里叫做 `boolean`（其它语言中也一样）。

```typescript
let isSucess: boolean = false
```

## 数字类型(number)

和 `JavaScript` 一样，`TypeScript` 里的所有数字都是浮点数。 这些浮点数的类型是 `number`。 除了支持十进制和十六进制字面量，`TypeScript` 还支持 `ECMAScript 2015`中引入的二进制和八进制字面量。

```typescript
let decLiteral: number = 20
let hexLiteral: number = 0x14
let binaryLiteral: number = 0b10100
let octalLiteral: number = 0o24
```

## 字符串类型(string)

`JavaScript` 程序的另一项基本操作是处理网页或服务器端的文本数据。 像其它语言里一样，我们使用 `string` 表示文本数据类型。 和 `JavaScript` 一样，可以使用双引号`（"）`或单引号`（'）`表示字符串。

```typescript
let fullname: string = 'wangjiahuan'
```

你还可以使用模版字符串，它可以定义多行文本和内嵌表达式。 这种字符串是被反引号包围（ `），并且以 ${ expr } 这种形式嵌入表达式

```typescript
let name: string = `wangjiahuan`
let age: number = 25
let sentence: string = `Hello, my name is ${name}.

I'll be ${age + 1} years old next month.`
```

## 数组类型(array)

`TypeScript` 像 `JavaScript` 一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在元素类型后面接上 `[]`，表示由此类型元素组成的一个数组：

```typescript
let arr: number[] = [1, 2, 3]
```

第二种方式是使用数组泛型，`Array<元素类型>`：

```typescript
let arr: Array<number> = [1, 2, 3]
```

## 元组类型(tuple)

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 `string` 和 `number` 类型的元组。

```typescript
let p: [string, number]
p = ['hello', 10] // OK
p = [10, 'hello'] // Error
```

当访问一个已知索引的元素，会得到正确的类型：

```typescript
console.log(p[0].substr(1)) // OK
console.log(p[1].substr(1)) // Error, 'number' 不存在 'substr' 方法
```

当访问一个越界的元素，会使用联合类型替代：

```typescript
p[3] = 'world' // OK, 字符串可以赋值给(string | number)类型
console.log(x[5].toString()) // OK, 'string' 和 'number' 都有 toString
p[6] = true // Error, 布尔不是(string | number)类型
```

元组和数组的区别：

| 元组                   | 数组                 |
| ---------------------- | -------------------- |
| 每一项可以是不同的类型 | 每一项都是同一种类型 |
| 有预定义的长度         | 没有长度限制         |
| 用于表示一个固定的结构 | 用于表示一个列表     |

## 枚举类型(enum)

- 事先考虑某一个变量的所有的可能的值，尽量用自然语言中的单词表示它的每一个值
- 比如性别、月份、星期、颜色、单位、学历

`enum` 类型是对 `JavaScript` 标准数据类型的一个补充。 像 `C#` 等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green
```

编译后的结果：

```typescript
;(function (Color) {
  Color[(Color['Red'] = 0)] = 'Red'
  Color[(Color['Green'] = 1)] = 'Green'
  Color[(Color['Blue'] = 2)] = 'Blue'
})(Color || (Color = {}))
```

默认情况下，从 `0` 开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从`1`开始编号：

```typescript
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green
```

或者，全部都采用手动赋值：

```typescript
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green
```

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为 `2`，但是不确定它映射到 `Color` 里的哪个名字，我们可以查找相应的名字：

```typescript
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2]

console.log(colorName)  // 显示'Green'因为上面代码里它的值是2
```

常数枚举

- 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
- 假如包含了计算成员，则会在编译阶段报错

```typescript
const enum Color {
    Red,
    Green,
    Blue,
}
console.log(Color.Red) // console.log(0 /* Red */);
```

## 任意类型(any)

- `any`就是可以赋值给任意类型
- 第三方库没有提供类型文件时可以使用`any`
- 类型转换遇到困难时
- 数据结构太复杂难以定义

```typescript
let root: any = document.getElementById('root')
root.style.color = 'red'
```

```typescript
let root:(HTMLElement|null)=document.getElementById('root');
root!.style.color='red';//非空断言操作符
```

## null 和 undefined

- `null` 和 `undefined` 是其它类型的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 `null` 或 `undefined`
- `strictNullChecks` 参数用于新的严格空检查模式,在严格空检查模式下， `null` 和 `undefined` 值都不属于任何一个类型，它们只能赋值给自己这种类型或者 `any`

```typescript
let x: number
x = 1
x = undefined
x = null

let y: number | null | undefined
y = 1
y = undefined
y = null
```

## void 类型

`void` 类型与 `any` 类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 `void`：

```typescript
function greeting(name: string): void {
  console.log('hello', name)
  //当我们声明一个变量类型是 void 的时候，它的非严格模式(strictNullChecks:false)下仅可以被赋值为 null 和 undefined
  //严格模式(strictNullChecks:true)下只能返回undefined
  //return null;
  //return undefined;
}
```

声明一个 `void` 类型的变量没有什么大用，因为你只能为它赋予 `undefined` 和 `null`：

```typescript
let voidType: void = undefined
```

## never 类型

`never` 类型表示的是那些永不存在的值的类型。 例如， `never` 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 `never` 类型，当它们被永不为真的类型保护所约束时。

`never` 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 never 的子类型或可以赋值给`never` 类型（除了 `never`本身之外）。 即使 `any` 也不可以赋值给 `never`。

```typescript
// 返回never的函数 必须存在 无法达到（ unreachable ） 的终点
function error(message: string): never {
  throw new Error(message)
}
let result1 = error('hello')
// 由类型推论得到返回值为 never
function fail() {
  return error('Something failed')
}
let result = fail()

// 返回never的函数 必须存在 无法达到（ unreachable ） 的终点
function infiniteLoop(): never {
  while (true) {}
}
```

strictNullChecks 模式下：

- 在 `TS` 中， `null` 和 `undefined` 是任何类型的有效值，所以无法正确地检测它们是否被错误地使用。于是 `TS` 引入了 `--strictNullChecks` 这一种检查模式
- 由于引入了 `--strictNullChecks` ，在这一模式下，`null` 和 `undefined` 能被检测到。所以 `TS` 需要一种新的底部类型`（ bottom type ）`。所以就引入了 `never`。

```typescript
// Compiled with --strictNullChecks
function fn(x: number | string) {
  if (typeof x === 'number') {
    // x: number 类型
  } else if (typeof x === 'string') {
    // x: string 类型
  } else {
    // x: never 类型
    // --strictNullChecks 模式下，这里的代码将不会被执行，x 无法被观察
  }
}
```

never 和 void 的区别：

- `void` 可以被赋值为 `null` 和 `undefined`的类型。 `never` 则是一个不包含值的类型。
- 拥有 `void` 返回值类型的函数能正常运行。拥有 `never` 返回值类型的函数无法正常返回，无法终止，或会抛出异常。

## Object 对象类型

`object` 表示非原始类型，也就是除 `number，string，boolean，symbol，null或undefined` 之外的类型。
使用 `object` 类型，就可以更好的表示像 `Object.create` 这样的 `API`。例如：

```typescript
declare function create(o: object | null): void

create({ prop: 0 }) // OK
create(null) // OK

create(42) // Error
create('string') // Error
create(false) // Error
create(undefined) // Error
```

## Symbol

- 我们在使用 `Symbol` 的时候，必须添加 `es6` 的编译辅助库
- `Symbol` 是在`ES2015`之后成为新的原始类型,它通过 `Symbol` 构造函数创建
- `Symbol` 的值是唯一不变的

```typescript
// Compiled with --strictNullChecks
const sym1 = Symbol('key')
const sym2 = Symbol('key')
Symbol('key') === Symbol('key') // false
```

## BigInt

- 使用 `BigInt` 可以安全地存储和操作大整数
- 我们在使用 `BigInt` 的时候，必须添加 `ESNext` 的编译辅助库
- 要使用`1n`需要 `"target": "ESNext"`
- `number`和 `BigInt`类型不一样,不兼容

```typescript
const max = Number.MAX_SAFE_INTEGER // 2**53-1
console.log(max + 1 === max + 2)

const max = BigInt(Number.MAX_SAFE_INTEGER)
console.log(max + 1n === max + 2n)

let foo: number
let bar: bigint
foo = bar
bar = foo
```

## 类型推论

声明变量没有赋予值时默认变量是`any`类型

```typescript
let name // 类型为any
name = 'wangjiahuan'
name = 25
```

声明变量赋值时则以赋值类型为准

```typescript
let name = 'wangjiahuan' // name被推导为字符串类型
name = 25 // error
```

## 包装对象(Wrapper Object)

- `JavaScript` 的类型分为两种：原始数据类型`（Primitive data types）`和对象类型`（Object types）`。
- 所有的原始数据类型都没有属性`（property）`

```typescript
let name = 'wangjiahuan'
console.log(name.toUpperCase())

console.log(new String('wangjiahuan').toUpperCase())
```

当调用基本数据类型方法的时候，JavaScript 会在原始数据类型和对象类型之间做一个迅速的强制性切换

```typescript
let isOK: boolean = true // 编译通过
let isOK: boolean = Boolean(1) // 编译通过
let isOK: boolean = new Boolean(1) // 编译失败   期望的 isOK 是一个原始数据类型
```

## 联合类型

- 联合类型`（Union Types）`表示取值可以为多种类型中的一种
- 未赋值时联合类型上只能访问两个类型共有的属性和方法

```typescript
let name: string | number
console.log(name.toString())
name = 3
console.log(name.toFixed(2))
name = 'wangjiahuan'
console.log(name.length)
```

## 类型断言

有时候你会遇到这样的情况，你会比 `TypeScript` 更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 `TypeScript` 会假设你，程序员，已经进行了必须的检查。

类型断言有两种形式。 其一是“尖括号”语法：

```typescript
let someValue: any = 'this is a string'

let strLength: number = (<string>someValue).length
```

另一个为 as 语法：

```typescript
let someValue: any = 'this is a string'

let strLength: number = (someValue as string).length
```

两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在 `TypeScript` 里使用 `JSX` 时，只有`as`语法断言是被允许的。

双重断言:

```typescript
interface Person {
    name: string;
    age: number;
}
const person = 'wangjiahuan' as any as Person; // ok
```

> 尽量不要使用双重断言，会破坏原有类型关系，断言为 `any` 是因为 `any` 类型可以被赋值给其他类型

## 字面量类型和类型字面量

- 字面量类型的要和实际的值的字面量一一对应,如果不一致就会报错
- 类型字面量和对象字面量的语法很相似

```typescript
const up: 'Up' = 'Up'
const down: 'Down' = 'Down'
const left: 'Left' = 'Left'
const right: 'Right' = 'Right'
type Direction = 'Up' | 'Down' | 'Left' | 'Right'
function move(direction: Direction) {}
move('Up')
```

```typescript
type Person = {
  name: string,
  age: number,
}
```

字符串字面量 vs 联合类型:

- 字符串字面量类型用来约束取值只能是某几个字符串中的一个, 联合类型（Union Types）表示取值可以为多种类型中的一种
- 字符串字面量 限定了使用该字面量的地方仅接受特定的值,联合类型 对于值并没有限定，仅仅限定值的类型需要保持一致
