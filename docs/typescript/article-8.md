---
title: 类型保护
---

# 类型保护

- 类型保护就是一些表达式，他们在编译的时候就能通过类型信息确保某个作用域内变量的类型
- 类型保护就是能够通过关键字判断出分支中的类型

## typeof 类型保护

```typescript
function double(input: string | number | boolean) {
  if (typeof input === 'string') {
    return input + input
  } else {
    if (typeof input === 'number') {
      return input * 2
    } else {
      return !input
    }
  }
}
```

## instanceof 类型保护

```typescript
class Animal {
  name!: string
}
class Bird extends Animal {
  swing!: number
}
function getName(animal: Animal) {
  if (animal instanceof Bird) {
    console.log(animal.swing)
  } else {
    console.log(animal.name)
  }
}
```

## null 保护

如果开启了`strictNullChecks`选项，那么对于可能为`null`的变量不能调用它上面的方法和属性

```typescript
function getFirstLetter(s: string | null) {
  //第一种方式是加上null判断
  if (s == null) {
    return ''
  }
  //第二种处理是增加一个或的处理
  s = s || ''
  return s.charAt(0)
}
//它并不能处理一些复杂的判断，需要加非空断言操作符
function getFirstLetter2(s: string | null) {
  function log() {
    console.log(s!.trim())
  }
  s = s || ''
  log()
  return s.charAt(0)
}
```

## 链判断运算符

- 链判断运算符是一种先检查属性是否存在，再尝试访问该属性的运算符，其符号为 `?.`
- 如果运算符左侧的操作数 `?.` 计算为 `undefined` 或 `null`，则表达式求值为 `undefined` 。否则，正常触发目标属性访问，方法或函数调用。

```typescript
a?.b //如果a是null/undefined,那么返回undefined，否则返回a.b的值.
a == null ? undefined : a.b

a?.[x] //如果a是null/undefined,那么返回undefined，否则返回a[x]的值
a == null ? undefined : a[x]

a?.b() // 如果a是null/undefined,那么返回undefined
a == null ? undefined : a.b() //如果a.b不函数的话抛类型错误异常,否则计算a.b()的结果

a?.() //如果a是null/undefined,那么返回undefined
a == null ? undefined : a() //如果A不是函数会抛出类型错误
//否则 调用a这个函数
```

## 可辨识的联合类型

```typescript
interface WarningButton {
  class: 'warning'
}
interface DangerButton {
  class: 'danger'
}
function createButton(button: WarningButton | DangerButton) {
  if (button.class == 'warning') {
    button // WarningButton
  } else {
    button // DangerButton
  }
}
```

## in 类型保护

`in` 运算符可以被用于参数类型的判断

```typescript
interface Fish {
  swiming: string
}
interface Bird {
  fly: string
  leg: number
}
function getType(animal: Fish | Bird) {
  if ('swiming' in animal) {
    animal // Fish
  } else {
    animal // Bird
  }
}
```

## 自定义类型保护

- `TypeScript` 里的类型保护本质上就是一些表达式，它们会在运行时检查类型信息，以确保在某个作用域里的类型是符合预期的
- `type is Type1Class`就是类型谓词
- 谓词为 `parameterName is Type`这种形式，`parameterName`必须是来自于当前函数签名里的一个参数名
- 每当使用一些变量调用`isType1`时，如果原始类型兼容，`TypeScript`会将该变量缩小到该特定类型

```typescript
function isType1(type: Type1Class | Type2Class): type is Type1Class {
  return (<Type1Class>type).func1 !== undefined
}
```

```typescript
interface Bird {
  swing: number
}

interface Dog {
  leg: number
}

//没有相同字段可以定义一个类型保护函数
function isBird(x: Bird | Dog): x is Bird {
  return (<Bird>x).swing == 2
  //return (x as Bird).swing == 2;
}

function getAnimal(x: Bird | Dog) {
  if (isBird(x)) {
    return x.swing
  }
  return x.leg
}
```

## unknown

- `TypeScript 3.0` 引入了新的 `unknown` 类型，它是 `any` 类型对应的安全类型
- `unknown` 和 `any` 的主要区别是 `unknown` 类型会更加严格：在对 `unknown` 类型的值执行大多数操作之前，我们必须进行某种形式的检查。而在对 `any` 类型的值执行操作之前，我们不必进行任何检查

### any 类型

- 在 `TypeScript` 中，任何类型都可以被归为 `any` 类型。这让 `any` 类型成为了类型系统的 顶级类型 (也被称作 全局超级类型)。
- `TypeScript` 允许我们对 `any` 类型的值执行任何操作，而无需事先执行任何形式的检查

```typescript
let value: any

value = true // OK
value = 42 // OK
value = 'Hello World' // OK
value = [] // OK
value = {} // OK
value = Math.random // OK
value = null // OK
value = undefined // OK

let value: any
value.foo.bar // OK
value.trim() // OK
value() // OK
new value() // OK
```

### unknown 类型

- 就像所有类型都可以被归为 `any`，所有类型也都可以被归为 `unknown`。这使得 `unknown` 成为 `TypeScript` 类型系统的另一种顶级类型（另一种是 `any`）
- 任何类型都可以赋值给`unknown`类型

```typescript
let value: unknown

value = true // OK
value = 42 // OK
value = 'Hello World' // OK
value = [] // OK
value = {} // OK
value = Math.random // OK
value = null // OK
value = undefined // OK
value = new TypeError() // OK
```

`unknown`类型只能被赋值给`any`类型和`unknown`类型本身

```typescript
let value: unknown
let value1: unknown = value // OK
let value2: any = value // OK
let value3: boolean = value // Error
let value4: number = value // Error
let value5: string = value // Error
let value6: object = value // Error
let value7: any[] = value // Error
let value8: Function = value // Error
```

### 缩小 unknown 类型范围

- 如果没有类型断言或类型细化时，不能在 unknown 上面进行任何操作
- typeof
- instanceof
- 自定义类型保护函数
- 可以对 unknown 类型使用类型断言

```typescript
const value: unknown = 'Hello World'
const someString: string = value as string
```

### 联合类型中的 unknown 类型

在联合类型中，`unknown` 类型会吸收任何类型。这就意味着如果任一组成类型是 `unknown`，联合类型也会相当于 `unknown`：

```typescript
type UnionType1 = unknown | null // unknown
type UnionType2 = unknown | undefined // unknown
type UnionType3 = unknown | string // unknown
type UnionType4 = unknown | number[] // unknown
```

### 交叉类型中的 unknown 类型

在交叉类型中，任何类型都可以吸收 `unknown` 类型。这意味着将任何类型与 `unknown` 相交不会改变结果类型

```typescript
type IntersectionType1 = unknown & null // null
type IntersectionType2 = unknown & undefined // undefined
type IntersectionType3 = unknown & string // string
type IntersectionType4 = unknown & number[] // number[]
type IntersectionType5 = unknown & any // any
```

### never 是 unknown 的子类型

```typescript
type isNever = never extends unknown ? true : false
```

### keyof unknown 等于 never

```typescript
type key = keyof unknown
```

### 只能对 unknown 进行等或不等操作，不能进行其它操作

```typescript
un1 === un2
un1 !== un2
un1 += un2
```

### 不能做任何操作

- 不能访问属性
- 不能作为函数调用
- 不能当作类的构造函数不能创建实例

```typescript
un.name
un()
new un()
```

### 映射属性

如果映射类型遍历的时候是`unknown`,不会映射属性

```typescript
type getType<T> = {
  [P in keyof T]: number
}
type t = getType<unknown>
```
