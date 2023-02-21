---
title: 模板编译原理
---

# 模板编译原理

## 模板转化 AST 语法树

模板编译 Vue 中对 template 属性会编译成 render 方法。

增添新的包 compiler-core/package.json

```json
{
  "name": "@vue/compiler-core",
  "version": "1.0.0",
  "description": "@vue/compiler-core",
  "main": "index.js",
  "module": "dist/compiler-core.esm-bundler.js",
  "buildOptions": {
    "name": "VueCompilerCore",
    "compat": true,
    "formats": ["esm-bundler", "cjs"]
  }
}
```

我们将开发环境下的打包入口改为 compile-core，这里我们先提供所需要 ast 的节点类型

```js
export function compile(template) {
  // 1.将模板转化成ast语法树
  const ast = baseParse(template)
  // 2.对ast语法树进行转化
  transform(ast)
  // 3.生成代码
  return generate(ast)
}
```

## 生成 ast 语法树

准备语法树相关 type

```js
export const enum NodeTypes {
  ROOT, // 根节点 Fragment
  ELEMENT, // 元素
  TEXT, // 文本
  COMMENT, // 注释
  SIMPLE_EXPRESSION, // 表达式的值
  INTERPOLATION,  // 插值
  ATTRIBUTE, // 属性
  DIRECTIVE, // 指令
  // containers
  COMPOUND_EXPRESSION, // 复合表达式
  IF,
  IF_BRANCH,
  FOR,
  TEXT_CALL,
}
```

## 创建解析上下文

创建解析上下文，并且根据类型做不同的处理解析

```js
function createParserContext(content) {
  return {
    line: 1,
    column: 1,
    offset: 0,
    source: content, // source会不停的被截取
    originalSource: content, // 原始内容
  }
}
function isEnd(context) {
  const source = context.source
  return !source
}
function parseChildren(context) {
  const nodes = []
  while (!isEnd(context)) {
    const s = context.source
    let node
    if (s.startsWith('{{')) {
      // 处理表达式类型
    } else if (s[0] === '<') {
      // 标签的开头
      if (/[a-z]/i.test(s[1])) {
      } // 开始标签
    }
    if (!node) {
      // 文本的处理
    }
    nodes.push(node)
  }
  return nodes
}
function baseParse(template) {
  const context = createParserContext(template)
  return parseChildren(context)
}
```

## 处理文本节点

采用假设法获取文本结束位置

```js
function parseText(context) {
  // 123123{{name}}</div>
  const endTokens = ['<', '{{']
  let endIndex = context.source.length // 文本的总长度
  // 假设遇到 < 就是文本的结尾 。 在假设遇到{{ 是文本结尾。 最后找离的近的
  // 假设法
  for (let i = 0; i < endTokens.length; i++) {
    const index = context.source.indexOf(endTokens[i], 1)
    if (index !== -1 && endIndex > index) {
      endIndex = index
    }
  }
}
```

处理文本内容，删除匹配到的结果，计算最新上下文位置信息

```js
function parseText(context) {
  // ...
  let start = getCursor(context) // 1.获取文本开始位置
  const content = parseTextData(context, endIndex) // 2.处理文本数据

  return {
    type: NodeTypes.TEXT,
    content,
    loc: getSelection(context, start), // 3.获取全部信息
  }
}
```

```js
function getCursor(context) {
  // 获取当前位置
  let { line, column, offset } = context
  return { line, column, offset }
}
function parseTextData(context, endIndex) {
  const rawText = context.source.slice(0, endIndex)
  advanceBy(context, endIndex) // 截取内容
  return rawText
}
function advanceBy(context, endIndex) {
  let s = context.source
  advancePositionWithMutation(context, s, endIndex) // 更改位置信息
  context.source = s.slice(endIndex)
}
function advancePositionWithMutation(context, s, endIndex) {
  // 更新最新上下文信息
  let linesCount = 0 // 计算行数
  let linePos = -1 // 计算其实行开始位置
  for (let i = 0; i < endIndex; i++) {
    if (s.charCodeAt(i) === 10) {
      // 遇到\n就增加一行
      linesCount++
      linePos = i // 记录换行后的字节位置
    }
  }
  context.offset += endIndex // 累加偏移量
  context.line += linesCount // 累加行数
  // 计算列数，如果无换行,则直接在原列基础 + 文本末尾位置，否则 总位置减去换行后的字节位置
  context.column =
    linePos == -1 ? context.column + endIndex : endIndex - linePos
}
function getSelection(context, start) {
  const end = getCursor(context)
  return {
    start,
    end,
    source: context.originalSource.slice(start.offset, end.offset),
  }
}
```

转化成最终 ast 节点结果，标记 ast 节点类型

## 处理表达式节点

获取表达式中的变量，计算表达式的位置信息

```js
function parseInterpolation(context) {
  const start = getCursor(context) // 获取表达式的开头位置
  const closeIndex = context.source.indexOf('}}', '{{') // 找到结束位置
  advanceBy(context, 2) // 去掉  {{
  const innerStart = getCursor(context) // 计算里面开始和结束
  const innerEnd = getCursor(context)
  const rawContentLength = closeIndex - 2 // 拿到内容
  const preTrimContent = parseTextData(context, rawContentLength)
  const content = preTrimContent.trim()
  const startOffest = preTrimContent.indexOf(content)
  if (startOffest > 0) {
    // 有空格
    advancePositionWithMutation(innerStart, preTrimContent, startOffest) // 计算表达式开始位置
  }
  const endOffset = content.length + startOffest
  advancePositionWithMutation(innerEnd, preTrimContent, endOffset)
  advanceBy(context, 2)
  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      isStatic: false,
      content,
      loc: getSelection(context, innerStart, innerEnd), // 需要修改getSelection方法
    },
    loc: getSelection(context, start),
  }
}
```

## 处理元素节点

### 处理标签

获取标签名称，更新标签位置信息

```js
function advanceSpaces(context) {
  const match = /^[ \t\r\n]+/.exec(context.source)
  if (match) {
    advanceBy(context, match[0].length)
  }
}
function parseTag(context) {
  const start = getCursor(context) // 获取开始位置
  const match = /^<\/?([a-z][^ \t\r\n/>]*)/.exec(context.source) // 匹配标签名
  const tag = match[1]
  advanceBy(context, match[0].length) // 删除标签
  advanceSpaces(context) // 删除空格
  const isSelfClosing = context.source.startsWith('/>') // 是否是自闭合
  advanceBy(context, isSelfClosing ? 2 : 1) // 删除闭合 /> >
  return {
    type: NodeTypes.ELEMENT,
    tag,
    isSelfClosing,
    loc: getSelection(context, start),
  }
}
function parseElement(context) {
  // 1.解析标签名
  let ele = parseTag(context)
  if (context.source.startsWith('</')) {
    parseTag(context) // 解析标签，标签没有儿子，则直接更新标签信息的结束位置
  }
  ele.loc = getSelection(context, ele.loc.start) // 更新最终位置
  return ele
}
```

### 处理子节点

递归处理子节点元素

```js
function isEnd(context) {
    const source = context.source;
    if(context.source.startsWith('</')){ // 如果遇到结束标签说明没有子节点
        return true;
    }
    return !source;
}
function parseElement(context) {
    let ele = parseTag(context);
    const children = parseChildren(context); // 因为结尾标签, 会再次触发parseElement,这里如果是结尾需要停止
    if(context.source.startsWith('</')){
        parseTag(context);
    }
    ele.loc = getSelection(context,ele.loc.start); // 更新最终位置
    (ele as any).children = children; // 添加children
    return ele;
}
```

### 处理属性

> 在处理标签后处理属性

```js
function parseTag(context) {
  const start = getCursor(context)
  const match = /^<\/?([a-z][^ \t\r\n/>]*)/.exec(context.source)
  const tag = match[1]
  advanceBy(context, match[0].length)
  advanceBySpaces(context)
  let props = parseAttributes(context) // 处理属性
  // ......
  return {
    type: NodeTypes.ELEMENT,
    tag,
    isSelfClosing,
    loc: getSelection(context, start),
    props,
  }
}
```

```js
function parseAttributes(context) {
    const props: any = [];
    while (context.source.length > 0 && !context.source.startsWith('>')) {
        const attr = parseAttribute(context)
        props.push(attr);
        advanceSpaces(context); // 解析一个去空格一个
    }
    return props
}
function parseAttribute(context) {
    const start = getCursor(context);
    const match = /^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(context.source)!
    const name = match[0]; // 捕获到属性名
    advanceBy(context, name.length); // 删除属性名

    let value
    if (/^[\t\r\n\f ]*=/.test(context.source)) { // 删除空格 等号
        advanceSpaces(context);
        advanceBy(context, 1);
        advanceSpaces(context);
        value = parseAttributeValue(context); // 解析属性值
    }
    const loc = getSelection(context, start)
    return {
        type: NodeTypes.ATTRIBUTE,
        name,
        value: {
            type: NodeTypes.TEXT,
            content: value.content,
            loc: value.loc
        },
        loc
    }
}
function parseAttributeValue(context) {
    const start = getCursor(context);
    const quote = context.source[0];
    let content
    const isQuoteed = quote === '"' || quote === "'";
    if (isQuoteed) {
        advanceBy(context, 1);
        const endIndex = context.source.indexOf(quote);
        content = parseTextData(context, endIndex);  // 解析引号中间的值
        advanceBy(context, 1);
    }
    return { content, loc: getSelection(context, start) }
}
```

### 处理空节点

```js
function parseChildren(context) {
  const nodes: any = []
  while (!isEnd(context)) {
    //....
  }
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (node.type == NodeTypes.TEXT) {
      // 如果是文本 删除空白文本，其他的空格变为一个
      if (!/[^\t\r\n\f ]/.test(node.content)) {
        nodes[i] = null
      } else {
        node.content = node.content.replace(/[\t\r\n\f ]+/g, ' ')
      }
    }
  }
  return nodes.filter(Boolean)
}
```

### 创建根节点

将解析出的节点，再次进行包裹，这样可以支持模板下多个根节点的情况， 也是我们常说的 Fragment

```js
export function createRoot(children, loc) {
  return {
    type: NodeTypes.ROOT,
    children,
    loc,
  }
}
function baseParse(template) {
  // 标识节点的信息  行 列 偏移量
  const context = createParserContext(template)
  const start = getCursor(context)
  return createRoot(parseChildren(context), getSelection(context, start))
}
```

## 代码转化

### 遍历 AST 语法树

我们需要遍历 ast 语法树，访问树中节点进行语法树的转化

```js
function transformElement(node) {
  console.log('元素处理', node)
}
function transformText(node) {
  console.log('文本处理', node)
}
function transformExpression(node) {
  console.log('表达式')
}
function traverseNode(node, context) {
  context.currentNode = node
  const transforms = context.nodeTransforms
  for (let i = 0; i < transforms.length; i++) {
    transforms[i](node, context) // 调用转化方法进行转化
    if (!context.currentNode) return
  }
  switch (node.type) {
    case NodeTypes.ELEMENT:
    case NodeTypes.ROOT:
      for (let i = 0; i < node.children.length; i++) {
        context.parent = node
        traverseNode(node.children[i], context)
      }
  }
}

function createTransformContext(root) {
  const context = {
    currentNode: root, // 当前转化节点
    parent: null, // 当前转化节点的父节点
    nodeTransforms: [
      // 转化方法
      transformElement,
      transformText,
      transformExpression,
    ],
    helpers: new Map(), // 创建帮助映射表，记录调用方法次数
    helper(name) {
      const count = context.helpers.get(name) || 0
      context.helpers.set(name, count + 1)
    },
  }
  return context
}

function transform(root) {
  // 创建转化的上下文, 记录转化方法及当前转化节点
  let context = createTransformContext(root)
  // 递归遍历
  traverseNode(root, context)
}
export function compile(template) {
  const ast = baseParse(template)
  transform(ast)
}
```

### 退出函数

表达式不需要退出函数，直接处理即可。元素需要在遍历完所有子节点在进行处理

```js
function transformExpression(node) {
  if (node.type == NodeTypes.INTERPOLATION) {
    console.log('表达式')
  }
}
function transformElement(node) {
  if (node.type === NodeTypes.ELEMENT) {
    return function postTransformElement() {
      // 元素处理的退出函数
      // 如果这个元素
      console.log('元素', node)
    }
  }
}
function transformText(node) {
  if (node.type === NodeTypes.ELEMENT || node.type === NodeTypes.ROOT) {
    return () => {
      console.log('元素/root', node)
    }
  }
}
```

```js
function traverseNode(node, context) {
  // ...
  for (let i = 0; i < transforms.length; i++) {
    let onExit = transforms[i](node, context) // 调用转化方法进行转化
    if (onExit) {
      exitsFns.push(onExit)
    }
    if (!context.currentNode) return
  }
  // ...
  // 最终context.currentNode 是最里面的
  context.currentNode = node // 修正currentNode;
  let i = exitsFns.length
  while (i--) {
    exitsFns[i]()
  }
}
```
