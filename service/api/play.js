import request from '../request'

/**
 * 获取歌曲详情
 * @param {number} ids 歌曲id
 * @returns {Promise}
 */
export function getMusicDetailData(ids) {
  return request.get('/song/detail', {
    ids
  })
}

/**
 * 获取歌词
 * @param {numvber} id 歌词id
 * @returns {Promise}
 */
export function getLyric(id) {
  return request.get('/lyric', {
    id
  })
}