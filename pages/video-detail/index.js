// pages/video-detail/index.js
import { getMvDetail, getMvUrl, getRelatedMv } from '../../service/api/video'

Page({
  data: {
    mvUrl: '',
    mvDetail: null,
    mvRelated: []
  },

  onLoad: function (options) {
    console.log(options.id)
    this.getData(options.id)
  },

  // 获取当前mv相关数据
  getData(id) {
    // 这里不适用async await 是因为它会阻塞代码执行，因为下面网络请求并不需要等待上一次网络结果再进行请求，所以在这不推荐使用async await

    getMvUrl(id).then(res => {
      this.setData({ mvUrl: res.data.url })
    })

    getMvDetail(id).then(res => {
      this.setData({ mvDetail: res.data })
      // 动态设置导航栏标题
      wx.setNavigationBarTitle({
        title: `${res.data.name} - ${res.data.artistName}`
      })
    })

    getRelatedMv(id).then(res => {
      this.setData({ mvRelated: res.mvs })
    })
  },

  handleRelated(e) {
    const id = e.currentTarget.dataset.id
    wx.redirectTo({
      url: `/pages/video-detail/index?id=${id}`
    })
  }
})