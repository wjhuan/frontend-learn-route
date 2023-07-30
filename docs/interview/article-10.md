---
title: 算法面试题
---

# 算法面试题

## 算法时间复杂度

![](./img/time.png)

### O(1)

代码就是平铺直叙的执行，没有任何循环。

### O(logn)

有循环，但其中使用了二分法，例如：二分查找算法

二分法是非常重要的算法思维，它可以极大的减少复杂度，而且计算量越大、减少的越明显。可以看看本文上面的图。

### O(n)

普通的循环。

### O(n\*logn)

嵌套循环，一层是普通循环，一层有二分算法。例如：快速排序算法。

### O(n^2)

两个普通循环的嵌套，例如常见的冒泡排序。

## 常见数据结构

### 栈 Stack

栈 Stack 是一种“先进后出”的数据结构。

![](./img/stack.png)

```js
// 数组实现 栈
const stack = []
stack.push(100) // 压栈
stack.pop() // 出栈
```

### 队列 Queue

队列 Queue 是一种“先进先出”的数据结构。

![](./img/queue.png)

```js
// 数组实现 队列
const queue = []
queue.push(100) // 入队
queue.shift() // 出队
```

### 链表 Linked list

链表不是连续的数据结构，而是由一系列的节点组成，节点之间通过指针连接。

![](./img/linked.png)

```ts
// 链表节点的数据结构
interface IListNode {
  data: any
  next: IListNode | null
}
```

### 树 Tree

树，是一种有序的层级结构。每个节点下面可以有若干个子节点。例如常见的 DOM 树。

![](./img/dom-tree.png)

```ts
// 树节点的数据结构
interface ITreeNode {
  data: any
  children: ITreeNode[] | null
}
```

### 二叉树 Binary Tree

二叉树，首先它是一棵树，其次它的每个节点，最多有两个子节点，分别为 `left` 和 `right`

![](./img/binary-tree.png)

```ts
// 二叉树节点的数据结构
interface IBinaryTreeNode {
  data: any
  left: IBinaryTreeNode | null
  right: IBinaryTreeNode | null
}
```

## 旋转数组

### 题目

定义一个函数，实现数组的旋转。如输入 `[1, 2, 3, 4, 5, 6, 7]` 和 `key = 3`， 输出 `[5, 6, 7, 1, 2, 3, 4]`<br>
考虑时间复杂度和性能

### 实现思路

思路 1

- 将 `k` 后面的元素，挨个 `pop` 然后 `unshift` 到数组前面

思路 2

- 将 `k` 后面的所有元素拿出来作为 `part1`
- 将 `k` 前面的所有元素拿出来作为 `part2`
- 返回 `part1.concat(part2)`

### 写代码

```ts
/**
 * 旋转数组 k 步 - 使用 pop 和 unshift
 * @param arr arr
 * @param k k
 * @returns arr
 */
export function rotate1(arr: number[], k: number): number[] {
  const length = arr.length
  if (!k || length === 0) return arr
  const step = Math.abs(k % length) // abs 取绝对值

  // O(n^2)
  for (let i = 0; i < step; i++) {
    const n = arr.pop()
    if (n != null) {
      arr.unshift(n) // 数组是一个有序结构，unshift 操作非常慢！！！ O(n)
    }
  }
  return arr
}

/**
 * 旋转数组 k 步 - 使用 concat
 * @param arr arr
 * @param k k
 */
export function rotate2(arr: number[], k: number): number[] {
  const length = arr.length
  if (!k || length === 0) return arr
  const step = Math.abs(k % length) // abs 取绝对值

  // O(1)
  const part1 = arr.slice(-step) // O(1)
  const part2 = arr.slice(0, length - step)
  const part3 = part1.concat(part2)
  return part3
}

// // 功能测试
// const arr = [1, 2, 3, 4, 5, 6, 7]
// const arr1 = rotate2(arr, 3)
// console.info(arr1)

// // 性能测试
// const arr1 = []
// for (let i = 0; i < 10 * 10000; i++) {
//     arr1.push(i)
// }
// console.time('rotate1')
// rotate1(arr1, 9 * 10000)
// console.timeEnd('rotate1') // 885ms O(n^2)

// const arr2 = []
// for (let i = 0; i < 10 * 10000; i++) {
//     arr2.push(i)
// }
// console.time('rotate2')
// rotate2(arr2, 9 * 10000)
// console.timeEnd('rotate2') // 1ms O(1)
```

经过性能测试，知道“思路 2”性能更优。看来，思路简单并不一定性能最优。

【注意】我看到网上有很多人为“思路 1”的写法点赞，要保持独立思考，不要从众！

### 时间复杂度

复杂度用 `O` 表示，说的是**数量级**，而不是具体的数字，如

- `O(2)` `O(3)` `O(100)` 其实都是 `O(1)`
- `O(n)` `O(2 * n)` 其实都是 `O(n)`

常见的时间复杂度

- `O(1)` 无循环
- `O(n)` 单次循环
- `O(logn)` 二分法
- `O(n*logn)` 单次循环 & 二分法
- `O(n^2)` 嵌套循环

![](./img/time.png)

【注意】如果你用到了 API （如数组 `unshift`）要结合数据结构去分析复杂度。**要看到代码的本质**。

### 空间复杂度

算法需要额外定义多少变量？

- `O(1)` 定义了为数不多的变量，和 `n` 无关
- `O(n)` 需要定义和 `n` 级别的变量，如额外复制一个同样的数组
- 其他不常见

前端算法通常不太考虑空间复杂度，或者它比时间复杂度要次要的多。<br>
因为前端环境，通常内存都是足够的，或者内存不够通常也是其他因素（如媒体文件）。

### 性能对比

时间复杂度

- 思路 1 - 看代码时间复杂度是 `O(n)`，**但数组是有序结构 `unshift` 本身就是 `O(n)` 复杂度**，所以实际复杂度是 `O(n^2)`
- 思路 2 - `O(1)`。`slice` 和 `concat` 不会修改原数组，而数组是有序结构，复杂度是 `O(1)` 。

空间复杂度

- 思路 1 - `O(1)`
- 思路 2 - `O(n)`

## 括号匹配

### 题目

一个字符串内部可能包含 `{ }` `( )` `[ ]` 三种括号，判断该字符串是否是括号匹配的。<br>
如 `(a{b}c)` 就是匹配的， `{a(b` 和 `{a(b}c)` 就是不匹配的。

### 栈 Stack

该题目的考察目的很明确 —— 栈

栈，先进后出，基本的 API

- push
- pop
- length

和栈相关的数据结构（后面讲）

- 队列，先进先出
- 堆，如常说的“堆栈模型”

### 逻辑结构和物理结构

栈和数组有什么区别？—— 没有可比性，两者不一个级别。就像：房子和石头有什么区别？

栈是一种逻辑结构，一种理论模型，它可以脱离编程语言单独讲。<br>
数组是一种物理结构，代码的实现，不同的语言，数组语法是不一样的。

栈可以用数组来表达，也可以用链表来表达，也可以自定义 `class MyStack {...}` 自己实现…<br>
在 JS 中，栈一般情况下用数组实现。

### 思路

- 遇到左括号 `{ ( [` 则压栈
- 遇到右括号 `} ) ]` 则判断栈顶，相同的则出栈
- 最后判断栈 length 是否为 0

### 答案

```ts
/**
 * 判断左右括号是否匹配
 * @param left 左括号
 * @param right 右括号
 */
function isMatch(left: string, right: string): boolean {
  if (left === '{' && right === '}') return true
  if (left === '[' && right === ']') return true
  if (left === '(' && right === ')') return true
  return false
}

/**
 * 判断是否括号匹配
 * @param str str
 */
export function matchBracket(str: string): boolean {
  const length = str.length
  if (length === 0) return true

  const stack = []

  const leftSymbols = '{[('
  const rightSymbols = '}])'

  for (let i = 0; i < length; i++) {
    const s = str[i]

    if (leftSymbols.includes(s)) {
      // 左括号，压栈
      stack.push(s)
    } else if (rightSymbols.includes(s)) {
      // 右括号，判断栈顶（是否出栈）
      const top = stack[stack.length - 1]
      if (isMatch(top, s)) {
        stack.pop()
      } else {
        return false
      }
    }
  }

  return stack.length === 0
}

// // 功能测试
// const str = '{a(b[c]d)e}f'
// console.info(123123, matchBracket(str))
```

## 用两个栈实现一个队列

### 题目

请用两个栈，来实现队列的功能，实现功能 `add` `delete` `length` 。

### 队列 Queue

栈，先进后出

队列，先进先出，API 包括

- add
- delete
- length

常见的“消息队列”就是队列的一种应用场景

- A 系统向 B 系统持续发送海量的消息
- A 系统先把一条一条消息放在一个 queue
- B 系统再从 queue 中逐条消费（按顺序，先进先出）

### 逻辑结构和物理结构

队列和栈一样，是一种逻辑结构。它可以用数组、链表等实现。<br>
思考：用数组实现队列，性能会怎样 —— add 怎样？delete 怎样？

复杂场景下（如海量数据，内存不够用）需要单独设计。

### 题目分析

- 队列 add
  - 往 stack1 push 元素
- 队列 delete
  - 将 stack1 所有元素 pop 出来，push 到 stack2
  - 将 stack2 执行一次 pop
  - 再将 stack2 所有元素 pop 出来，push 进 stack1

### 答案

```ts
export class MyQueue {
  private stack1: number[] = []
  private stack2: number[] = []

  /**
   * 入队
   * @param n n
   */
  add(n: number) {
    this.stack1.push(n)
  }

  /**
   * 出队
   */
  delete(): number | null {
    let res

    const stack1 = this.stack1
    const stack2 = this.stack2

    // 将 stack1 所有元素移动到 stack2 中
    while (stack1.length) {
      const n = stack1.pop()
      if (n != null) {
        stack2.push(n)
      }
    }

    // stack2 pop
    res = stack2.pop()

    // 将 stack2 所有元素“还给”stack1
    while (stack2.length) {
      const n = stack2.pop()
      if (n != null) {
        stack1.push(n)
      }
    }

    return res || null
  }

  get length(): number {
    return this.stack1.length
  }
}

// // 功能测试
// const q = new MyQueue()
// q.add(100)
// q.add(200)
// q.add(300)
// console.info(q.length)
// console.info(q.delete())
// console.info(q.length)
// console.info(q.delete())
// console.info(q.length)
```

## 反转单向链表

### 题目

定义一个函数，输入一个单向链表的头节点，反转该链表，并输出反转之后的头节点

### 链表

链表是一种物理结构（非逻辑结构），是数组的补充。<br>
数组需要一段连续的内存空间，而链表不需要。

数据结构

- 单向链表 `{ value, next }`
- 双向链表 `{ value, prev, next }`

两者对比

- 链表：查询慢，新增和删除较快
- 数组：查询快，新增和删除较慢

### 分析

反转链表，画图很好理解。没有捷径，遍历一边，重新设置 next 指向即可。<br>
但实际写代码，却并不简单，很容易造成 nextNode 丢失。

因此，遍历过程中，至少要存储 3 个指针 `prevNode` `curNode` `nextNode`

时间复杂度 `O(n)`

### 答案

```ts
export interface ILinkListNode {
  value: number
  next?: ILinkListNode
}

/**
 * 反转单向链表，并返回反转之后的 head node
 * @param listNode list head node
 */
export function reverseLinkList(listNode: ILinkListNode): ILinkListNode {
  // 定义三个指针
  let prevNode: ILinkListNode | undefined = undefined
  let curNode: ILinkListNode | undefined = undefined
  let nextNode: ILinkListNode | undefined = listNode

  // 以 nextNode 为主，遍历链表
  while (nextNode) {
    // 第一个元素，删掉 next ，防止循环引用
    if (curNode && !prevNode) {
      delete curNode.next
    }

    // 反转指针
    if (curNode && prevNode) {
      curNode.next = prevNode
    }

    // 整体向后移动指针
    prevNode = curNode
    curNode = nextNode
    nextNode = nextNode?.next
  }

  // 最后一个的补充：当 nextNode 空时，此时 curNode 尚未设置 next
  curNode!.next = prevNode

  return curNode!
}

/**
 * 根据数组创建单向链表
 * @param arr number arr
 */
export function createLinkList(arr: number[]): ILinkListNode {
  const length = arr.length
  if (length === 0) throw new Error('arr is empty')

  let curNode: ILinkListNode = {
    value: arr[length - 1],
  }
  if (length === 1) return curNode

  for (let i = length - 2; i >= 0; i--) {
    curNode = {
      value: arr[i],
      next: curNode,
    }
  }

  return curNode
}

const arr = [100, 200, 300, 400, 500]
const list = createLinkList(arr)
console.info('list:', list)

const list1 = reverseLinkList(list)
console.info('list1:', list1)
```

## 二分查找

### 题目

用 Javascript 实现二分查找（针对有序数组），说明它的时间复杂度

### 一个故事

N 年前，百度，一个复杂的后台系统出现了问题，因为太大找不到问题所在。
一个工程师，使用二分法，很快找到了问题原因。

无论多么大的数据量，一旦有了二分，便可快速搞定。<br>
二分法，是算法的一个重要思维。

但二分法有一个条件：需要有序数据。

### 分析

二分查找是一种固定的算法，没什么可分析的。

两种实现思路

- 递归 - 代码逻辑更加简洁
- 循环 - 性能更好（就调用一次函数，而递归需要调用很多次函数，创建函数作用域会消耗时间）

时间复杂度 `O(logn)`

### 答案

```ts
/**
 * 二分查找（循环）
 * @param arr arr
 * @param target target
 */
export function binarySearch1(arr: number[], target: number): number {
  const length = arr.length
  if (length === 0) return -1

  let startIndex = 0 // 开始位置
  let endIndex = length - 1 // 结束位置

  while (startIndex <= endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2)
    const midValue = arr[midIndex]
    if (target < midValue) {
      // 目标值较小，则继续在左侧查找
      endIndex = midIndex - 1
    } else if (target > midValue) {
      // 目标值较大，则继续在右侧查找
      startIndex = midIndex + 1
    } else {
      // 相等，返回
      return midIndex
    }
  }

  return -1
}

/**
 * 二分查找（递归）
 * @param arr arr
 * @param target target
 * @param startIndex start index
 * @param endIndex end index
 */
export function binarySearch2(
  arr: number[],
  target: number,
  startIndex?: number,
  endIndex?: number
): number {
  const length = arr.length
  if (length === 0) return -1

  // 开始和结束的范围
  if (startIndex == null) startIndex = 0
  if (endIndex == null) endIndex = length - 1

  // 如果 start 和 end 相遇，则结束
  if (startIndex > endIndex) return -1

  // 中间位置
  const midIndex = Math.floor((startIndex + endIndex) / 2)
  const midValue = arr[midIndex]

  if (target < midValue) {
    // 目标值较小，则继续在左侧查找
    return binarySearch2(arr, target, startIndex, midIndex - 1)
  } else if (target > midValue) {
    // 目标值较大，则继续在右侧查找
    return binarySearch2(arr, target, midIndex + 1, endIndex)
  } else {
    // 相等，返回
    return midIndex
  }
}

// // // 功能测试
// const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
// const target = 40
// // console.info(binarySearch2(arr, target))

// // 性能测试
// console.time('binarySearch1')
// for (let i = 0; i < 100 * 10000; i++) {
//     binarySearch1(arr, target)
// }
// console.timeEnd('binarySearch1') // 17ms
// console.time('binarySearch2')
// for (let i = 0; i < 100 * 10000; i++) {
//     binarySearch2(arr, target)
// }
// console.timeEnd('binarySearch2') // 34ms
```

## 两数之和

### 题目

输入一个递增的数字数组，和一个数字 `n` 。求和等于 `n` 的两个数字。<br>
例如输入 `[1, 2, 4, 7, 11, 15]` 和 `15` ，返回两个数 `[4, 11]`

### 分析

注意题目的要点

- 递增，从小打大排序
- 只需要两个数字，而不是多个

### 常规思路

嵌套循环，找个一个数，然后再遍历剩余的数，求和，判断。

时间复杂度 `O(n^2)` ，基本不可用。

### 利用递增的特性

数组是递增的

- 随便找两个数
- 如果和大于 n ，则需要向前寻找
- 如果和小于 n ，则需要向后寻找 —— **二分法**

双指针（指针就是索引，如数组的 index）

- i 指向头，j 指向尾， 求 i + j 的和
- 和如果大于 n ，则说明需要减少，则 j 向前移动（递增特性）
- 和如果小于 n ，则说明需要增加，则 i 向后移动（递增特性）

时间复杂度降低到 `O(n)`

### 答案

```ts
/**
 * 寻找和为 n 的两个数（嵌套循环）
 * @param arr arr
 * @param n n
 */
export function findTowNumbers1(arr: number[], n: number): number[] {
  const res: number[] = []

  const length = arr.length
  if (length === 0) return res

  // O(n^2)
  for (let i = 0; i < length - 1; i++) {
    const n1 = arr[i]
    let flag = false // 是否得到了结果

    for (let j = i + 1; j < length; j++) {
      const n2 = arr[j]

      if (n1 + n2 === n) {
        res.push(n1)
        res.push(n2)
        flag = true
        break
      }
    }

    if (flag) break
  }

  return res
}

/**
 * 查找和为 n 的两个数（双指针）
 * @param arr arr
 * @param n n
 */
export function findTowNumbers2(arr: number[], n: number): number[] {
  const res: number[] = []

  const length = arr.length
  if (length === 0) return res

  let i = 0 // 头
  let j = length - 1 // 尾

  // O(n)
  while (i < j) {
    const n1 = arr[i]
    const n2 = arr[j]
    const sum = n1 + n2

    if (sum > n) {
      // sum 大于 n ，则 j 要向前移动
      j--
    } else if (sum < n) {
      // sum 小于 n ，则 i 要向后移动
      i++
    } else {
      // 相等
      res.push(n1)
      res.push(n2)
      break
    }
  }

  return res
}

// // 功能测试
const arr = [
  1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
  1, 2, 4, 7, 11, 15,
]
// console.info(findTowNumbers2(arr, 15))

console.time('findTowNumbers1')
for (let i = 0; i < 100 * 10000; i++) {
  findTowNumbers1(arr, 15)
}
console.timeEnd('findTowNumbers1') // 730ms

console.time('findTowNumbers2')
for (let i = 0; i < 100 * 10000; i++) {
  findTowNumbers2(arr, 15)
}
console.timeEnd('findTowNumbers2') // 102
```

### 划重点

- 有序数据，要善用二分法
- 优化嵌套循环，可以考虑“双指针”

## 求二叉搜索树的第 K 小的值

### 题目

一个二叉搜索树，求其中的第 K 小的节点的值。
如下图，第 3 小的节点是 `4`

![](./img/binary-tree.png)

### 二叉树

树，大家应该都知道，如前端常见的 DOM 树、vdom 结构。

二叉树，顾名思义，就是每个节点最多能有两个子节点。

```ts
interface ITreeNode {
  value: number // 或其他类型
  left?: ITreeNode
  right?: ITreeNode
}
```

### 二叉树的遍历

- 前序遍历：root -> left -> right
- 中序遍历：left -> root -> right
- 后序遍历：left -> right -> root

### 二叉搜索树 BST

- 左节点（包括其后代） <= 根节点
- 右节点（包括其后代） >= 根节点

### 分析题目

根据 BST 的特点，中序遍历的结果，正好是按照从小到大排序的结果。<br>
所以，中序遍历，求数组的 `arr[k]` 即可。

### 答案

```ts
export interface ITreeNode {
  value: number
  left: ITreeNode | null
  right: ITreeNode | null
}

const arr: number[] = []

/**
 * 二叉树前序遍历
 * @param node tree node
 */
function preOrderTraverse(node: ITreeNode | null) {
  if (node == null) return
  // console.log(node.value)
  arr.push(node.value)
  preOrderTraverse(node.left)
  preOrderTraverse(node.right)
}

/**
 * 二叉树中序遍历
 * @param node tree node
 */
function inOrderTraverse(node: ITreeNode | null) {
  if (node == null) return
  inOrderTraverse(node.left)
  // console.log(node.value)
  arr.push(node.value)
  inOrderTraverse(node.right)
}

/**
 * 二叉树后序遍历
 * @param node tree node
 */
function postOrderTraverse(node: ITreeNode | null) {
  if (node == null) return
  postOrderTraverse(node.left)
  postOrderTraverse(node.right)
  // console.log(node.value)
  arr.push(node.value)
}

/**
 * 寻找 BST 里的第 K 小值
 * @param node tree node
 * @param k 第几个值
 */
export function getKthValue(node: ITreeNode, k: number): number | null {
  inOrderTraverse(node)
  return arr[k - 1] || null
}

const bst: ITreeNode = {
  value: 5,
  left: {
    value: 3,
    left: {
      value: 2,
      left: null,
      right: null,
    },
    right: {
      value: 4,
      left: null,
      right: null,
    },
  },
  right: {
    value: 7,
    left: {
      value: 6,
      left: null,
      right: null,
    },
    right: {
      value: 8,
      left: null,
      right: null,
    },
  },
}

// preOrderTraverse(bst)
// inOrderTraverse(bst)
// postOrderTraverse(bst)

console.log(getKthValue(bst, 3))
```

## 为何二叉树重要

### 题目

为何二叉树那么重要，而不是三叉树、四叉树呢？

### 分析

树是常见的数据结构，如 DOM 树，是一种多叉树。<br>
其中二叉树是一个特别的存在，很重要，很常考。

【注意】本文涉及很多数据结构的知识，所以要“不求甚解” —— 掌握要点和结果，不求细节和过程

### 如何让性能整体最优？

有序结构

- 数组：查找易，增删难
- 链表：增删易，查找难

将两者优点结合起来 —— 二叉搜索树 BST ：查找易，增删易 —— 可使用二分算法

二叉搜索树 BST

- 左节点（包括其后代） <= 根节点
- 右节点（包括其后代） >= 根节点

![](./img/binary-tree.png)

### 高级二叉树

二叉搜索树 BST ，如果左右不平衡，也无法做到最优。<br>
极端情况下，它就成了链表 —— 这不是我们想要的。

平衡二叉搜索树 BBST ：要求树左右尽量平衡

- 树高度 `h` 约等于 `logn`
- 查找、增删，时间复杂度都等于 `O(logn)`

红黑树：一种自动平衡的二叉树

- 节点分 红/黑 两种颜色，通过颜色转换来维持树的平衡
- 相比于普通平衡二叉树，它维持平衡的效率更高

![](./img/red-block.png)

B 树：物理上是多叉树，但逻辑上是一个 BST 。用于高效 I/O ，如关系型数据库就用 B 树来组织数据结构。

![](./img/B-tree.png)

### 堆

JS 执行时代码中的变量

- 值类型 - 存储到栈
- 引用类型 - 存储到堆

![](./img/heap.png)

堆的特点：

- 节点的值，总是不大于（或不小于）其父节点的值
- 完全二叉树

![](./img/full-tree.png)

堆，虽然逻辑上是二叉树，但实际上它使用数组来存储的。

![](./img/heap1.png)

```js
// 上图是一个堆（从小到大），可以用数组表示
const heap = [-1, 10, 14, 25, 33, 81, 82, 99] // 忽略 0 节点

// 节点关系
const parentIndex = Math.floor(i / 2)
const leftIndex = 2 * i
const rightIndex = 2 * i + 1
```

堆的排序规则，没有 BST 那么严格，这就造成了

- 查询比 BST 慢
- 增删比 BST 快，维持平衡也更快
- 但整体复杂度都是 `O(logn)` 级别，即树的高度

但结合堆的应用场景

- 一般使用内存地址（栈中保存了）来查询，不会直接从根节点搜索
- 堆的物理结构是数组，所以查询复杂度就是 `O(1)`

总结

- 物理结构是数组（空间更小），逻辑结构是二叉树（操作更快）
- 适用于“堆栈”结构

### 答案

- 二叉树，可以充分利用二分法
- 二叉树可以同时规避数字和链表的缺点
- 引申到 BST BBST 等其他扩展结构

## 斐波那契数列

### 题目

用 Javascript 计算第 n 个斐波那契数列的值，注意时间复杂度。

### 分析

斐波那契数列很好理解

- `f(0) = 0`
- `f(1) = 1`
- `f(n) = f(n - 1) + f(n - 2)` 前两个值的和

### 递归计算

但这种方式会导致很多重复计算。<br>
时间复杂度是 `O(2^n)` ，爆炸式增长，不可用。（可以试试 `n: 100` ，程序会卡死）

![](./img/fin.png)

### 优化

不用递归，用循环，记录中间结果。时间复杂度降低到 `O(n)`

### 动态规划

即，把一个大问题，拆解为不同的小问题，递归向下。

【注意】一般使用动态规划的思路（递归）分析问题，再转换为循环来解决问题。

### 三大算法思维

- 贪心（递归）
- 二分
- 动态规划

### 答案

```ts
// /**
//  * 斐波那契数列（递归）
//  * @param n n
//  */
// function fibonacci(n: number): number {
//     if (n <= 0) return 0
//     if (n === 1) return 1

//     return fibonacci(n - 1) + fibonacci(n - 2)
// }

/**
 * 斐波那契数列（循环）
 * @param n n
 */
export function fibonacci(n: number): number {
  if (n <= 0) return 0
  if (n === 1) return 1

  let n1 = 1 // 记录 n-1 的结果
  let n2 = 0 // 记录 n-2 的结果
  let res = 0

  for (let i = 2; i <= n; i++) {
    res = n1 + n2

    // 记录中间结果
    n2 = n1
    n1 = res
  }

  return res
}

// 功能测试
// console.log(fibonacci(10))
```

### 扩展

青蛙跳台阶：一只青蛙，一次可以跳 1 个台阶，也可以跳 2 个台阶，问该青蛙跳上 n 级台阶，总共有多少种方式？

分析

- `f(1) = 1` 跳 1 级台阶，只有一种方式
- `f(2) = 2` 跳 2 级台阶，有两种方式
- `f(n) = f(n - 1) + fn(n - 2)` 跳 n 级，可拆分为两个问题
  - 第一次跳，要么 1 级，要么 2 级，只有这两种
  - 第一次跳 1 级，剩下有 `f(n - 1)` 种方式
  - 第一次跳 2 级，剩下有 `f(n - 2)` 种方式

看公式，和斐波那契数列一样。

## 移动 0

### 题目

定义一个函数，将数组种所有的 `0` 都移动到末尾，例如输入 `[1, 0, 3, 0, 11, 0]` 输出 `[1, 3, 11, 0, 0, 0]`。要求：

- 只移动 `0` ，其他数字顺序不变
- 考虑时间复杂度
- 必须在原数组就行操作

### 如果不限制“必须在原数组修改”

- 定义 `part1` `part2` 两个空数组
- 遍历数组，非 `0` push 到 `part1` ，`0` push 到 `part2`
- 返回 `part1.concat(part2)`

时间复杂度 `O(n)` 空间复杂度 `O(n)` ，

所以，遇到类似问题，要提前问面试官：**是否能在原数组基础上修改？**

### 传统方式

思路

- 遍历数组
- 遇到 `0` 则 push 到数组末尾
- 然后用 splice 截取掉当前元素

分析性能

- 空间复杂度没有问题 `O(1)`
- 时间复杂度
  - 看似是 `O(n)`
  - 但实际上 `splice` 和 `unshift` 一样，修改数组结构，时间复杂度是 `O(n)`
  - 总体看来时间复杂度是 `O(n^2)`，不可用

【注意】网上有很多人对这种方式点赞，切不可随意从众，要对思考！

### 双指针

- 指针 1 指向第一个 0 ，指针 2 指向第一个非 0
- 把指针 1 和 指针 2 进行交换
- 指针向后移

性能分析

- 时间复杂度 `O(n)`
- 空间复杂度 `O(1)`

性能测试，实际对比差距非常大。

### 答案

```ts
/**
 * 移动 0 到数组的末尾（嵌套循环）
 * @param arr number arr
 */
export function moveZero1(arr: number[]): void {
  const length = arr.length
  if (length === 0) return

  let zeroLength = 0

  // O(n^2)
  for (let i = 0; i < length - zeroLength; i++) {
    if (arr[i] === 0) {
      arr.push(0)
      arr.splice(i, 1) // 本身就有 O(n)
      i-- // 数组截取了一个元素，i 要递减，否则连续 0 就会有错误
      zeroLength++ // 累加 0 的长度
    }
  }
}

/**
 * 移动 0 到数组末尾（双指针）
 * @param arr number arr
 */
export function moveZero2(arr: number[]): void {
  const length = arr.length
  if (length === 0) return

  let i
  let j = -1 // 指向第一个 0

  for (i = 0; i < length; i++) {
    if (arr[i] === 0) {
      // 第一个 0
      if (j < 0) {
        j = i
      }
    }

    if (arr[i] !== 0 && j >= 0) {
      // 交换
      const n = arr[i]
      arr[i] = arr[j]
      arr[j] = n

      j++
    }
  }
}

// // 功能测试
// const arr = [1, 0, 3, 4, 0, 0, 11, 0]
// moveZero2(arr)
// console.log(arr)

// const arr1 = []
// for (let i = 0; i < 20 * 10000; i++) {
//     if (i % 10 === 0) {
//         arr1.push(0)
//     } else {
//         arr1.push(i)
//     }
// }
// console.time('moveZero1')
// moveZero1(arr1)
// console.timeEnd('moveZero1') // 262ms

// const arr2 = []
// for (let i = 0; i < 20 * 10000; i++) {
//     if (i % 10 === 0) {
//         arr2.push(0)
//     } else {
//         arr2.push(i)
//     }
// }
// console.time('moveZero2')
// moveZero2(arr2)
// console.timeEnd('moveZero2') // 3ms
```

## 连续最多的字符

### 题目

给一个字符串，找出连续最多的字符，以及次数。<br>
例如字符串 `'aabbcccddeeee11223'` 连续最多的是 `e` ，4 次。

### 传统方式

嵌套循环，找出每个字符的连续次数，并记录比较。

时间复杂度看似是 `O(n^2)`，因为是嵌套循环。 **但实际上它的时间复杂度是 `O(n)`，因为循环中有跳转**。

### 双指针

只有一次循环，时间复杂度是 `O(n)`

性能测试，发现两者时间消耗一样，**循环次数也一样**。

### 答案

```ts
interface IRes {
  char: string
  length: number
}

/**
 * 求连续最多的字符和次数（嵌套循环）
 * @param str str
 */
export function findContinuousChar1(str: string): IRes {
  const res: IRes = {
    char: '',
    length: 0,
  }

  const length = str.length
  if (length === 0) return res

  let tempLength = 0 // 临时记录当前连续字符的长度

  // O(n)
  for (let i = 0; i < length; i++) {
    tempLength = 0 // 重置

    for (let j = i; j < length; j++) {
      if (str[i] === str[j]) {
        tempLength++
      }

      if (str[i] !== str[j] || j === length - 1) {
        // 不相等，或者已经到了最后一个元素。要去判断最大值
        if (tempLength > res.length) {
          res.char = str[i]
          res.length = tempLength
        }

        if (i < length - 1) {
          i = j - 1 // 跳步
        }

        break
      }
    }
  }

  return res
}

/**
 * 求连续最多的字符和次数（双指针）
 * @param str str
 */
export function findContinuousChar2(str: string): IRes {
  const res: IRes = {
    char: '',
    length: 0,
  }

  const length = str.length
  if (length === 0) return res

  let tempLength = 0 // 临时记录当前连续字符的长度
  let i = 0
  let j = 0

  // O(n)
  for (; i < length; i++) {
    if (str[i] === str[j]) {
      tempLength++
    }

    if (str[i] !== str[j] || i === length - 1) {
      // 不相等，或者 i 到了字符串的末尾
      if (tempLength > res.length) {
        res.char = str[j]
        res.length = tempLength
      }
      tempLength = 0 // reset

      if (i < length - 1) {
        j = i // 让 j “追上” i
        i-- // 细节
      }
    }
  }

  return res
}

// // 功能测试
// const str = 'aabbcccddeeee11223'
// console.info(findContinuousChar2(str))

// let str = ''
// for (let i = 0; i < 100 * 10000; i++) {
//     str += i.toString()
// }

// console.time('findContinuousChar1')
// findContinuousChar1(str)
// console.timeEnd('findContinuousChar1') // 219ms

// console.time('findContinuousChar2')
// findContinuousChar2(str)
// console.timeEnd('findContinuousChar2') // 228ms
```

## 冒泡排序

- 比较所有相邻元素,如果第一个比第二个大，则交换它们
- 一轮下来保证可以找到一个数是最大的
- 执行 n-1 轮，就可以完成排序

![](./img/465e6006be434ad890efeab48d153ce1.gif)

```js
//定义一个原生的bubbleSort方法
Array.prototype.bubbleSort = function () {
  for (let i = 0; i < this.length - 1; i += 1) {
    //通过 this.length 次把第一位放到最后,完成排序
    //-i是因为最后的位置是会动态改变的，当完成一次后,最后一位会变成倒数第二位
    for (let j = 0; j < this.length - 1 - i; j += 1) {
      if (this[j] > this[j + 1]) {
        const temp = this[j]
        this[j] = this[j + 1]
        this[j + 1] = temp
      }
    }
  }
}

const arr = [4, 8, 0, 1, 43, 53, 22, 11, 0]
arr.bubbleSort()
console.log(arr)
```

## 选择排序

- 找到数组中的最小值，选中它并将其放置在第一位
- 接着找到第二个最小值，选中它并将其放置到第二位
- 执行 n-1 轮，就可以完成排序

![](./img/0768fddbe21c4e96930181050f203963.gif)

```js
Array.prototype.selectionSort = function () {
  for (let i = 0; i < this.length - 1; ++i) {
    // 假设最小的值是当前的下标
    let indexMin = i
    //遍历剩余长度找到最小下标
    for (let j = i; j < this.length; ++j) {
      if (this[j] < this[indexMin]) {
        indexMin = j
      }
    }
    if (indexMin !== i) {
      //交换当前下标i与最小下标的值，重复this.length次
      const temp = this[i]
      this[i] = this[indexMin]
      this[indexMin] = temp
    }
  }
}

const arr = [5, 4, 3, 2, 1]
arr.selectionSort()
console.log(arr)
```

## 插入排序

- 从第二个数开始往前比
- 比它大就往后排
- 以此类推进行到最后一个数

![](./img/eff8219ab2ee4f30a093bca9b68633d3.gif)

```js
Array.prototype.insertionSort = function () {
  //从第二个数开始往前比
  for (let i = 1; i < this.length; ++i) {
    //先把值保存起来
    const temp = this[i]
    let j = i
    while (j > 0) {
      if (this[j - 1] > temp) {
        this[j] = this[j - 1]
      } else {
        //因为已经是排序过的了，如果比上一位大，那就没必要再跟上上位比较了
        break
      }
      j -= 1
    }
    //这里的j有可能是第0位，也有可能是到了一半停止了
    this[j] = temp
  }
}

const arr = [5, 4, 3, 2, 1]
arr.insertionSort()
```

## 快速排序

### 题目

用 Javascript 实现快速排序，并说明时间复杂度。

### 思路

快速排序是基础算法之一，算法思路是固定的

- 找到中间位置 midValue
- 遍历数组，小于 midValue 放在 left ，大于 midValue 放在 right
- 继续递归，concat 拼接

### splice 和 slice

代码实现时，获取 midValue 可以通过 `splice` 和 `slice` 两种方式

理论分析，`slice` 要优于 `splice` ，因为 `splice` 会修改原数组。<br>
但实际性能测试发现两者接近。

但是，即便如此还是倾向于选择 `slice` —— **因为它不会改动原数组**，类似于函数式编程

### 性能分析

快速排序 时间复杂度 `O(n*logn)` —— 有遍历，有二分

普通的排序算法（如冒泡排序）时间复杂度时 `O(n^2)`

### 答案

```ts
/**
 * 快速排序（使用 splice）
 * @param arr number arr
 */
export function quickSort1(arr: number[]): number[] {
  const length = arr.length
  if (length === 0) return arr

  const midIndex = Math.floor(length / 2)
  const midValue = arr.splice(midIndex, 1)[0]

  const left: number[] = []
  const right: number[] = []

  // 注意：这里不用直接用 length ，而是用 arr.length 。因为 arr 已经被 splice 给修改了
  for (let i = 0; i < arr.length; i++) {
    const n = arr[i]
    if (n < midValue) {
      // 小于 midValue ，则放在 left
      left.push(n)
    } else {
      // 大于 midValue ，则放在 right
      right.push(n)
    }
  }

  return quickSort1(left).concat([midValue], quickSort1(right))
}

/**
 * 快速排序（使用 slice）
 * @param arr number arr
 */
export function quickSort2(arr: number[]): number[] {
  const length = arr.length
  if (length === 0) return arr

  const midIndex = Math.floor(length / 2)
  const midValue = arr.slice(midIndex, midIndex + 1)[0]

  const left: number[] = []
  const right: number[] = []

  for (let i = 0; i < length; i++) {
    if (i !== midIndex) {
      const n = arr[i]
      if (n < midValue) {
        // 小于 midValue ，则放在 left
        left.push(n)
      } else {
        // 大于 midValue ，则放在 right
        right.push(n)
      }
    }
  }

  return quickSort2(left).concat([midValue], quickSort2(right))
}

// // 功能测试
// const arr1 = [1, 6, 2, 7, 3, 8, 4, 9, 5]
// console.info(quickSort2(arr1))

// // 性能测试
// const arr1 = []
// for (let i = 0; i < 10 * 10000; i++) {
//     arr1.push(Math.floor(Math.random() * 1000))
// }
// console.time('quickSort1')
// quickSort1(arr1)
// console.timeEnd('quickSort1') // 74ms

// const arr2 = []
// for (let i = 0; i < 10 * 10000; i++) {
//     arr2.push(Math.floor(Math.random() * 1000))
// }
// console.time('quickSort2')
// quickSort2(arr2)
// console.timeEnd('quickSort2') // 82ms

// // 单独比较 splice 和 slice
// const arr1 = []
// for (let i = 0; i < 10 * 10000; i++) {
//     arr1.push(Math.floor(Math.random() * 1000))
// }
// console.time('splice')
// arr1.splice(5 * 10000, 1)
// console.timeEnd('splice')
// const arr2 = []
// for (let i = 0; i < 10 * 10000; i++) {
//     arr2.push(Math.floor(Math.random() * 1000))
// }
// console.time('slice')
// arr2.slice(5 * 10000, 5 * 10000 + 1)
// console.timeEnd('slice')
```

## 1-10000 之间的对称数（回文）

### 题目

打印 1-10000 之间的对称数

### 使用数组反转

- 数字转换为字符串
- 字符串转换为数组 reverse ，再 join 生成字符串
- 比较前后的字符串

### 使用字符串头尾比较

- 数字转换为字符串
- 字符串头尾比较

还可以使用**栈**（但栈会用到数组，性能不如直接操作字符串）

- 数字转换为字符串，求长度
- 如果长度是偶数，则用栈比较
- 如果长度是奇数，则忽略中间的数字，其他的用栈比较

### 生成反转数

- 通过 `%` 和 `Math.floor` 将数字生成一个反转数
- 比较前后的数字

### 性能分析

时间复杂度看似相当，都是 `O(n)`

但 方案 1 涉及到了数组的转换和操作，就需要耗费大量的时间

- 数组 reverse 需要时间
- 数组和字符串的转换需要时间

方案 2 3 比较，数字操作最快。电脑的原型就是计算器，所以处理数字是最快的。

### 答案

```ts
/**
 * 查询 1-max 的所有对称数（数组反转）
 * @param max 最大值
 */
export function findPalindromeNumbers1(max: number): number[] {
  const res: number[] = []
  if (max <= 0) return res

  for (let i = 1; i <= max; i++) {
    // 转换为字符串，转换为数组，再反转，比较
    const s = i.toString()
    if (s === s.split('').reverse().join('')) {
      res.push(i)
    }
  }

  return res
}

/**
 * 查询 1-max 的所有对称数（字符串前后比较）
 * @param max 最大值
 */
export function findPalindromeNumbers2(max: number): number[] {
  const res: number[] = []
  if (max <= 0) return res

  for (let i = 1; i <= max; i++) {
    const s = i.toString()
    const length = s.length

    // 字符串头尾比较
    let flag = true
    let startIndex = 0 // 字符串开始
    let endIndex = length - 1 // 字符串结束
    while (startIndex < endIndex) {
      if (s[startIndex] !== s[endIndex]) {
        flag = false
        break
      } else {
        // 继续比较
        startIndex++
        endIndex--
      }
    }

    if (flag) res.push(i)
  }

  return res
}

/**
 * 查询 1-max 的所有对称数（翻转数字）
 * @param max 最大值
 */
export function findPalindromeNumbers3(max: number): number[] {
  const res: number[] = []
  if (max <= 0) return res

  for (let i = 1; i <= max; i++) {
    let n = i
    let rev = 0 // 存储翻转数

    // 生成翻转数
    while (n > 0) {
      rev = rev * 10 + (n % 10)
      n = Math.floor(n / 10)
    }

    if (i === rev) res.push(i)
  }

  return res
}

// 功能测试
// console.info(findPalindromeNumbers3(200))

// 性能测试
console.time('findPalindromeNumbers1')
findPalindromeNumbers1(100 * 10000)
console.timeEnd('findPalindromeNumbers1') // 408ms

console.time('findPalindromeNumbers2')
findPalindromeNumbers2(100 * 10000)
console.timeEnd('findPalindromeNumbers2') // 53ms

console.time('findPalindromeNumbers3')
findPalindromeNumbers3(100 * 10000)
console.timeEnd('findPalindromeNumbers3') // 42ms
```

## 搜索单词

字符串前缀匹配

### 题目

请描述算法思路，不要求写出代码。

- 先给一个英文单词库（数组），里面有几十万个英文单词
- 再给一个输入框，输入字母，搜索单词
- 输入英文字母，要实时给出搜索结果，按前缀匹配

要求

- 尽量快
- 不要使用防抖（输入过程中就及时识别）

### 常规思路

`keyup` 之后，拿当前的单词，遍历词库数组，通过 `indexOf` 来前缀匹配。

性能分析

- 算法思路的时间复杂度是 `O(n)`
- 外加 `indexOf` 也需要时间复杂度。实际的复杂度要超过 `O(n)`

### 优化数据结构

英文字母一共 26 个，可按照第一个字母分组，分为 26 组。这样搜索次数就减少很多。

可按照第一个字母分组，那也可以按照第二个、第三个字母分组。<br>
即，在程序初始化时，把数组变成一个树，然后按照字母顺序在树中查找。

```js
const arr = [
  'abs',
  'arab',
  'array',
  'arrow',
  'boot',
  'boss',
  // 更多...
]

const obj = {
  a: {
    b: {
      s: {},
    },
    r: {
      a: {
        b: {},
      },
      r: {
        a: {
          y: {},
        },
        o: {
          w: {},
        },
      },
    },
  },
  b: {
    o: {
      o: {
        t: {},
      },
      s: {
        s: {},
      },
    },
  },
  // 更多...
}
```

这样时间复杂度就大幅度减少，从 `O(n)` 降低到 `O(m)` （`m` 是单词的最大长度）

### 划重点

- 对于已经明确的范围的数据，可以考虑使用哈希表
- 以空间换时间

## 数字千分位

### 题目

将数字按照千分位生成字符串，即每三位加一个逗号。不考虑小数。<br>
如输入数字 `78100200300` 返回字符串 `'78,100,200,300'`

### 分析

- 使用数组
- 使用正则表达式
- 使用字符串拆分

### 性能分析

- 数组转换，影响性能
- 正则表达式，性能较差
- 操作字符串，性能较好

### 答案

```ts
/**
 * 千分位格式化（使用数组）
 * @param n number
 */
export function format1(n: number): string {
  n = Math.floor(n) // 只考虑整数

  const s = n.toString()
  const arr = s.split('').reverse()
  return arr.reduce((prev, val, index) => {
    if (index % 3 === 0) {
      if (prev) {
        return val + ',' + prev
      } else {
        return val
      }
    } else {
      return val + prev
    }
  }, '')
}

/**
 * 数字千分位格式化（字符串分析）
 * @param n number
 */
export function format2(n: number): string {
  n = Math.floor(n) // 只考虑整数

  let res = ''
  const s = n.toString()
  const length = s.length

  for (let i = length - 1; i >= 0; i--) {
    const j = length - i
    if (j % 3 === 0) {
      if (i === 0) {
        res = s[i] + res
      } else {
        res = ',' + s[i] + res
      }
    } else {
      res = s[i] + res
    }
  }

  return res
}

// // 功能测试
// const n = 10201004050
// console.info('format1', format1(n))
// console.info('format2', format2(n))
```

## 切换字母大小写

### 题目

切换字母大小写，输入 `'aBc'` 输出 `'AbC'`

### 分析

需要判断字母是大写还是小写

- 正则表达式
- `charCodeAt` 获取 ASCII 码（ASCII 码表，可以网上搜索）

性能分析

- 正则表达式性能较差
- ASCII 码性能较好

### 答案

```ts
/**
 * 切换字母大小写（正则表达式）
 * @param s str
 */
export function switchLetterCase1(s: string): string {
  let res = ''

  const length = s.length
  if (length === 0) return res

  const reg1 = /[a-z]/
  const reg2 = /[A-Z]/

  for (let i = 0; i < length; i++) {
    const c = s[i]
    if (reg1.test(c)) {
      res += c.toUpperCase()
    } else if (reg2.test(c)) {
      res += c.toLowerCase()
    } else {
      res += c
    }
  }

  return res
}

/**
 * 切换字母大小写（ASCII 编码）
 * @param s str
 */
export function switchLetterCase2(s: string): string {
  let res = ''

  const length = s.length
  if (length === 0) return res

  for (let i = 0; i < length; i++) {
    const c = s[i]
    const code = c.charCodeAt(0)

    if (code >= 65 && code <= 90) {
      res += c.toLowerCase()
    } else if (code >= 97 && code <= 122) {
      res += c.toUpperCase()
    } else {
      res += c
    }
  }

  return res
}

// // 功能测试
// const str = '100aBcD$#xYz'
// console.info(switchLetterCase2(str))

// // 性能测试
// const str = '100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz'
// console.time('switchLetterCase1')
// for (let i = 0; i < 10 * 10000; i++) {
//     switchLetterCase1(str)
// }
// console.timeEnd('switchLetterCase1') // 436ms

// console.time('switchLetterCase2')
// for (let i = 0; i < 10 * 10000; i++) {
//     switchLetterCase2(str)
// }
// console.timeEnd('switchLetterCase2') // 210ms
```
