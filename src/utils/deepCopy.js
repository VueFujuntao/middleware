// 深度克隆
function getType(obj) {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    return 'Object';
  } else if (Object.prototype.toString.call(obj) === '[object Array]') {
    return 'Array';
  } else {
    return 'nomal';
  }
}

// 循環拷貝
function deepCopy(obj) {
  if (getType(obj) === 'nomal') {
    return obj;
  } else {
    let newObj = getType(obj) === 'Object' ? {} : [];
    for (let key in obj) {
      // 查看對象上是否是自己的屬性
      if (obj.hasOwnProperty(key)) {
        // 遞歸
        newObj[key] = deepCopy(obj[key]);
      }
    }
    return newObj;
  }
}

export default deepCopy;