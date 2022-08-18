// pages/search-detail/index.js
import {
  getHotSearch,
  getSearchSuggest,
  getSearchResult
} from '../../service/api/search'
import { debounce } from '../../utils/debounce'

import { playStore } from '../../store/index'

const searchSuggestDebounce = debounce(getSearchSuggest)

Page({
  data: {
    searchHot: [],
    searchKey: '',
    searchAllMatch: [],
    searchRes: [], // 搜索结果
    nodes: [],
    hasMore: true, // 是否加载完毕
    page: 1 // 当前页码
  },

  onLoad: function (options) {
    this.getSearchData()
  },

  getSearchData() {
    getHotSearch().then(res => {
      this.setData({ searchHot: res.result.hots })
    })
  },

  searchChange(e) {
    this.setData({ searchKey: e.detail })

    if (!e.detail) {
      this.setData({ searchAllMatch: [], searchRes: [] })
      return
    }

    searchSuggestDebounce(e.detail).then(res => {
      this.setData({ searchAllMatch: res.result.allMatch })

      // 初始化nodes节点
      let nodes = []
      const suggestSongsNodes = []
      const suggestKeywords = res.result.allMatch.map(item => item.keyword)

      for (const keyword of suggestKeywords) {
        // 判断搜索建议的开头字符是否包含当前输入内容
        if (keyword.toUpperCase().startsWith(e.detail.toUpperCase())) {
          const matchingKeys = keyword.slice(0, e.detail.length)
          const notMatchingKeys = keyword.slice(e.detail.length)

          const matchingKey = {
            name: 'span',
            attrs: {
              style: 'color: #26ce8a; font-size: 28rpx;'
            },
            children: [
              {
                type: 'text',
                text: matchingKeys
              }
            ]
          }
          nodes.push(matchingKey)
          const notMatchingKey = {
            name: 'span',
            attrs: {
              style: 'color: #000; font-size: 28rpx;'
            },
            children: [
              {
                type: 'text',
                text: notMatchingKeys
              }
            ]
          }
          nodes.push(notMatchingKey)
        } else {
          const key = {
            name: 'span',
            attrs: {
              style: 'color: #000; font-size: 28rpx;'
            },
            children: [
              {
                type: 'text',
                text: keyword
              }
            ]
          }
          nodes.push(key)
        }
        suggestSongsNodes.push(nodes)
        nodes = []
      }
      this.setData({ nodes: suggestSongsNodes })
    })
  },

  search(e) {
    const keyword = e.currentTarget.dataset.keyword
    this.setData({ searchKey: keyword })

    this.getSearchRes(keyword)
  },

  getSearchRes(keyword, offset) {
    getSearchResult(keyword, offset).then(res => {
      this.setData({
        hasMore: res.result.hasMore,
        searchRes: [...this.data.searchRes, ...res.result.songs]
      })
    })
  },

  onReachBottom() {
    if (this.data.hasMore) {
      this.setData({ page: this.data.page + 1 })
      const offset = (this.data.page - 1) * 15
      this.getSearchRes(this.data.searchKey, offset)
    } else {
      wx.showToast({
        title: '亲加载完成了哟~',
        icon: 'none'
      })
    }
  },

  playMusic(e) {
    playStore.setState('playSongs', this.data.searchRes)
    playStore.setState('playIndex', e.currentTarget.dataset.index)
  }
})
