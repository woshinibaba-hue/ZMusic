/**
 * 防抖函数--传入一个函数，返回一个具有防抖功能的函数
 * @param {() => Promise | Function} fn 需要执行的函数
 * @param {number} delay 延迟时间
 * @returns {() => Promise}
 */
export function debounce(fn, delay = 500) {
  let timerId = null
  const _debounce = (...args) => {
    return new Promise(resolve => {
      if (timerId) clearTimeout(timerId)
      timerId = setTimeout(async () => {
        const res = await fn(...args)
        resolve(res)
      }, delay)
    })
  }

  return _debounce
}