
/**
 * 转换列表排序方式
 * @param {*} type
 */
export default function convertOrderType(type) {
  if (type === 'ascend') {
    return 'asc'
  }
  if (type === 'desend') {
    return 'desc'
  }
  return 'asc'
}
