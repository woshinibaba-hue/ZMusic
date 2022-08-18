import request from '../request'

/**
 * 获取歌单详情
 * @param {number} id 歌单id
 * @returns {Promise}
 */
export function getSongsDetails(id) {
  return request.get('/playlist/detail', {
    id
  })
}