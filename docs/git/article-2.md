---
title: Git常见场景
---

# Git 常见场景

### 怎么删除不需要的分支？

查看所有分支

```js
$ git branch -av
```

删除分支

```js
$ git branch -d <分支名>  // -d删除不掉用-D
$ git branch -D <分支名>
```

### 怎么修改最新提交的 commit message？

```js
$ git commit --amend  // 会进入vi编辑模式进行修改message
```

### 怎么修改以前提交的 commit message？

```js
$ git rebase -i <想要修改的父亲commit id>
```

### 怎么把连续的多个 commit message 合成一个？

### 怎么比较暂存区和 HEAD 所含文件的差异？

```js
$ git diff --cached
$ git diff --cached -- <文件名> // 针对单一文件对比差异
$ git diff --cached -- <文件名> <文件名> // 还可以指定多个文件
```

### 怎么比较工作区和暂存区所含文件的差异？

```js
$ git diff
$ git diff -- <文件名> // 针对单一文件对比差异
$ git diff -- <文件名> <文件名> // 还可以指定多个文件
```

### 怎么让暂存区恢复成和 HEAD 一样？

```js
$ git reset HEAD
```

### 怎么让工作区文件恢复成和暂存区一样？

```js
$ git checkout -- <文件名>
```

### 怎么取消暂存区的部分更改？

```js
$ git reset HEAD -- <文件名>
```

### 消除最近的几次提交？

```js
$ git reset --hard <commit id> // 让HEAD指针指向某个commit，那么在这个commit之前的都会被清除
```

### 查看不同提交的指定文件的差异？

```js
$ git diff <commit id> <commit id> -- <文件名>
```

### 删除文件的正确方法？

```js
$ git rm <文件名>
```

### 如何指定 Git 不需要管理的文件？

忽略文件 `.gitignore`

这个文件的作用，会去忽略一些不需要纳入`Git`管理这种，我们也不希望出现在未跟踪文件列表。

那么我们来看看如何配置该文件信息。

```js
# 此行为注释 会被Git忽略

# 忽略 node_modules/ 目录下所有的文件
node_modules


# 忽略所有.vscode结尾的文件
.vscode

# 忽略所有.md结尾的文件
*.md

# README.md 除外
!README.md

# 会忽略 doc/something.txt 但不会忽略doc/images/arch.txt
doc/*.txt

# 忽略 doc/ 目录下所有扩展名为txt文件
doc/**/*.txt
```
