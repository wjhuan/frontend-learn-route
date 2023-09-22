// let arr = [1, 2, 3, 4, 5, 6]

// function search(arr, target) {
//   let len = arr.length
//   if (len <= 0) {
//     return -1
//   }
//   let startIndex = 0
//   let endIndex = len - 1

//   while (startIndex <= endIndex) {
//     let middleIndex = Math.floor((startIndex + endIndex) / 2)
//     let middleValue = arr[middleIndex]
//     if (middleValue < target) {
//       startIndex = middleIndex + 1
//     } else if (middleValue > target) {
//       endIndex = middleIndex - 1
//     } else {
//       return middleIndex
//     }
//   }
//   // 插入
//   return -1
// }

// const index = search(arr, 5)
// console.log(index, 'index')


function binarySearchAndInsert(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let insertIndex = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    console.log(left,"left")
    console.log(right,"right")
    if (arr[mid] === target) {
      return mid; // 找到目标值，返回索引
    } else if (arr[mid] < target) {
      left = mid + 1;
      
    } else {
      right = mid - 1;
      // console.log('right',mid)
      insertIndex = mid; // 记录可能的插入位置
    }
  }

  // 如果没有找到目标值，将目标值插入到合适的位置
  console.log(insertIndex,"insertIndex")
  if (insertIndex === -1) {
    arr.splice(left, 0, target);
    return left;
  } else {
    arr.splice(insertIndex, 0, target);
    return insertIndex;
  }
}

// 示例用法
const sortedArray = [1, 3, 5, 7, 9];
const targetValue = 6;
const index = binarySearchAndInsert(sortedArray, targetValue);

console.log("目标值的索引：", index);
console.log("更新后的数组：", sortedArray);

