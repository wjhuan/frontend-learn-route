(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{817:function(t,a,s){t.exports=s.p+"assets/img/base.e0737ab0.png"},828:function(t,a,s){"use strict";s.r(a);var e=s(114),r=Object(e.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"初识-git"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#初识-git"}},[t._v("#")]),t._v(" 初识 Git")]),t._v(" "),e("h2",{attrs:{id:"什么是-git"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#什么是-git"}},[t._v("#")]),t._v(" 什么是 Git")]),t._v(" "),e("p",[t._v("基本概念："),e("code",[t._v("Git")]),t._v("是分布式版本控制系统")]),t._v(" "),e("h3",{attrs:{id:"版本库-git"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#版本库-git"}},[t._v("#")]),t._v(" 版本库"),e("code",[t._v(".git")])]),t._v(" "),e("ol",[e("li",[t._v("当我们使用"),e("code",[t._v("git")]),t._v("管理文件时，比如"),e("code",[t._v("git init")]),t._v("时，这个时候，会多一个"),e("code",[t._v(".git")]),t._v("文件，我们把这个文件称之为版本库。")]),t._v(" "),e("li",[e("code",[t._v(".git")]),t._v("文件另外一个作用就是它在创建的时候，会自动创建"),e("code",[t._v("master")]),t._v("分支，并且将"),e("code",[t._v("HEAD")]),t._v("指针指向"),e("code",[t._v("master")]),t._v("分支。")])]),t._v(" "),e("h3",{attrs:{id:"工作区"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#工作区"}},[t._v("#")]),t._v(" 工作区")]),t._v(" "),e("p",[t._v("本地项目存放文件的位置")]),t._v(" "),e("h3",{attrs:{id:"暂存区-index-stage"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#暂存区-index-stage"}},[t._v("#")]),t._v(" 暂存区 "),e("code",[t._v("(Index/Stage)")])]),t._v(" "),e("p",[t._v("顾名思义就是暂时存放文件的地方，通过是通过"),e("code",[t._v("add")]),t._v("命令将工作区的文件添加到缓冲区")]),t._v(" "),e("h3",{attrs:{id:"本地仓库-repository"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#本地仓库-repository"}},[t._v("#")]),t._v(" 本地仓库"),e("code",[t._v("(Repository)")])]),t._v(" "),e("p",[t._v("通常情况下，我们使用"),e("code",[t._v("commit")]),t._v("命令可以将暂存区的文件添加到本地仓库")]),t._v(" "),e("h3",{attrs:{id:"远程仓库-remote"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#远程仓库-remote"}},[t._v("#")]),t._v(" 远程仓库"),e("code",[t._v("(Remote)")])]),t._v(" "),e("ol",[e("li",[t._v("举个例子，当我们使用"),e("code",[t._v("GitHub")]),t._v("托管我们项目时，它就是一个远程仓库。")]),t._v(" "),e("li",[t._v("通常我们使用"),e("code",[t._v("clone")]),t._v("命令将远程仓库代码拷贝下来，本地代码更新后，通过"),e("code",[t._v("push")]),t._v("托送给远程仓库。")])]),t._v(" "),e("h2",{attrs:{id:"git-基础工作流程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git-基础工作流程"}},[t._v("#")]),t._v(" Git 基础工作流程")]),t._v(" "),e("p",[e("img",{attrs:{src:s(817),alt:""}})]),t._v(" "),e("h3",{attrs:{id:"配置-user-信息"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置-user-信息"}},[t._v("#")]),t._v(" 配置 USER 信息")]),t._v(" "),e("p",[t._v("配置"),e("code",[t._v("user.name")]),t._v("和"),e("code",[t._v("user.email")])]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("$ git config "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("global user"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"your name"')]),t._v("\n$ git config "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("global user"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("email "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"your email"')]),t._v("\n")])])]),e("p",[e("code",[t._v("config")]),t._v("的三个作用域，缺省等同于"),e("code",[t._v("local")]),t._v("，"),e("code",[t._v("local")]),t._v("仅限于在当前仓库下设置，如果同时设置了"),e("code",[t._v("global")]),t._v("和"),e("code",[t._v("local")]),t._v("，那么"),e("code",[t._v("local")]),t._v("高于"),e("code",[t._v("global")])]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("$ git config "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("global "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 对当前用户所有仓库有效")]),t._v("\n$ git config "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("local "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 只对某个仓库有效")]),t._v("\n$ git config "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("system "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 对系统所有登录的用户所有仓库有效")]),t._v("\n")])])]),e("p",[t._v("显示"),e("code",[t._v("config")]),t._v("的配置，加"),e("code",[t._v("--list")])]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("$ git config "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("list "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("global\n$ git config "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("list "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("local\n$ git config "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("list "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("system\n")])])]),e("h3",{attrs:{id:"建立-git-仓库"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#建立-git-仓库"}},[t._v("#")]),t._v(" 建立 Git 仓库")]),t._v(" "),e("p",[t._v("两种方案：")]),t._v(" "),e("ol",[e("li",[t._v("把已有的项目代码纳入 Git 管理")])]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("$ cd项目代码所在的文件夹\n$ git init\n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[t._v("新建的项目直接用 Git 管理")])]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("$ cd某个文件夹\n$ git init your_project "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 会在当前路径下创建和项目名称相同的文件夹")]),t._v("\n$ cd your_project\n")])])])])}),[],!1,null,null,null);a.default=r.exports}}]);