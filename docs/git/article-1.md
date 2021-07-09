---
title: 初识Git
---

# 初识 Git

## 什么是 Git

基本概念：`Git`是分布式版本控制系统

### 版本库`.git`

1. 当我们使用`git`管理文件时，比如`git init`时，这个时候，会多一个`.git`文件，我们把这个文件称之为版本库。
2. `.git`文件另外一个作用就是它在创建的时候，会自动创建`master`分支，并且将`HEAD`指针指向`master`分支。

### 工作区

本地项目存放文件的位置

### 暂存区 `(Index/Stage)`

顾名思义就是暂时存放文件的地方，通过是通过`add`命令将工作区的文件添加到缓冲区

### 本地仓库`(Repository)`

通常情况下，我们使用`commit`命令可以将暂存区的文件添加到本地仓库

### 远程仓库`(Remote)`

1. 举个例子，当我们使用`GitHub`托管我们项目时，它就是一个远程仓库。
2. 通常我们使用`clone`命令将远程仓库代码拷贝下来，本地代码更新后，通过`push`托送给远程仓库。

## Git 基础工作流程

![](./img/base.png)

### 配置 USER 信息

配置`user.name`和`user.email`

```js
$ git config --global user.name "your name"
$ git config --global user.email "your email"
```

`config`的三个作用域，缺省等同于`local`，`local`仅限于在当前仓库下设置，如果同时设置了`global`和`local`，那么`local`高于`global`

```js
$ git config --global // 对当前用户所有仓库有效
$ git config --local // 只对某个仓库有效
$ git config --system // 对系统所有登录的用户所有仓库有效
```

显示`config`的配置，加`--list`

```js
$ git config --list --global
$ git config --list --local
$ git config --list --system
```

### 建立 Git 仓库

两种方案：

1. 把已有的项目代码纳入 Git 管理

```js
$ cd项目代码所在的文件夹
$ git init
```

2. 新建的项目直接用 Git 管理

```js
$ cd某个文件夹
$ git init your_project // 会在当前路径下创建和项目名称相同的文件夹
$ cd your_project
```
