/**
 * 节流函数 -- 传入一个函数，返回一个具有节流功能的函数
 * @param {() => Promise | () => void} fn 需要节流的函数
 * @param {Number} interval 间隔时长
 * @returns {() => Promise}
 */

export function throttle(fn, interval = 1000) {
  // 定时器id
  let timer = null
  // 开始时间默认为0，下一次时间的开始时间就是上一次函数执行时间就是nowTime
  let lastTime = 0
  
  const _throttle = (...args) => {
    return new Promise(async resolve => {
      // 获取当前函数执行时间
      const nowTime = new Date().getTime()

      // 当lastTime不存在，表示第一次执行，就将当时间存入lastTime当中
      if (!lastTime) {
        lastTime = nowTime
      }

      // 计算剩余时间
      const remainTime = interval - (nowTime - lastTime)

      // 当剩余时间小于等于0，就表示时间到了，需要执行函数
      if (remainTime <= 0) {
        // 执行函数
        const res = await fn(...args)
        resolve(res)
        // 函数执行完成之后，将当前时间存入lastTime当中，作为下一次函数执行的开始时间
        lastTime = new Date().getTime()
        // 当定时器存在，清除定时器
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
      } else {
        // 当定时器存在，清除上一次定时器
        if (timer) clearTimeout(timer)

        timer = setTimeout(async () => {
          const res = await fn(...args)
          resolve(res)
          timer = null
          // 函数执行完成之后，将当前时间存入lastTime当中，作为下一次函数执行的开始时间
          lastTime = new Date().getTime()
        }, interval)
      }
    })
  }
  
  return _throttle
}