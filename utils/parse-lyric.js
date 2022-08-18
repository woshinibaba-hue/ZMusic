const lyricReg = /\[(\d+):(\d+)\.(\d+)\]/

/**
 * 解析歌词
 * @param {string} lyric 歌词字符串
 * @returns {Array<{time: number, lyric: string}>}
 */
export function parseLyric(lyric) {
  // 1. 根据 \n 符号将歌词分割为数组， "[00:00.000] 作词 : 黄淑惠/林怡凤"
  const lytics = lyric.split('\n')
  // 歌词数组
  const lyricArr = []
  lytics.forEach(lyr => {
    const res = lyricReg.exec(lyr)
    if (res) {
      // 获取分钟
      const minute = res[1] * 60 * 1000
      // 获取秒
      const second = res[2] * 1000
      // 获取毫秒
      const millsecondTime =
        res[3].length === 2 ? res[3] * 10 : parseInt(res[3])
      // 获取总时长
      const time = minute + second + millsecondTime
      // 获取当前时长对应的歌词
      const lyric = lyr.replace(lyricReg, '')
      lyricArr.push({ time, lyric })
    }
  })
  return lyricArr
}
