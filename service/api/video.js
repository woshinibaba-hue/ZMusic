import request from '../request'

/**
 * 获取视频列表
 * @param {Number} offset 偏移量
 * @param {Number} limit 查询数据条数
 * @returns {Promise} res
 */
export function getVideoList(offset, limit = 20) {
  return request.get('/top/mv', {
    offset,
    limit
  })
}

/**
 * 获取mv详情
 * @param {Number} mvid mv id
 * @returns {Promise}
 */
export function getMvDetail(mvid) {
  return request.get('/mv/detail', {
    mvid
  })
}

/**
 * 获取mv播放地址
 * @param {Number} id mv id
 * @returns {Promise}
 */
export function getMvUrl(id) {
  return request.get('/mv/url', {
    id
  })
}

/**
 * 获取相似mv视频
 * @param {Number} mvid mv id
 * @returns {Promise}
 */
export function getRelatedMv(mvid) {
  return request.get('/simi/mv', {
    mvid
  })
}