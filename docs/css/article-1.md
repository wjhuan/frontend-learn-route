---
title: 初识 HTML 和 CSS
---

# 初识 HTML 和 CSS

## HTML 语义

### 什么叫 HTML？学会如何写出更优的 html

超文本标记语言`（英语：HyperText Markup Language，简称：HTML）`是一种用于创建网⻚的标准标记语言

常用的 html 标签汇总:

`HTML4:`

- 基本文档：`html、head、body...`
- 基本标签: `h1-h6、p、br、hr、<!--...-->..`
- 文本格式化：`strong、b、em、i、small、strong、del、sub、sup...`
- 链接: `a、link`
- 图片: `img、map、area`
- 区块: `div、span`
- 三大列表: `ul li 、ol li、dl dt dd`
- 表格: `table、caption、th、tr、td、thead、tbody、tfoot`
- 框架: `iframe`
- 表单: `form、input、select option、textarea、button、label`
- 实体: `&lt、&gt、&copy、&nbsp...`

`HTML5:`

- 图形新元素：`canvas `
- 新多媒体元素: `audio、video、source、embed、track `
- 新表单元素: `deatalist、keygen、output `
- 新的语义和结构元素: `article、aside、bdi、command、details、dialog、summary、figure、 figcaption、footer、header、mark、meter、nav、progress、ruby、rt、rp、section、time、 wbr`

### 怎么知道我的标签用的对不对？

可以尝试去掉`CSS`，只将`HTML`代码显示在⻚⾯中，看看你的内容结构是否依然清晰、好看。 你还可以把代码上传到 `W3C` 标记验证服务 ，它会帮你验证你的代码是否有效或合理。

### 语义化含义和好处

指对文本内容的结构化`（内容语义化）`，选择合乎语义的标签`（代码语义化）`，便于开发者阅读，维护和写出更优雅的代码的同时，让浏览器的爬虫和辅助技术更好的解析 `(通俗理解: 用正确的标签做正确的事)`

- 有利于 `SEO` 优化（也就是搜索引擎的抓取，搜索引擎的爬虫也依赖于标记来确定上下文和各个关键字的权重
- 在样式丢失的时候，还是可以比较好的呈现结构
- 更好的支持各种终端，例如无障碍阅读和有声小说等
- 利于团队开发和维护，`W3C` 给我们定了一个标准，那么团队中都遵循这个标准，那么代码的差异就会缩小，在开发和维护的时候就可以提高效率

### 结构搭建

- 采用`HTML5`标准时开头应该加上`<!DOCTYPE html>`
- 应在`head`标签中引入CSS文件，这样浏览器就可以在输出HTML之前获取CSS信息
- 在`body`标签的末尾引入`js`文件，这样可以在⻚面显示之后再编译`js`文件，以加快⻚面读取速度，同时有助于`js`对⻚面中的元素进行操作对元素的操作应添加在`js`代码中，而不要在`html`中添加，后期难以维护

### 语义化设计

- 标题使用`h1(h2、h3、...)` ，列表使用`ul`或者`ol`
- 在适当的地方使用`HTML5`的新元素，比如`header、footer、nav、aside`
- 正文中的文本内容要用`p`标签，内容的结构化可以使用`HTML5`的新元素`（或者div)`
- 修改文字样式时，`em`和`strong`要比`i`和`b`更好些，因为前者语义更加明显
- `form`中要包含`label`元素，`input`要有`type、placeholder`以及其他必要的属性，即使值为空都可以
- 尽量减少使用无意义标签，例如`span`和`div`
- 尽量不使用标签本身的`css`属性，例如`b、font、s`等标签，如果需要这些样式，那么使用`css`样式来进行添加
- 在需要强调的部分，使用`strong、em`，但是样式尽量使用`css`样式来描述
- 使用表格时，标题用 `caption`，表头用 `thead`，主体部分用 `tbody` 包围，尾部用 `tfoot` 包围。表头和一般单元格要区分开，表头用 `th`，单元格用 `td`。列表搭建时，使用`<ul>`无序列表`<ul><ol>`有序列表`<ol><dl>`定义列表
- 表单域要用 `fieldset` 标签包起来，并用 `legend` 标签说明表单的用途（可理解为表单标题）每个`input`标签对应的说明文本都需要使用`label`标签，并且通过为`input`设置`id`属性，在`lable`标签中设置`for = ld`来让说明文本和相对应的`input`关联起来，或者直接在`label`中内嵌控件