(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{809:function(t,s,a){"use strict";a.r(s);var n=a(74),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"typescript-面试题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#typescript-面试题"}},[t._v("#")]),t._v(" typescript 面试题")]),t._v(" "),s("h2",{attrs:{id:"typescript-的数据类型有哪些"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#typescript-的数据类型有哪些"}},[t._v("#")]),t._v(" typescript 的数据类型有哪些")]),t._v(" "),s("p",[t._v("基本类型："),s("code",[t._v("number、string、boolean、null、undefined、symbol、bigint")]),t._v("\n数组类型："),s("code",[t._v("number[]、string[]、boolean[]、Array、Array、Array")]),t._v("\n元组类型："),s("code",[t._v("[number, string, boolean]")]),t._v("\n枚举类型："),s("code",[t._v("enum Color {Red, Green, Blue}")]),t._v("\nAny 类型："),s("code",[t._v("any")]),t._v("\nVoid 类型："),s("code",[t._v("void")]),t._v("\nObject 类型："),s("code",[t._v("object、Object")]),t._v("\nNever 类型："),s("code",[t._v("never")])]),t._v(" "),s("h2",{attrs:{id:"typescript-中枚举类型的理解"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#typescript-中枚举类型的理解"}},[t._v("#")]),t._v(" TypeScript 中枚举类型的理解")]),t._v(" "),s("p",[t._v("枚举类型是 TypeScript 中的一种数据类型，它允许我们定义一些具名的常量集合。使用枚举类型可以更加直观地表达代码含义，提高代码可读性和可维护性。\n在 TypeScript 中，枚举类型通过 enum 关键字进行定义。例如：")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("enum")]),t._v(" Direction "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  Up"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  Down"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  Left"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  Right"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("在这个例子中，我们定义了一个名为 Direction 的枚举类型，其中包含了四个常量成员：Up、Down、Left 和 Right。默认情况下，枚举成员的值会从 0 开始自动编号，也可以手动指定值")]),t._v(" "),s("h2",{attrs:{id:"typescript-中接口的理解"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#typescript-中接口的理解"}},[t._v("#")]),t._v(" TypeScript 中接口的理解")]),t._v(" "),s("p",[t._v("在 TypeScript 中，接口（Interface）是一种抽象的定义，用来描述对象的形状。它定义了一个对象应该具有的属性和方法。")]),t._v(" "),s("p",[t._v("接口的应用场景很广泛，例如在定义函数参数时，可以使用接口来规范参数的类型和结构；在定义类时，可以使用接口来规范类的结构；在定义复杂的对象类型时，可以使用接口来提高代码的可读性和可维护性。")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 先定义一个接口")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("IUser")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v("\n  age"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" getUserInfo "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("user"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" IUser"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("name: ")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v(", age: ")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("age"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 正确的调用")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getUserInfo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'koala'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" age"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("18")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h2",{attrs:{id:"typescript-中类的理解"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#typescript-中类的理解"}},[t._v("#")]),t._v(" TypeScript 中类的理解")]),t._v(" "),s("p",[t._v("在 TypeScript 中，类是一种定义对象属性和方法的结构化方式，使用 class 关键字来定义。")]),t._v(" "),s("p",[t._v("类可以包含属性和方法，通过实例化类可以创建对象，对象可以访问类中定义的属性和方法。")]),t._v(" "),s("p",[t._v("与 JavaScript 不同的是，TypeScript 中的类可以使用访问修饰符来控制属性和方法的访问级别，如 public(默认值，可以自由的访问类程序里定义的成员)、private(只能够在该类的内部进行访问) 和 protected(除了在该类的内部可以访问，还可以在子类中仍然可以访问)。")]),t._v(" "),s("p",[t._v("类也可以继承其他类，使用 extends 关键字来实现继承，从而可以复用已有的类定义。")]),t._v(" "),s("p",[t._v("类还可以实现接口，这种方式称为类实现接口，使用 implements 关键字来实现接口。")]),t._v(" "),s("p",[t._v("总的来说，类是面向对象编程的基本组成部分，可以通过类来创建具有一定属性和行为的对象，并且 TypeScript 中的类支持访问修饰符和继承等面向对象编程的概念，使得代码更加规范和易于维护。")]),t._v(" "),s("h2",{attrs:{id:"typescript-中泛型的理解"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#typescript-中泛型的理解"}},[t._v("#")]),t._v(" TypeScript 中泛型的理解？")]),t._v(" "),s("p",[t._v("在 TypeScript 中，泛型可以让我们在定义函数、类、接口时不预先定义具体的类型，而是在使用时再指定类型。这使得代码更加灵活且可复用性更高。\n以下是一些泛型的基本概念：")]),t._v(" "),s("ol",[s("li",[t._v("泛型函数：使用泛型来定义函数的参数和返回值类型。")])]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token generic-function"}},[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("identity")]),s("span",{pre:!0,attrs:{class:"token generic class-name"}},[s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("T")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")])])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arg"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("T")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("T")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" arg\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("定义泛型的时候，可以一次定义多个类型参数，比如我们可以同时定义泛型 T 和 泛型 U：")]),t._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[t._v("泛型接口：使用泛型来定义接口的属性或方法")])]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("Array")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("T")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  length"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("push")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("items"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("T")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("forEach")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("callbackfn")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("T")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" index"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" array"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("T")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[t._v("泛型类：使用泛型来定义类的属性和方法的类型。")])]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("GenericNumber"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("T")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  zeroValue"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("T")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("add")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("T")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("T")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("T")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" myGenericNumber "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("GenericNumber"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nmyGenericNumber"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("zeroValue "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\nmyGenericNumber"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("add")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" x "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" y\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h2",{attrs:{id:"typescript-中高级类型的理解"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#typescript-中高级类型的理解"}},[t._v("#")]),t._v(" TypeScript 中高级类型的理解？")]),t._v(" "),s("ol",[s("li",[t._v("交叉类型\n使用&符号表示，可以将多个类型合并成一个类型。")]),t._v(" "),s("li",[t._v("联合类型\n使用|符号表示，可以表示一个值属于多种类型之一。")]),t._v(" "),s("li",[t._v("类型别名\n使用 type 关键字定义一个类型别名，方便在其他地方引用该类型。")]),t._v(" "),s("li",[t._v("类型索引\nkeyof 类似于 Object.keys ，用于获取一个接口中 Key 的联合类型。")])]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Button")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("type"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" stringtext"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ButtonKeys")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("keyof")]),t._v(" Button\n")])])]),s("h2",{attrs:{id:"typescript-中-type-与-interface-区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#typescript-中-type-与-interface-区别"}},[t._v("#")]),t._v(" TypeScript 中 type 与 interface 区别")]),t._v(" "),s("ul",[s("li",[t._v("type 可以定义基本类型、联合类型、元组和其他自定义类型，而 interface 只能定义对象类型。")]),t._v(" "),s("li",[t._v("interface 支持继承，而 type 不支持。")]),t._v(" "),s("li",[t._v("当定义类型别名时，type 可以使用联合类型、交叉类型和条件类型等高级类型，而 interface 不支持。")]),t._v(" "),s("li",[t._v("type 是对类型的重新定义，而 interface 是对类型的声明。在某些情况下，type 可以使用更通用的语法，使得类型定义更加简洁易懂")]),t._v(" "),s("li",[t._v("在定义类型时，interface 可以使用 extends、implements 和 keyof 等关键字来增强类型的功能。")])]),t._v(" "),s("h2",{attrs:{id:"什么是-any-类型-何时使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#什么是-any-类型-何时使用"}},[t._v("#")]),t._v(" 什么是 any 类型，何时使用 ？")]),t._v(" "),s("p",[t._v("有时你想将值存储在变量中，但事先不知道该变量的类型")]),t._v(" "),s("p",[t._v("当你没有明确提供类型时，TypeScript 假定变量是 any 类型，并且编译器无法从周围的上下文中推断出类型")])])}),[],!1,null,null,null);s.default=e.exports}}]);