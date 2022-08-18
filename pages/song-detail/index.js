// pages/song-detail/index.js
import { getSongsDetails } from '../../service/api/songsDetail'

import { playStore } from '../../store/index'

Page({
  data: {
    songsDetail: {}
  },

  onLoad(options) {
    this.getSongsDetailData(options.id)
  },

  // 获取歌单详情
  getSongsDetailData(id) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    getSongsDetails(id).then(res => {
      wx.setNavigationBarTitle({
        title: res.playlist.name
      })
      this.setData({ songsDetail: res.playlist })
      wx.hideLoading()
    })
  },

  playMusic(e) {
    playStore.setState('playSongs', this.data.songsDetail.tracks)
    playStore.setState('playIndex', e.currentTarget.dataset.index)
  }
})
