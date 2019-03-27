// 分页截取
export default function Delivery({ array, pageNum, pageSize  }) {
  let reg = /^[0-9]+.?[0-9]*$/;
  if (Array.isArray(array) && reg.test(pageNum) && reg.test(pageSize)) {
    return array.slice(pageSize * (pageNum - 1), pageSize * (pageNum - 1) + pageSize);
  }
}