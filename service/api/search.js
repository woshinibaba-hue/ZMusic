import request from '../request'

/**
 * 获取热门搜索
 * @returns {Promise}
 */
export function getHotSearch() {
  return request.get('/search/hot')
}

/**
 * 获取搜索建议
 * @param {string} keywords 搜索关键字
 * @returns {Promise}
 */
export function getSearchSuggest(keywords) {
  return request.get('/search/suggest', {
    type: 'mobile',
    keywords
  })
}

/**
 * 获取搜索结果
 * @param {string} keyword 搜索关键字
 * @param {number} limit 查询数量
 * @param {number} offset 偏移数量
 * @returns {Promise}
 */
export function getSearchResult(keywords, offset = 0, limit = 15) {
  return request.get('/search', {
    keywords,
    limit,
    offset
  })
}