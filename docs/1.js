// const path = require('path')
// console.log(process.cwd(), 'process.cwd')
// console.log(__dirname, '__dirname')
// console.log(__filename, '__filename')
// console.log(path.resolve('a', '1.js'))
// console.log(path.join('a', '1.js'))

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

;(async function () {
  console.log('Do some thing, ' + new Date())
  await sleep(3000)
  console.log('Do other things, ' + new Date())
})()
