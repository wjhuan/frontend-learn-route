---
title: 函数
---

# 函数

和 `JavaScript` 一样，`TypeScript` 函数可以创建有名字的函数和匿名函数。你可以随意选择适合应用程序的方式，不论是定义一系列 `API` 函数还是只使用一次的函数。

## 函数的定义

可以指定参数的类型和返回值的类型

```typescript
function age(name: string): number {
  console.log('hello', name)
  return 25
}
hello('wangjiahuan')
```

## 函数表达式

```typescript
type GetFullnameType = (x: string, y: string) => string
let getFullname: GetFullnameType = function (firstName, lastName) {
  return firstName + lastName
}
```

## 可选参数

`TypeScript` 里的每个函数参数都是必须的。 这不是指不能传递 `null` 或 `undefined` 作为参数，而是说编译器检查用户是否为每个参数都传入了值。编译器还会假设只有这些参数会被传递进函数。 简短地说，传递给一个函数的参数个数必须与函数期望的参数个数一致。

在`TypeScript`中函数的形参和实参必须一样，不一样就要配置可选参数,而且必须是最后一个参数

```typescript
function buildName(firstName: string, lastName: string): string {
  return firstName + ' ' + lastName
}

let result1 = buildName('wangjiahuan') // Error, 参数过少
let result2 = buildName('wangjiahuan', '张三', '李四') // Error, 参数过多
let result3 = buildName('wangjiahuan', '张三') // OK
```

`JavaScript` 里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是 `undefined`。 在`TypeScript` 里我们可以在参数名旁使用 `?` 实现可选参数的功能。 比如，我们想让 `lastName` 是可选的：

```typescript
function buildName(firstName: string, lastName?: string): string {
  if (lastName) return firstName + ' ' + lastName
  else return firstName
}

let result1 = buildName('wangjiahuan') // 现在正常了
let result2 = buildName('wangjiahuan', '张三', '李四') // Error, 参数过多
let result3 = buildName('wangjiahuan', '张三') // OK
```

可选参数必须跟在必须参数后面。 如果上例我们想让 `firstName` 是可选的，那么就必须调整它们的位置，把 `firstName` 放在后面。

## 默认参数

与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面。 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 `undefined` 值来获得默认值。 例如，我们重写最后一个例子，让 firstName 是带默认值的参数：

```typescript
function buildName(firstName = '王五', lastName: string): string {
  return firstName + ' ' + lastName
}

let result1 = buildName('wangjiahuan') // Error, 参数过少
let result2 = buildName('wangjiahuan', '张三', '李四') // Error, 参数过多
let result3 = buildName('wangjiahuan', '张三') // OK， 返回 "wangjiahuan 张三"
let result4 = buildName(undefined, '张三') // OK，  返回 "王五 张三"
```

## 剩余参数

必要参数，默认参数和可选参数有个共同点：它们表示某一个参数。 有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 在 `JavaScript` 里，你可以使用 arguments 来访问所有传入的参数。
在 `TypeScript` 里，你可以把所有参数收集到一个变量里：

```typescript
function buildName(firstName: string, ...restOfName: string[]): string {
  return firstName + ' ' + restOfName.join(' ')
}

let employeeName = buildName('Joseph', 'Samuel', 'Lucas', 'MacKinzie')
```

剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个。 编译器创建参数数组，名字是你在省略号`（...）`后面给定的名字，你可以在函数体内使用这个数组。

这个省略号也会在带有剩余参数的函数类型定义上使用到：

```typescript
function buildName(firstName: string, ...restOfName: string[]): string {
  return firstName + ' ' + restOfName.join(' ')
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName
```

## 函数重载

在`TypeScript`中，表现为给同一个函数提供多个函数类型定义

```typescript
let obj: any={};
function attr(val: string): void;
function attr(val: number): void;
function attr(val:any):void {
    if (typeof val === 'string') {
        obj.name=val;
    } else {
        obj.age=val;
    }
}
attr('wangjiahuan');
attr(9);
attr(true);
console.log(obj);
```
