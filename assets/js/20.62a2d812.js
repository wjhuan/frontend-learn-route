(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{673:function(t,e,s){t.exports=s.p+"assets/img/typescript.f8ea7787.jpg"},768:function(t,e,s){"use strict";s.r(e);var a=s(74),r=Object(a.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"初识-typescript"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#初识-typescript"}},[t._v("#")]),t._v(" 初识 TypeScript")]),t._v(" "),e("h2",{attrs:{id:"什么是-typescript"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#什么是-typescript"}},[t._v("#")]),t._v(" 什么是 TypeScript")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("TypeScript")]),t._v("是由微软开发的一款开源的编程语言")]),t._v(" "),e("li",[e("code",[t._v("TypeScript")]),t._v("是"),e("code",[t._v("Javascript")]),t._v("的超集，遵循最新的"),e("code",[t._v("ES5/ES6")]),t._v("规范。"),e("code",[t._v("TypeScript")]),t._v("扩展了"),e("code",[t._v("Javascript")]),t._v("语法")]),t._v(" "),e("li",[e("code",[t._v("TypeScript")]),t._v("更像后端"),e("code",[t._v("Java")]),t._v("、"),e("code",[t._v("C#")]),t._v("这样的面向对象语言可以让 JS 开发大型企业应用")]),t._v(" "),e("li",[t._v("越来越多的项目是基于"),e("code",[t._v("TS")]),t._v("的，比如"),e("code",[t._v("VSCode、Angular6、Vue3、React16/17")])]),t._v(" "),e("li",[e("code",[t._v("TS")]),t._v("提供的类型系统可以帮助我们在写代码的时候提供更丰富的语法提示")]),t._v(" "),e("li",[t._v("在创建前的编译阶段经过类型系统的检查，就可以避免很多线上的错误")])]),t._v(" "),e("blockquote",[e("p",[e("code",[t._v("TypeScript")]),t._v("不会取代"),e("code",[t._v("JS")]),t._v(", 尤雨溪： 我认为将类型添加到"),e("code",[t._v("JS")]),t._v("本身是一个漫长的过程 。让委员会设计一个类型系统是（根据"),e("code",[t._v("TC39")]),t._v("的经历来判断）不切实际的")])]),t._v(" "),e("p",[e("img",{attrs:{src:s(673),alt:""}})]),t._v(" "),e("h2",{attrs:{id:"安装编译-typescript"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装编译-typescript"}},[t._v("#")]),t._v(" 安装编译 TypeScript")]),t._v(" "),e("p",[t._v("命令行运行如下命令，全局安装 "),e("code",[t._v("TypeScript")]),t._v("：")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[t._v("npm install "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("g typescript\n")])])]),e("p",[t._v("安装完成后，在控制台运行如下命令，检查安装是否成功")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[t._v("tsc "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token constant"}},[t._v("V")]),t._v("\n")])])]),e("p",[t._v("生成配置文件")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[t._v("tsc "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("init # 生成tsconfig"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("json\n")])])]),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"compilerOptions"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* Basic Options */")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"target"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"es5"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. 指定ECMAScript的目标版本*/")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"module"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"commonjs"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. 指定模块代码的生成方式*/")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "lib": [],                             /* Specify library files to be included in the compilation. 指定编译的时候用来包含的编译文件*/')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "allowJs": true,                       /* Allow javascript files to be compiled. 允许编译JS文件*/')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "checkJs": true,                       /* Report errors in .js files. 在JS中包括错误*/')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// \"jsx\": \"preserve\",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. 指定JSX代码的生成方式 是保留还是react-native或者react*/")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// \"declaration\": true,                   /* Generates corresponding '.d.ts' file.生成相应的类型声明文件 */")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// \"declarationMap\": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. 为每个类型声明文件生成相应的sourcemap*/")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// \"sourceMap\": true,                     /* Generates corresponding '.map' file. 生成对应的map文件 */")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "outFile": "./",                       /* Concatenate and emit output to single file. 合并并且把编译后的内容输出 到一个文件里*/')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "outDir": "./",                        /* Redirect output structure to the directory.按原始结构输出到目标目录 */')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. 指定输入文件的根目录，用--outDir来控制输出的目录结构*/')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "composite": true,                     /* Enable project compilation 启用项目编译*/')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "removeComments": true,                /* Do not emit comments to output. 移除注释*/')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "noEmit": true,                        /* Do not emit outputs. 不要输出*/')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// \"importHelpers\": true,                 /* Import emit helpers from 'tslib'. */")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// \"downlevelIteration\": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. 当目标是ES5或ES3的时候提供对for-of、扩展运算符和解构赋值中对于迭代器的完整支持*/")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// \"isolatedModules\": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule').r把每一个文件转译成一个单独的模块 */")]),t._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* Strict Type-Checking Options */")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//"strict": true,                           /* Enable all strict type-checking options. 启用完全的严格类型检查 */')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// \"noImplicitAny\": true,                 /* Raise error on expressions and declarations with an implied 'any' type. 不能使用隐式的any类型*/")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "strictNullChecks": true,              /* Enable strict null checks. 启用严格的NULL检查*/')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "strictFunctionTypes": true,           /* Enable strict checking of function types. 启用严格的函数类型检查*/')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// \"strictBindCallApply\": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions.启用函数上严格的bind call 和apply方法 */")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. 启用类上初始化属性检查*/')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// \"noImplicitThis\": true,                /* Raise error on 'this' expressions with an implied 'any' type.在默认的any中调用 this表达式报错 */")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. 在严格模式下解析并且向每个源文件中发射use strict*/')]),t._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* Additional Checks */")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "noUnusedLocals": true,                /* Report errors on unused locals. 有未使用到的本地变量时报错 */')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "noUnusedParameters": true,            /* Report errors on unused parameters. 有未使用到的参数时报错*/')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. 当不是所有的代码路径都有返回值的时候报错*/')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. 在switch表达式中没有替代的case会报错 */')]),t._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* Module Resolution Options */")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// \"moduleResolution\": \"node\",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). 指定模块的解析策略 node classic*/")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. 在解析非绝对路径模块名的时候的基准路径*/')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// \"paths\": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. 一些路径的集合*/")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. 根目录的列表，在运行时用来合并内容*/')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "typeRoots": [],                       /* List of folders to include type definitions from. 用来包含类型声明的文件夹列表*/')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "types": [],                           /* Type declaration files to be included in compilation.在编译的时候被包含的类型声明 */')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking.当没有默认导出的时候允许默认导入，这个在代码执行的时候没有作用，只是在类型检查的时候生效 */')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//\"esModuleInterop\": true                   /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'.*/")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "preserveSymlinks": true,              /* Do not resolve the real path of symlinks.不要symlinks解析的真正路径 */')]),t._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* Source Map Options */")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. 指定ts文件位置*/')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. 指定 map文件存放的位置 */')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. 源文件和sourcemap 文件在同一文件中，而不是把map文件放在一个单独的文件里*/')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// \"inlineSources\": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. 源文件和sourcemap 文件在同一文件中*/")]),t._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* Experimental Options */")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. 启动装饰器*/')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */')]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("执行编译")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[t._v("tsc # 可以将ts文件编译成js文件\ntsc "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("watch # 监控ts文件变化实时编译js文件\n")])])]),e("p",[e("code",[t._v("vscode")]),t._v("运行")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[t._v("Terminal"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("Run Task"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" tsc"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("build 编译\nTerminal"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("Run Task"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" tsc"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("watch 编译并监听\n")])])]),e("p",[e("code",[t._v("npm scripts")]),t._v("运行")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"scripts"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"dev"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"tsc:watch"')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);e.default=r.exports}}]);