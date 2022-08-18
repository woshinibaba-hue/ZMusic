// pages/home/index.js
import { rankingStore, playStore } from '../../store/index'

import { getBanner } from '../../service/api/home'
import selectQuery from '../../utils/selector-query'
import { throttle } from '../../utils/throttle'

const throttleSelectQuery = throttle(selectQuery)

Page({
  data: {
    banners: [],
    recommendSongs: [], // 推荐歌曲
    hotSongsMenus: [], // 热门歌单
    recommendMenus: [], // 推荐歌单
    topListDetails: [], // 排行榜
    swiperHeight: 0,
    songDetail: {}, // 当前播放音乐详情
    isPlay: false, // 是否播放音乐
    playIcon: 'pause'
  },

  // 生命周期钩子
  onLoad() {
    this.getHomeData()
    this.monitorPlayStore()
  },

  // 其他方法
  handleSearch() {
    wx.navigateTo({
      url: '/pages/search-detail/index'
    })
  },

  // 获取首页数据
  getHomeData() {
    getBanner().then(res => {
      this.setData({ banners: res.banners })
    })

    // 获取推荐歌曲
    rankingStore.dispatch('getPersonalizedSongs')
    rankingStore.onState('recommendSongs', res => {
      this.setData({ recommendSongs: res })
    })

    // 获取歌单
    rankingStore.dispatch('getSongMenus')
    rankingStore.onState('hotSongsMenus', res => {
      this.setData({ hotSongsMenus: res })
    })
    rankingStore.dispatch('getSongMenus', 1, '华语')
    rankingStore.onState('recommendMenus', res => {
      this.setData({ recommendMenus: res })
    })

    // 获取排行榜
    rankingStore.dispatch('getTopListDetails')
    rankingStore.onState('topListDetails', res => {
      this.setData({ topListDetails: res })
    })
  },

  handleImageLoad() {
    throttleSelectQuery('.swiper-item-img').then(res => {
      this.setData({
        swiperHeight: res[0].height
      })
    })
  },

  recommendClick(e) {
    playStore.setState('playSongs', this.data.recommendSongs)
    playStore.setState('playIndex', e.currentTarget.dataset.index)
  },

  monitorPlayStore() {
    playStore.onStates(['songDetail', 'isPlay'], ({ songDetail, isPlay }) => {
      if (songDetail) this.setData({ songDetail })
      if (isPlay !== undefined)
        this.setData({
          isPlay,
          playIcon: isPlay ? 'pause' : 'play'
        })
    })
  },

  playMusic() {
    playStore.dispatch('musicPlayAction', !this.data.isPlay)
  }
})
