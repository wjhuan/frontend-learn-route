---
title: 类型变换
---

# 类型变换

## 类型推断

`TypeScript` 能根据一些简单的规则推断变量的类型

### 从右向左

- 变量的类型可以由定义推断
- 这是一个从右向左流动类型的示例

```typescript
let num = 1 // num 是 'number'
let bar = 'bar' // bar 是 'string'
//num = bar; // Error: 不能将 'string' 赋值给 `number`
```

### 底部流出

返回类型能被 `return` 语句推断

```typescript
function add(a: number, b: number) {
  return a + b
}
let c = add(1, 2)
```

### 从左向右

函数参数类型/返回值类型也能通过赋值来推断

```typescript
type Sum = (a: number, b: number) => number
let sum: Sum = (a, b) => {
  a = '1'
  return a + b
}
```

### 结构化

推断规则也适用于结构化的存在(对象字面量)

```typescript
const person = {
  name: 'wjh',
  age: 25,
}
let name = person.name
let age = person.age
age = 'hello' // Error：不能把 'string' 类型赋值给 'number' 类型
```

### 解构

推断规则也适用于解构

```typescript
const person = {
  name: 'wjh',
  age: 25,
}
let name = person.name
let age = person.age
age = 'hello' // Error：不能把 'string' 类型赋值给 'number' 类型
```

### DefaultProps

```typescript
interface DefaultProps {
  name?: string
  age?: number
}
let defaultProps: DefaultProps = {
  name: 'wjh',
  age: 25,
}

let props = {
  ...defaultProps,
  home: '北京',
}
type Props = typeof props
```

### 小心使用返回值

尽管 `TypeScript` 一般情况下能推断函数的返回值，但是它可能并不是你想要的

```typescript
function addOne(a: any) {
  return a + 1
}
function sum(a: number, b: number) {
  return a + addOne(b)
}

type Ret = ReturnType<typeof sum>
```

## 交叉类型

- 交叉类型`(Intersection Types)`是将多个类型合并为一个类型
- 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性

```typescript
// TypeScript 交叉类型是将多个类型合并为一个类型
// 这让我们可以把现有的多种类型叠加到一起成为一种类型
// 它包含了所需的所有类型的特性

export {}
//接口的交叉
interface Bird {
  name: string
  fly(): void
}
interface Person {
  name: string
  talk(): void
}
type BirdPerson = Bird & Person
let p: BirdPerson = { name: 'bird', fly() {}, talk() {} }
p.fly
p.name
p.talk
```

```typescript
interface X {
  a: string
  b: string
}

interface Y {
  a: number
  c: string
}

type XY = X & Y
type YX = Y & X
//c = string & number
//let p1: XY={a:'',b:'',c:''};
```

联合类型的交叉类型

```typescript
type Ta = string | number
type Tb = number | boolean
type Tc = Ta & Tb
```

## typeof

可以获取一个变量的类型

```typescript
//先定义类型，再定义变量
type People = {
  name: string
  age: number
  gender: string
}
let p1: People = {
  name: 'wjh',
  age: 25,
  gender: 'male',
}
```

```typescript
//先定义变量，再定义类型
let p1 = {
  name: 'wjh',
  age: 25,
  gender: 'male',
}
type People = typeof p1
function getName(p: People): string {
  return p.name
}
getName(p1)
```

## 索引访问操作符

可以通过`[]`获取一个类型的子类型

```typescript
interface Person {
  name: string
  age: number
  job: {
    name: string
  }
  interests: { name: string; level: number }[]
}
let FrontEndJob: Person['job'] = {
  name: '前端工程师',
}
let interestLevel: Person['interests'][0]['level'] = 2
```

## keyof

索引类型查询操作符

```typescript
interface Person {
  name: string
  age: number
  gender: 'male' | 'female'
}
//type PersonKey = 'name'|'age'|'gender';
type PersonKey = keyof Person

function getValueByKey(p: Person, key: PersonKey) {
  return p[key]
}
let val = getValueByKey({ name: 'wjh', age: 25, gender: 'male' }, 'name')
console.log(val)
```

## 映射类型

在定义的时候用 `in` 操作符去批量定义类型中的属性

```typescript
interface Person {
  name: string
  age: number
  gender: 'male' | 'female'
}
//批量把一个接口中的属性都变成可选的
type PartPerson = {
  [Key in keyof Person]?: Person[Key]
}

let p1: PartPerson = {}
//也可以使用泛型
type Part<T> = {
  [key in keyof T]?: T[key]
}
let p2: Part<Person> = {}
```

通过 `key`的数组获取值的数组

```typescript
function pick<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map((n) => o[n])
}
let user = { id: 1, name: 'wjh' }
type User = typeof user
const res = pick<User, keyof User>(user, ['id', 'name'])
console.log(res)
```

## 条件类型

在定义泛型的时候能够添加进逻辑分支，以后泛型更加灵活

### 定义条件类型

```typescript
interface Fish {
  name: string
}
interface Water {
  name: string
}
interface Bird {
  name: string
}
interface Sky {
  name: string
}
//若 T 能够赋值给 Fish，那么类型是 Water,否则为 Sky
type Condition<T> = T extends Fish ? Water : Sky
let condition: Condition<Fish> = { name: '水' }
```

### 条件类型的分发

```typescript
interface Fish {
  fish: string
}
interface Water {
  water: string
}
interface Bird {
  bird: string
}
interface Sky {
  sky: string
}
//naked type
type Condition<T> = T extends Fish ? Water : Sky

//(Fish extends Fish ? Water : Sky) | (Bird extends Fish ? Water : Sky)
// Water|Sky
let condition1: Condition<Fish | Bird> = { water: '水' }
let condition2: Condition<Fish | Bird> = { sky: '天空' }
```

条件类型有一个特性,就是`「分布式有条件类型」`,但是分布式有条件类型是有前提的,条件类型里待检查的类型必须是`naked type parameter`

```typescript
// none naked type
// type Condition<T> = [T] extends [Fish] ? Water : Sky;
```

找出`T`类型中`U`不包含的部分

```typescript
// never会被自动过滤
type Diff<T, U> = T extends U ? never : T

type R = Diff<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'> // "b" | "d"

type Filter<T, U> = T extends U ? T : never
type R1 = Filter<string | number | boolean, number>
```

## 内置条件类型

### Exclude

从 `T` 可分配给的类型中排除 `U`

```typescript
type Exclude<T, U> = T extends U ? never : T

type E = Exclude<string | number, string>
let e: E = 10
```

### Extract

从 `T` 可分配的类型中提取 `U`

```typescript
type Extract<T, U> = T extends U ? T : never

type E = Extract<string | number, string>
let e: E = '1'
```

### NonNullable

从 `T` 中排除 `null` 和 `undefined`

```typescript
type NonNullable<T> = T extends null | undefined ? never : T

type E = NonNullable<string | number | null | undefined>
let e: E = null
```

### ReturnType

获取函数类型的返回类型

```typescript
type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any
function getUserInfo() {
  return { name: 'wjh', age: 25 }
}

// 通过 ReturnType 将 getUserInfo 的返回值类型赋给了 UserInfo
type UserInfo = ReturnType<typeof getUserInfo>

const userA: UserInfo = {
  name: 'wjh',
  age: 25,
}
```

### Parameters

```typescript
type Parameters<T> = T extends (...args: infer R) => any ? R : any

type T0 = Parameters<() => string> // []
type T1 = Parameters<(s: string) => void> // [string]
type T2 = Parameters<<T>(arg: T) => T> // [unknown]
```

### InstanceType

获取构造函数类型的实例类型

```typescript
type Constructor = new (...args: any[]) => any
type ConstructorParameters<T extends Constructor> = T extends new (
  ...args: infer P
) => any
  ? P
  : never
type InstanceType<T extends Constructor> = T extends new (
  ...args: any[]
) => infer R
  ? R
  : any

class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
  getName() {
    console.log(this.name)
  }
}
//构造函数参数
type constructorParameters = ConstructorParameters<typeof Person>
let params: constructorParameters = ['wjh']
//实例类型
type Instance = InstanceType<typeof Person>
let instance: Instance = { name: 'wjh', getName() {} }
```

## 内置工具类型

- TS 中内置了一些工具类型来帮助我们更好地使用类型系统
- TypeScript 中增加了对映射类型修饰符的控制
- 具体而言，一个 `readonly` 或 `?` 修饰符在一个映射类型里可以用前缀 `+` 或`-`来表示这个修饰符应该被添加或移除

| 符号 | 含义     |
| ---- | -------- |
| +?   | 变为可选 |
| -?   | 变为必选 |

### Partial

`Partial` 可以将传入的属性由非可选变为可选，具体使用如下：

```typescript
// 实现
type Partial<T> = { [P in keyof T]?: T[P] }

interface A {
  a1: string
  a2: number
  a3: boolean
}

type aPartial = Partial<A>

const a: aPartial = {} // 不会报错
```

### 类型递归

```typescript
interface Company {
  id: number
  name: string
}

interface Person {
  id: number
  name: string
  company: Company
}
type DeepPartial<T> = {
  [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U]
}

type R2 = DeepPartial<Person>
```

### Required

- `Required` 可以将传入的属性中的可选项变为必选项，这里用了 `-?` 修饰符来实现。

```typescript
interface Person {
  name: string
  age: number
  gender?: 'male' | 'female'
}
/**
 * type Require<T> = { [P in keyof T]-?: T[P] };
 */
let p: Required<Person> = {
  name: 'wjh',
  age: 25,
  //gender:'male'
}
```

### Readonly

`Readonly` 通过为传入的属性每一项都加上 `readonly` 修饰符来实现。

```typescript
interface Person {
  name: string
  age: number
  gender?: 'male' | 'female'
}
//type Readonly<T> = { readonly [P in keyof T]: T[P] };
let p: Readonly<Person> = {
  name: 'wjh',
  age: 25,
  gender: 'male',
}
p.age = 11
```

### Pick

`Pick` 能够帮助我们从传入的属性中摘取某一项返回

```typescript
interface Animal {
  name: string
  age: number
  gender: number
}
/**
 * From T pick a set of properties K
 * type Pick<T, K extends keyof T> = { [P in K]: T[P] };
 */
// 摘取 Animal 中的 name 属性
interface Person {
  name: string
  age: number
  married: boolean
}
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result: any = {}
  keys.map((key) => {
    result[key] = obj[key]
  })
  return result
}
let person: Person = { name: 'wjh', age: 25, married: true }
let result: Pick<Person, 'name' | 'age'> = pick<Person, 'name' | 'age'>(
  person,
  ['name', 'age']
)
console.log(result)
```

### Record

- `Record` 是 `TypeScript` 的一个高级类型
- 他会将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型

```typescript
type Point = 'x' | 'y'
type PointList = Record<Point, { value: number }>
const cars: PointList = {
  x: { value: 10 },
  y: { value: 20 },
}
```
