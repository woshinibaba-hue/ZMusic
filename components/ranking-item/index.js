// components/ranking-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ranking: {
      type: Object,
      value: {}
    }
  },

  options: {
    addGlobalClass: true
  },

  methods: {
    songsDetail() {
      wx.navigateTo({
        url: '/pages/song-detail/index?id=' + this.properties.ranking.id,
      })
    }
  }
})
