(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{691:function(v,e,a){v.exports=a.p+"assets/img/3.f41752e5.png"},692:function(v,e,a){v.exports=a.p+"assets/img/6.c3cea80c.png"},693:function(v,e,a){v.exports=a.p+"assets/img/7.6ca8a763.png"},795:function(v,e,a){"use strict";a.r(e);var _=a(74),s=Object(_.a)({},(function(){var v=this,e=v._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[e("h1",{attrs:{id:"脚手架"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#脚手架"}},[v._v("#")]),v._v(" 脚手架")]),v._v(" "),e("h2",{attrs:{id:"前端研发脚手架架构设计"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#前端研发脚手架架构设计"}},[v._v("#")]),v._v(" 前端研发脚手架架构设计")]),v._v(" "),e("p",[e("img",{attrs:{src:a(691),alt:""}})]),v._v(" "),e("h2",{attrs:{id:"脚手架核心价值"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#脚手架核心价值"}},[v._v("#")]),v._v(" 脚手架核心价值")]),v._v(" "),e("ol",[e("li",[v._v("自动化: 项目重复代码拷贝/git 操作/发布上线操作")]),v._v(" "),e("li",[v._v("标准化: 项目创建/git flow/发布流程/回滚流程")]),v._v(" "),e("li",[v._v("数据化: 研发过程系统化、数据化，使得研发过程可量化")])]),v._v(" "),e("h2",{attrs:{id:"和自动化构建工具区别"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#和自动化构建工具区别"}},[v._v("#")]),v._v(" 和自动化构建工具区别")]),v._v(" "),e("blockquote",[e("p",[v._v("问题: "),e("code",[v._v("jenkins、travis")]),v._v("等自动化构建工具已经比较成熟了，为什么还需要自研脚手架?")])]),v._v(" "),e("ol",[e("li",[v._v("不满足需求: "),e("code",[v._v("jenkins、travis")]),v._v("通常在"),e("code",[v._v("git hooks")]),v._v("中触发，需要在服务端执行，无法覆盖研发人员本地的功能如: 创建项目自动化、本地"),e("code",[v._v("git")]),v._v("操作自动化等")]),v._v(" "),e("li",[v._v("定制复杂: "),e("code",[v._v("jenkins、travis")]),v._v("定制过程需要开发插件，其过程较为复杂，需要使用"),e("code",[v._v("java")]),v._v("语言，对前端同学不够友好")])]),v._v(" "),e("h2",{attrs:{id:"什么是脚手架"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#什么是脚手架"}},[v._v("#")]),v._v(" 什么是脚手架")]),v._v(" "),e("p",[v._v("脚手架本质是一个操作系统的客户端，它通过命令行执行，比如")]),v._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[v._v("vue create vue-test-app\n")])])]),e("p",[v._v("上面这条命令由 3 个部分组成:")]),v._v(" "),e("ol",[e("li",[v._v("主命令: "),e("code",[v._v("vue")])]),v._v(" "),e("li",[v._v("command:"),e("code",[v._v("create")])]),v._v(" "),e("li",[v._v("command 的 param: "),e("code",[v._v("vue-test-app")])])]),v._v(" "),e("p",[v._v("它表示创建一个"),e("code",[v._v("vue")]),v._v(" 项目，项目的名称为 "),e("code",[v._v("vue-test-app")]),v._v("，以上是最一个较为简单的脚手架命令，但实际场景往往更加复杂，比如:")]),v._v(" "),e("p",[v._v("当前目录已经有文件了，我们需要覆盖当前目录下的文件，强制进行安装 "),e("code",[v._v("vue")]),v._v(" 项目，此时我们就可以输入")]),v._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[v._v("vue create vue-test-app "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[v._v("--force")]),v._v("\n")])])]),e("p",[v._v("这里的 "),e("code",[v._v("--force")]),v._v(" 叫做 "),e("code",[v._v("option")]),v._v("可以理解为配置，还有一种场景：")]),v._v(" "),e("p",[v._v("通过 "),e("code",[v._v("vue create")]),v._v(" 创建项目时，会自动执行 "),e("code",[v._v("npm install")]),v._v(" 帮用户安装依赖，如果我们希望使用淘宝源来安装\n可以输入命令:")]),v._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[v._v("vue create vue-test-app "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[v._v("--force")]),v._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[v._v("-r")]),v._v(" https://registry.npm.taobao.org\n")])])]),e("p",[v._v("这里的 "),e("code",[v._v("-r")]),v._v(" 也叫做 "),e("code",[v._v("option")]),v._v("，它与 "),e("code",[v._v("--force")]),v._v(" 不同的是它使用 "),e("code",[v._v("-")]),v._v("，并且使用简写，这里的 "),e("code",[v._v("-r")]),v._v(" 也可以替换成 "),e("code",[v._v("--registry")]),v._v("，有的同学可能要问，为什么老师知道这个命令，其实我们输入下面的命令就可以看到 vue create 支持的所有 options:")]),v._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[v._v("vue create "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[v._v("--help")]),v._v("\n")])])]),e("p",[e("code",[v._v("-r")]),v._v(" "),e("code",[v._v("https://registry.npm,taobao.org")]),v._v(" 后面的 "),e("code",[v._v("https://registry.npm.taobao.org")]),v._v(" 成为 "),e("code",[v._v("option")]),v._v("的\n"),e("code",[v._v("param")]),v._v("，其实 "),e("code",[v._v("--force")]),v._v(" 可以理解为: "),e("code",[v._v("--force true")]),v._v("，简写为: "),e("code",[v._v("--force")]),v._v(" 或 "),e("code",[v._v("-f")])]),v._v(" "),e("h2",{attrs:{id:"脚手架的执行原理如下"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#脚手架的执行原理如下"}},[v._v("#")]),v._v(" 脚手架的执行原理如下")]),v._v(" "),e("p",[e("img",{attrs:{src:a(692),alt:""}})]),v._v(" "),e("ol",[e("li",[v._v("在终端输入"),e("code",[v._v("vue create vue-test-app")])]),v._v(" "),e("li",[v._v("终端解析出 "),e("code",[v._v("vue")]),v._v(" 命令")]),v._v(" "),e("li",[v._v("终端在环境变量中找到 "),e("code",[v._v("vue")]),v._v(" 命令")]),v._v(" "),e("li",[v._v("终端根据 "),e("code",[v._v("vue")]),v._v(" 命令链接到实际文件 "),e("code",[v._v("vue.js")])]),v._v(" "),e("li",[v._v("终端利用 "),e("code",[v._v("node")]),v._v(" 执行 "),e("code",[v._v("vue.js")])]),v._v(" "),e("li",[e("code",[v._v("vue.js")]),v._v(" 解析 "),e("code",[v._v("command / options")])]),v._v(" "),e("li",[e("code",[v._v("vue.js")]),v._v(" 执行 "),e("code",[v._v("command")])]),v._v(" "),e("li",[v._v("执行完毕，退出执行")])]),v._v(" "),e("h3",{attrs:{id:"从应用的角度看如何开发一个脚手架"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#从应用的角度看如何开发一个脚手架"}},[v._v("#")]),v._v(" 从应用的角度看如何开发一个脚手架")]),v._v(" "),e("p",[v._v("以"),e("code",[v._v("vue-cli")]),v._v("为例")]),v._v(" "),e("ol",[e("li",[v._v("开发 "),e("code",[v._v("npm")]),v._v(" 项目，该项目中应包含一个 "),e("code",[v._v("bin/vue.js")]),v._v(" 文件，并将这个项目发布到"),e("code",[v._v("npm")])]),v._v(" "),e("li",[v._v("将 "),e("code",[v._v("npm")]),v._v(" 项目安装到 "),e("code",[v._v("node")]),v._v(" 的 "),e("code",[v._v("lib/node_modules")])]),v._v(" "),e("li",[v._v("在 "),e("code",[v._v("node")]),v._v(" 的 "),e("code",[v._v("bin")]),v._v(" 目录下配置 "),e("code",[v._v("vue")]),v._v(" 软链接指 "),e("code",[v._v("lib/node modules/@vue/cli/bin/vue.js")])])]),v._v(" "),e("p",[v._v("这样我们在执行 "),e("code",[v._v("vue")]),v._v(" 命令的时候就可以找到 "),e("code",[v._v("vue.js")]),v._v(" 进行执行")]),v._v(" "),e("ol",[e("li",[v._v("为什么全局安装 "),e("code",[v._v("@vue/cli")]),v._v(" 后会添加的命令为 "),e("code",[v._v("vue")]),v._v("?\n"),e("blockquote",[e("p",[v._v("在"),e("code",[v._v("@vue/cli")]),v._v("项目中的"),e("code",[v._v("package.json")]),v._v("的"),e("code",[v._v("bin")]),v._v("代码下指定的名字就叫"),e("code",[v._v("vue")])])])])]),v._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[v._v("npm")]),v._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[v._v("install")]),v._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[v._v("-g")]),v._v(" @vue/cli\n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[v._v("全局安装"),e("code",[v._v("@vue/cli")]),v._v(" 时发生了什么?\nnpm 会把@vue/cli 包下载到 node 的 lib 下的 node_modules 中，再根据"),e("code",[v._v("package.json")]),v._v("的"),e("code",[v._v("bin")]),v._v("代码配置对应的软连接")]),v._v(" "),e("li",[v._v("为什么 "),e("code",[v._v("vue")]),v._v(" 指向一个 "),e("code",[v._v("js")]),v._v("文件，我们却可以直接通过 "),e("code",[v._v("vue")]),v._v(" 命令直接去执行它?\n在 node 环境变量中找 vue 命令是否被注册，那么在 vuejs 文件中最上方要加上"),e("code",[v._v("!/usr/bin/env node")]),v._v(",意思就是可以自动使用"),e("code",[v._v("node")]),v._v("去执行这个文件")])]),v._v(" "),e("p",[e("img",{attrs:{src:a(693),alt:""}})]),v._v(" "),e("h2",{attrs:{id:"脚手架开发流程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#脚手架开发流程"}},[v._v("#")]),v._v(" 脚手架开发流程")]),v._v(" "),e("ol",[e("li",[v._v("创建 "),e("code",[v._v("npm")]),v._v(" 项目")]),v._v(" "),e("li",[v._v("创建脚手架入口文件，最上方添加")])]),v._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token shebang important"}},[v._v("#!/usr/bin/env node")]),v._v("\n")])])]),e("ol",{attrs:{start:"3"}},[e("li",[v._v("添加 "),e("code",[v._v("bin")]),v._v(" 属性配置 "),e("code",[v._v("package.json")]),v._v("，")]),v._v(" "),e("li",[v._v("编写脚手架代码")]),v._v(" "),e("li",[v._v("将脚手架发布到 "),e("code",[v._v("npm")])])]),v._v(" "),e("h3",{attrs:{id:"难点解析"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#难点解析"}},[v._v("#")]),v._v(" 难点解析")]),v._v(" "),e("ul",[e("li",[v._v("分包: 将复杂的系统拆分成若千个模块")]),v._v(" "),e("li",[v._v("命令注册")])]),v._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[v._v("vue create\nvue "),e("span",{pre:!0,attrs:{class:"token function"}},[v._v("add")]),v._v("\nvue invoke\n")])])]),e("ul",[e("li",[v._v("参数解析")])]),v._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[v._v("vue "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[v._v("command")]),v._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v("[")]),v._v("options"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v("]")]),v._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[v._v("<")]),v._v("params"),e("span",{pre:!0,attrs:{class:"token operator"}},[v._v(">")]),v._v("\n")])])]),e("ul",[e("li",[v._v("options 全称:"),e("code",[v._v("--version")]),v._v("、 "),e("code",[v._v("--help")])]),v._v(" "),e("li",[v._v("options 简写: "),e("code",[v._v("-v")]),v._v("、"),e("code",[v._v("-h")])]),v._v(" "),e("li",[v._v("带 params 的 options: "),e("code",[v._v("--path /users/sam/Desktop/vue-test")])]),v._v(" "),e("li",[v._v("帮助文档")]),v._v(" "),e("li",[v._v("命令行交互")]),v._v(" "),e("li",[v._v("日志打印")]),v._v(" "),e("li",[v._v("命令行文字变色")]),v._v(" "),e("li",[v._v("网络通信: HTTP/WebSocket")]),v._v(" "),e("li",[v._v("文件处理等")])]),v._v(" "),e("h2",{attrs:{id:"脚手架本地-link-标准"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#脚手架本地-link-标准"}},[v._v("#")]),v._v(" 脚手架本地 link 标准")]),v._v(" "),e("ul",[e("li",[v._v("链接本地脚手架")])]),v._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[v._v("cd")]),v._v(" your-cli-dir\n"),e("span",{pre:!0,attrs:{class:"token function"}},[v._v("npm")]),v._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[v._v("link")]),v._v("\n")])])]),e("ul",[e("li",[v._v("链接本地库文件")])]),v._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[v._v("cd")]),v._v(" your-lib-dir\n"),e("span",{pre:!0,attrs:{class:"token function"}},[v._v("npm")]),v._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[v._v("link")]),v._v("\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[v._v("cd")]),v._v(" your-cli-dir\n"),e("span",{pre:!0,attrs:{class:"token function"}},[v._v("npm")]),v._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[v._v("link")]),v._v(" your-lib\n")])])]),e("ul",[e("li",[v._v("取消链接本地库文件")])]),v._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[v._v("cd")]),v._v(" your-lib-dir\n"),e("span",{pre:!0,attrs:{class:"token function"}},[v._v("npm")]),v._v(" unlink\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[v._v("cd")]),v._v(" your-cli-dir\n"),e("span",{pre:!0,attrs:{class:"token function"}},[v._v("npm")]),v._v(" unlink your-lib\n")])])]),e("h3",{attrs:{id:"什么是-npm-link"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#什么是-npm-link"}},[v._v("#")]),v._v(" 什么是 npm link")]),v._v(" "),e("p",[e("code",[v._v("npm link your-lib")]),v._v(": 将当前项目中 "),e("code",[v._v("node modules")]),v._v(" 下指定的库文件链接到 "),e("code",[v._v("node")]),v._v(" 全局 "),e("code",[v._v("node modules")]),v._v(" 下的库文件\n"),e("code",[v._v("npm link")]),v._v(": 将当前项目链接到 "),e("code",[v._v("node")]),v._v(" 全局"),e("code",[v._v("node modules")]),v._v(" 中作为一个库文件，并解析 "),e("code",[v._v("bin")]),v._v(" 配置创建可执行文件")]),v._v(" "),e("h3",{attrs:{id:"什么是-npm-unlink"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#什么是-npm-unlink"}},[v._v("#")]),v._v(" 什么是 npm unlink")]),v._v(" "),e("p",[e("code",[v._v("npm unlink")]),v._v(":将当前项目从 "),e("code",[v._v("node")]),v._v(" 全局 "),e("code",[v._v("node modules")]),v._v(" 中移除\n"),e("code",[v._v("npm unlink your-lib")]),v._v(": 将当前项目中的库文件依赖移除")]),v._v(" "),e("h3",{attrs:{id:"原生脚手架开发痛点分析"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#原生脚手架开发痛点分析"}},[v._v("#")]),v._v(" 原生脚手架开发痛点分析")]),v._v(" "),e("ol",[e("li",[v._v("痛点一: 重复操作")])]),v._v(" "),e("ul",[e("li",[v._v("多 Package 本地 link")]),v._v(" "),e("li",[v._v("多 Package 依赖安装")]),v._v(" "),e("li",[v._v("多 Package 单元测试")]),v._v(" "),e("li",[v._v("多 Package 代码提交")]),v._v(" "),e("li",[v._v("多 Package 代码发布")])]),v._v(" "),e("ol",{attrs:{start:"2"}},[e("li",[v._v("痛点二: 版本一致性")])]),v._v(" "),e("ul",[e("li",[v._v("发布时版本一致性")]),v._v(" "),e("li",[v._v("发布后相互依赖版本升级")])])])}),[],!1,null,null,null);e.default=s.exports}}]);