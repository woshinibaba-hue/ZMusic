// pages/video/index.js
import { getVideoList } from '../../service/api/video'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoList: [], // 视频列表
    hasMore: true // 是否加载完毕
  },

  // 获取视频列表数据
  async getVideo() {
    if (!this.data.hasMore) {
      return wx.showToast({
        title: '没有更多视频了哟, 亲',
        icon: 'none'
      })
    }
    const res = await getVideoList(this.data.videoList.length)
    wx.stopPullDownRefresh()
    this.setData({
      videoList: [...this.data.videoList, ...res.data],
      hasMore: res.hasMore
    })
  },

  handleVideo(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/video-detail/index?id=${id}`,
    })
  },

  onLoad(options) {
    this.getVideo()
  },

  onPullDownRefresh() {
    this.setData({ hasMore: true, videoList: [] })
    this.getVideo()
  },

  onReachBottom() {
    this.getVideo()
  }
})