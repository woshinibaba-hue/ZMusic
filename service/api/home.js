import request from '../request'

/**
 * 获取轮播图
 * @param {Number} type 轮播图类型
 * 0: pc
 * 1: android
 * 2: iphone
 * 3: ipad 
 * @returns {Promise}
 */
export function getBanner(type = 2) {
  return request.get('/banner', {
    type
  })
}

/**
 * 获取推荐歌曲 不支持 offset
 * @param {number} limit 数据条数
 * @returns {Promise}
 */
export function getPersonalizedSong(limit) {
  return request.get('/personalized/newsong', {
    limit
  })
}

/**
 * 获取歌单信息
 * @param {number} limit 取出个歌单数量
 * @param {number} offset 偏移数量 (当前页码 * limit)
 * @param {string} cat tag 标签
 */
export function getPlayList(limit, offset, cat) {
  return request.get('/top/playlist', {
    cat,
    limit,
    offset
  })
}

/**
 * 获取排行榜内容摘要
 * @returns {Promise}
 */
export function getTopListDetail() {
  return request.get('/toplist/detail')
}