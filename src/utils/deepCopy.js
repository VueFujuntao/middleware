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

function deepCopy(obj) {
  let newObj = null;
  if (getType(obj) === 'nomal') {
    return obj;
  } else {
    newObj = getType(obj) === 'Object' ? {} : [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepCopy(obj[key]);
      }
    }
  }
  return newObj;
}

export default deepCopy;