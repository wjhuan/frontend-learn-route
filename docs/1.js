function findMaxConsecutiveChar(str) {
  if (str.length === 0) {
    return { char: '', count: 0 }
  }

  let maxChar = str[0]
  let currentChar = str[0]
  let count = 1
  let maxCount = 1

  for (let i = 1; i < str.length; i++) {
    if (str[i] === currentChar) {
      count++
    } else {
      currentChar = str[i]
      count = 1
    }

    if (count > maxCount) {
      maxCount = count
      maxChar = currentChar
    }
  }

  return { char: maxChar, count: maxCount }
}

// 示例用法
const inputString = 'aaabbbccccddddd'
const result = findMaxConsecutiveChar(inputString)
console.log(`最多的字符是 "${result.char}"，出现了 ${result.count} 次。`)
