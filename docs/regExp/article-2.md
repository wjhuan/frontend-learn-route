---
title: 例子
---

# 例子

## ^、$元字符

### 匹配以数字开头的字符串

```javascript
// 匹配以数字开头的字符串
let reg = /^\d/
reg.test('wangjiahuan') // => false
reg.test('2021wangjiahuan') // => true
reg.test('wangjiahuan2021') // => false
```

### 匹配以数字结尾的字符串

```javascript
// 匹配以数字结尾的字符串
let reg = /\d$/
reg.test('wangjiahuan') // => false
reg.test('2021wangjiahuan') // => false
reg.test('wangjiahuan2021') // => true
```

### 匹配字符串是否包含数字

```javascript
// 匹配字符串是否包含数字
let reg = /\d+/
reg.test('wangjiahuan') // => false
reg.test('2021wangjiahuan') // => true
reg.test('wangjiahuan2021') // => true
```

### 匹配字符串是否只包含数字

```javascript
// 匹配字符串是否包含数字
let reg = /^\d+$/
reg.test('wangjiahuan') // => false
reg.test('2021') // => true
reg.test('wangjiahuan2021') // => false
```

### 转义字符

```javascript
// 比如只想匹配5.5这个小数
let reg = /^5.5$/ // 这么写.代表除\n外的任意字符
reg.test('5.5') // => true
reg.test('5@5') // => true
reg.test('55') // => false

reg = /^5\.5$/ // 想要达到效果，需要加转义字符\
reg.test('5.5') // => true
reg.test('5@5') // => false
reg.test('55') // => false
```
