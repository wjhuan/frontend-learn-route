---
title: lerna
---

# lerna

## lerna 介绍

> Lerna 是一个优化基于 git+npm 的多 package 项目的管理工具
> Lerna 是架构优化的产物，它揭示了一个架构真理: 项目复杂度提升后，就需要对项目进行架构优化。架构优化的主要目标往往都是以效能为核心。

1. 大幅减少重复操作
2. 提升操作的标准化

![](./img/8.png)
![](./img/9.png)

## 简历编写

- 熟悉 Yargs 脚手架开发框架
- 熟悉多 Package 管理工具 Lerna 的使用方法和实现原理
- 深入了解 Node.is 模块路径解析流程

### 面试官问起细节后如何回答?

yargs 相关问题

1. 脚手架构成

- bin: package.json 中配置 bin 属性，npm link 本地安装
- command: 命令
- options: 参数(boolean/string/number)
- 文件顶部增加 #!/usr/bin/env node

2. 脚手架初始化流程

- 构造函数 Yargs()
- 常用方法
  - Yargs.options
  - Yargs.option
  - Yargs.group
  - Yargs.demandCommand
  - Yargs.recommendCommands
  - Yargs.strict
  - Yargs.fail
  - Yargs.alias
  - Yargs.wrap
  - Yargs.epilogue

3. 脚手架参数解析方法

- hideBin(process.argv)
- Yargs.parse(argv, options)

4. 命令注册方法

- Yargs.command(command, describe, builder, handler)
- Yargs.command({ command, describe, builder, handler })

lerna 相关问题

1. `Lerna` 是基于 `git+npm` 的多`package`项目管理工具
2. 实现原理

- 通过 `import-local` 优先调用本地 `lerna` 命令
- 通过 `Yargs` 生成脚手架，先注册全局属性，再注册命令，最后通过 `parse` 方法解析参数
- `lerna` 命令注册时需要传入 `builder` 和 `handler` 两个方法，`builder` 方法用于注册命令专属的 `options`，`handler` 用来处理命令的业务逻辑
- `lerna` 通过配置 `npm `本地依赖的方式来进行本地开发，具体写法是在 `package,json` 的依赖中写入: `file:your-local-module-path` ，在`lerna publish` 时会自动将该路径替换

Node.js 模块路径解析流程

1. `Node.is` 项目模块路径解析是通过 `require.resolve`方法来实现的
2. `require.resolve` 就是通过 `Module.resolveFileName` 方法实现的
3. `require.resolve`实现原理

- `Module.resolveFileName `方法核心流程有 3 点
  - 判断是否为内置模块
  - 通过 `Module.resolveLookupPaths` 方法生成 `node modules` 可能存在的路径
  - 通过 `Module.findPath` 查询模块的真实路径
- `Module.findPath`核心流程有 4 点
  - 查询缓存 (将 `request` 和 `paths` 通过 `\x00` 合并成 `cacheKey`)
  - 遍历 `paths`，将 `path` 与 `request` 组成文件路径 `basePath`
  - 如果 `basePath` 存在则调用 `fs.realPathSync` 获取文件真实路径
  - 将文件真实路径缓存到 `Module._pathCache`(`key` 就是前面生成的 `cacheKey`)
- `fs.realPathSync` 核心流程有 3 点
  - 查询缓存 (缓存的 `key` 为 `p`，即 `Module.findPath` 中生成的文件路径)
  - 从左往右遍历路径字符串，查询到 `/` 时，拆分路径，判断该路径是否为软链接，如果是软链接则查询真实链接，并生成新路径 p，然后继续往后遍历，这里有 `1` 个细节需要特别注意:
    - 遍历过程中生成的子路径 `base` 会缓存在 `knownHard 和 cache `中，避免重复查询
  - 遍历完成得到模块对应的真实路径，此时会将原始路径 `original `作为` key`，真实路径作为 `value`，保存到缓存中
- `require.resolve.paths` 等价于 `Module.resolveLookupPaths`，该方法用于获取所有 `node modules`
  可能存在的路径

- `require.resolve.paths` 实现原理
  - 如果路径为 `/ (根目录)` ，直接返回 `[/node modules]`
  - 否则，将路径字符串从后往前遍历，查询到 `/` 时，拆分路径，在后面加上 `node modules`，并传入一个 `paths` 数组，直至查询不到 `/` 后返 `paths` 数组
