---
title: 泛型
---

# 泛型

1. 泛型`（Generics）`是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
2. 泛型`T`作用域只限于函数内部使用

## 泛型函数

下面来创建第一个使用泛型的例子：`identity` 函数。 这个函数会返回任何传入它的值。

不用泛型的话，这个函数可能是下面这样：

```typescript
function identity(arg: number): number {
  return arg
}
```

或者，我们使用 any 类型来定义函数：

```typescript
function identity(arg: any): any {
  return arg
}
```

使用 `any` 类型会导致这个函数可以接收任何类型的 `arg` 参数，但是这样就丢失了一些信息：传入的类型与返回的类型应该是相同的。如果我们传入一个数字，我们只知道任何类型的值都有可能被返回。

因此，我们需要一种方法使返回值的类型与传入参数的类型是相同的。这里，我们使用了类型变量，它是一种特殊的变量，只用于表示类型而不是值。

```typescript
function identity<T>(arg: T): T {
  return arg
}
```

我们给 `identity` 添加了类型变量 `T`。 `T` 帮助我们捕获用户传入的类型`（比如：number）`，之后我们就可以使用这个类型。 之后我们再次使用了 `T` 当做返回值类型。现在我们可以知道参数类型与返回值类型是相同的了。这允许我们跟踪函数里使用的类型的信息。

我们把这个版本的 `identity` 函数叫做泛型，因为它可以适用于多个类型。 不同于使用 `any`，它不会丢失信息，像第一个例子那像保持准确性，传入数值类型并返回数值类型。

我们定义了泛型函数后，可以用两种方法使用。 第一种是，传入所有的参数，包含类型参数：

```typescript
let output = identity<string>('myString')
```

这里我们明确的指定了 `T` 是 `string` 类型，并做为一个参数传给函数，使用了 `<>`括起来而不是 `()`。

第二种方法更普遍。利用了类型推论:即编译器会根据传入的参数自动地帮助我们确定 `T` 的类型：

```typescript
let output = identity('myString')
```

注意我们没必要使用尖括号`（<>）`来明确地传入类型；编译器可以查看`myString`的值，然后把 `T` 设置为它的类型。 类型推论帮助我们保持代码精简和高可读性。如果编译器不能够自动地推断出类型的话，只能像上面那样明确的传入 `T` 的类型，在一些复杂的情况下，这是可能出现的.

## 泛型变量

使用泛型创建像 `identity` 这样的泛型函数时，编译器要求你在函数体必须正确的使用这个通用的类型。 换句话说，你必须把这些参数当做是任意或所有类型。
看下之前 `identity` 例子：

```typescript
function identity<T>(arg: T): T {
  return arg
}
```

如果我们想打印出 `arg` 的长度。 我们很可能会这样做：

```typescript
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length)
  return arg
}
```

如果这么做，编译器会报错说我们使用了 `arg` 的 `.length` 属性，但是没有地方指明 `arg` 具有这个属性。记住，这些类型变量代表的是任意类型，所以使用这个函数的人可能传入的是个数字，而数字是没有 `.length` 属性的。

现在假设我们想操作 `T` 类型的数组而不直接是 `T`。由于我们操作的是数组，所以 `.length` 属性是应该存在的。我们可以像创建其它数组一样创建这个数组：

```typescript
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}
```

你可以这样理解 `loggingIdentity` 的类型：泛型函数 `loggingIdentity`，接收类型参数 `T` 和参数 `arg`，它是个元素类型是 `T` 的数组，并返回元素类型是`T` 的数组。 如果我们传入数字数组，将返回一个数字数组，因为此时 `T` 的的类型为 `number`。 这可以让我们把泛型变量 `T` 当做类型的一部分使用，而不是整个类型，增加了灵活性。

## 泛型类型

泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样：

```typescript
function identity<T>(arg: T): T {
  return arg
}

let myIdentity: <T>(arg: T) => T = identity
```

我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。

```typescript
function identity<T>(arg: T): T {
  return arg
}

let myIdentity: <U>(arg: U) => U = identity
```

我们还可以使用带有调用签名的对象字面量来定义泛型函数：

```typescript
function identity<T>(arg: T): T {
  return arg
}

let myIdentity: { <T>(arg: T): T } = identity
```

## 类数组

类数组`（Array-like Object）`不是数组类型，比如 `arguments`

```typescript
function sum() {
  let args: IArguments = arguments
  for (let i = 0; i < args.length; i++) {
    console.log(args[i])
  }
}
sum(1, 2, 3)

let root = document.getElementById('root')
let children: HTMLCollection = (root as HTMLElement).children
children.length
let nodeList: NodeList = (root as HTMLElement).childNodes
nodeList.length
```

## 泛型类

```typescript
class MyArray<T> {
  private list: T[] = []
  add(value: T) {
    this.list.push(value)
  }
  getMax(): T {
    let result = this.list[0]
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i] > result) {
        result = this.list[i]
      }
    }
    return result
  }
}
let arr = new MyArray()
arr.add(1)
arr.add(2)
arr.add(3)
let ret = arr.getMax()
console.log(ret)
```

### 泛型与 new

```typescript
function factory<T>(type: { new (): T }): T {
  return new type() // This expression is not constructable.
}
```

## 泛型接口

```typescript
interface Calculate {
  <T>(a: T, b: T): T
}
let add: Calculate = function <T>(a: T, b: T) {
  return a
}
add<number>(1, 2)
```

## 多个类型参数

```typescript
function swap<A, B>(tuple: [A, B]): [B, A] {
  return [tuple[1], tuple[0]]
}
let swapped = swap<string, number>(['a', 1])
console.log(swapped)
console.log(swapped[0].toFixed(2))
console.log(swapped[1].length)
```

## 默认泛型类型

```typescript
function createArray3<T = number>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}
let result2 = createArray3(3, 'x')
console.log(result2)
```

## 泛型约束

在函数中使用泛型的时候，由于预先并不知道泛型的类型，所以不能随意访问相应类型的属性或方法。

```typescript
function logger<T>(val: T) {
  console.log(val.length) //直接访问会报错
}
//可以让泛型继承一个接口
interface LengthWise {
  length: number
}
//可以让泛型继承一个接口
function logger2<T extends LengthWise>(val: T) {
  console.log(val.length)
}
logger2('wjh')
logger2(1)
```

## 泛型类型别名

泛型类型别名可以表达更复杂的类型

```typescript
type Cart<T> = { list: T[] } | T[]
let c1: Cart<string> = { list: ['1'] }
let c2: Cart<number> = [1]
```

## 泛型接口 vs 泛型类型别名

- 接口创建了一个新的名字，它可以在其他任意地方被调用。而类型别名并不创建新的名字，例如报错信息就不会使用别名
- 类型别名不能被 `extends` 和 `implements` ,这时我们应该尽量使用接口代替类型别名
- 当我们需要使用联合类型或者元组类型的时候，类型别名会更合适
