(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{741:function(e,t,v){e.exports=v.p+"assets/img/38.55dd84ff.png"},742:function(e,t,v){e.exports=v.p+"assets/img/39.f56ec311.png"},851:function(e,t,v){"use strict";v.r(t);var a=v(74),s=Object(a.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"实战经验"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#实战经验"}},[e._v("#")]),e._v(" 实战经验")]),e._v(" "),t("h2",{attrs:{id:"自我介绍"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#自我介绍"}},[e._v("#")]),e._v(" 自我介绍")]),e._v(" "),t("p",[e._v("大家好，我叫王佳欢，目前有五年的前端开发经验，在上家公司担任前端组长一职，主要负责前端工程化方向、框架搭建、技术选型、组件库、项目评审排期人员分配解决组内技术性问题，也会参与业务开发，擅长vue、vue3、微前端、微信小程序，最主要的技术栈就是vue3\n主要负责的项目有脚手架devops流程、前端监控、组件库、数据可视化、b端、c端等项目")]),e._v(" "),t("h2",{attrs:{id:"简述一下你的脚手架开发流程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#简述一下你的脚手架开发流程"}},[e._v("#")]),e._v(" 简述一下你的脚手架开发流程")]),e._v(" "),t("ol",[t("li",[e._v("基于lerna和pnpm搭建脚手架项目，pnpm主要用于管理依赖安装和多package间的依赖关系，learn主要用于发布各个npm包以及多个包的版本管理，lerna已经支持pnpm，设置"),t("code",[e._v('"npmClient": "pnpm" and "useWorkspaces": true in lerna.json')])]),e._v(" "),t("li",[e._v("在package.json中增加bin命令，也就是脚手架的执行入口文件，在入口文件中增加"),t("code",[e._v("#! /usr/bin/env node")]),e._v(",代表用node去自动执行这个文件")])]),e._v(" "),t("blockquote",[t("p",[e._v("在用npm -g 全局安装脚手架时，是把脚手架的包下载node的lib中的node-modules中，在node的bin目录下配置脚手架命令的软连接，链接到node modules中的路径")])]),e._v(" "),t("ol",{attrs:{start:"3"}},[t("li",[t("p",[e._v("采用import-local来判断优先加载本地脚手架资源否则加载全局的安装的脚手架")])]),e._v(" "),t("li",[t("p",[e._v("使用commander完成脚手架命令注册，根据参数targetPath参数判断是否加载本地命令，不传则根据命令动态加载对应命令的npm包")])]),e._v(" "),t("li",[t("p",[e._v("设计通用的npm package类用于缓存下载包以及各种方法，比如对比线上最新版本更新依赖")])]),e._v(" "),t("li",[t("p",[e._v("通过commander注册命令action动作动态执行命令传入exec函数")])]),e._v(" "),t("li",[t("p",[e._v("exec函数根据命令去加载不同的代码去执行，执行采用node多进程spawn来执行，避免阻塞住进程，通过stdio: 'inherit',来进行命令行交互，spawn是用来开启多进程，传入 node -e 命令来执行文件，win32采用cmd来执行命令")])]),e._v(" "),t("li",[t("p",[e._v("单人git flow流程")])])]),e._v(" "),t("ul",[t("li",[e._v("本地初始化git仓库 "),t("code",[e._v("git init")])]),e._v(" "),t("li",[e._v("关联远程仓库 "),t("code",[e._v("git remote add origin 远程仓库链接地址")])]),e._v(" "),t("li",[e._v("推送代码至master "),t("code",[e._v("git push -u origin master")])]),e._v(" "),t("li",[e._v("基于master分支创建开发分支 "),t("code",[e._v("git checkout -b dev/0.0.1")])]),e._v(" "),t("li",[e._v("在开发分支修改代码，把新建的分支push到远端："),t("code",[e._v("git push origin dev/0.0.1")])]),e._v(" "),t("li",[e._v("将本地分支与远端分支关联："),t("code",[e._v("git branch --set-upstream-to=origin/dev/0.0.1")])]),e._v(" "),t("li",[e._v("继续修改代码，并提交到远程分支，并且想要部署")]),e._v(" "),t("li",[e._v("部署成功之后，合并dev到master，并基于master创建tag并删除开发分支\n"),t("ul",[t("li",[e._v("在master分支运行"),t("code",[e._v("git merge dev")])]),e._v(" "),t("li",[t("code",[e._v("git push origin master")])]),e._v(" "),t("li",[t("code",[e._v("git tag release/0.0.1")])]),e._v(" "),t("li",[t("code",[e._v("git push origin release/0.0.1")]),e._v("  或者 "),t("code",[e._v("git push --tags")])]),e._v(" "),t("li",[t("code",[e._v("git branch -d dev/0.0.1")]),e._v(" 删除本地开发分支")]),e._v(" "),t("li",[t("code",[e._v("git push origin --delete dev/0.0.1")]),e._v(" 删除远程开发分支并且删除追踪分支")])])])]),e._v(" "),t("ol",{attrs:{start:"10"}},[t("li",[e._v("多人git flow流程")])]),e._v(" "),t("blockquote",[t("p",[e._v("就是在开发过程需要提交代码之前要先 拉取dev代码保证dev代码是最新提交的，在想要发布时需要先拉取dev代码在同步master代码，因为要保证发布前的代码要和master把持同步")])]),e._v(" "),t("h2",{attrs:{id:"单人开发流程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#单人开发流程"}},[e._v("#")]),e._v(" 单人开发流程")]),e._v(" "),t("p",[t("img",{attrs:{src:v(741),alt:""}})]),e._v(" "),t("h2",{attrs:{id:"多人协作流程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#多人协作流程"}},[e._v("#")]),e._v(" 多人协作流程")]),e._v(" "),t("p",[t("img",{attrs:{src:v(742),alt:""}})]),e._v(" "),t("h2",{attrs:{id:"简述一下前端监控项目"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#简述一下前端监控项目"}},[e._v("#")]),e._v(" 简述一下前端监控项目")]),e._v(" "),t("ol",[t("li",[e._v("采集sdk->上报sdk->大数据清洗->后端编写接口->数据可视化开发")])]),e._v(" "),t("p",[e._v("难点：怎么处理高并发上任务？怎么处理点击事件跳转了网站怎么发送上报任务")]),e._v(" "),t("p",[e._v("requestIdleCallback、异步任务队列、 navigator.sendBeacon()")])])}),[],!1,null,null,null);t.default=s.exports}}]);