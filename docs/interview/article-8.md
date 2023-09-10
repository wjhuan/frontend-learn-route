---
title: 实战经验
---

# 实战经验

## 自我介绍

面试官好，我叫xxx，目前有五年的前端开发经验，在上家公司担任前端组长一职，主要负责前端工程化、自动化方向、组件库搭建、项目评审排期人员分配解决组内技术性问题，也会参与业务开发，擅长vue、vue3、微前端、微信小程序，最主要的技术栈就是vue3
主要负责的项目有脚手架devops流程、前端监控、组件库、数据可视化、b端、c端等项目

## 简述一下你的脚手架开发流程

1. 基于lerna和pnpm搭建脚手架项目，pnpm主要用于管理依赖安装和多package间的依赖关系，learn主要用于发布各个npm包以及多个包的版本管理，lerna已经支持pnpm，设置`"npmClient": "pnpm" and "useWorkspaces": true in lerna.json`
2. 在package.json中增加bin命令，也就是脚手架的执行入口文件，在入口文件中增加`#! /usr/bin/env node`,代表用node去自动执行这个文件
> 在用npm -g 全局安装脚手架时，是把脚手架的包下载node的lib中的node-modules中，在node的bin目录下配置脚手架命令的软连接，链接到node modules中的路径
3. 采用import-local来判断优先加载本地脚手架资源否则加载全局的安装的脚手架
4. 使用commander完成脚手架命令注册，根据参数targetPath参数判断是否加载本地命令，不传则根据命令动态加载对应命令的npm包
5. 设计通用的npm package类用于缓存下载包以及各种方法，比如对比线上最新版本更新依赖
6. 通过commander注册命令action动作动态执行命令传入exec函数
7. exec函数根据命令去加载不同的代码去执行，执行采用node多进程spawn来执行，避免阻塞住进程，通过stdio: 'inherit',来进行命令行交互，spawn是用来开启多进程，传入 node -e 命令来执行文件，win32采用cmd来执行命令

8. 单人git flow流程

- 本地初始化git仓库 `git init`
- 关联远程仓库 `git remote add origin 远程仓库链接地址`
- 推送代码至master `git push -u origin master`
- 基于master分支创建开发分支 `git checkout -b dev/0.0.1`
- 在开发分支修改代码，把新建的分支push到远端：`git push origin dev/0.0.1`
- 将本地分支与远端分支关联：`git branch --set-upstream-to=origin/dev/0.0.1`
- 继续修改代码，并提交到远程分支，并且想要部署
- 部署成功之后，合并dev到master，并基于master创建tag并删除开发分支
    - 在master分支运行`git merge dev`
    - `git push origin master`
    - `git tag release/0.0.1`
    - `git push origin release/0.0.1`  或者 `git push --tags`
    - `git branch -d dev/0.0.1` 删除本地开发分支
    - `git push origin --delete dev/0.0.1` 删除远程开发分支并且删除追踪分支

10. 多人git flow流程


> 就是在开发过程需要提交代码之前要先 拉取dev代码保证dev代码是最新提交的，在想要发布时需要先拉取dev代码在同步master代码，因为要保证发布前的代码要和master把持同步

## 单人开发流程

![](./img/38.png)

## 多人协作流程

![](./img/39.png)


## 简述一下前端监控项目

1. 采集sdk->上报sdk->大数据清洗->后端编写接口->数据可视化开发

难点：怎么处理高并发上任务？怎么处理点击事件跳转了网站怎么发送上报任务

requestIdleCallback、异步任务队列、 navigator.sendBeacon()