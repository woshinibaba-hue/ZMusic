// components/song-menu-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    song: {
      type: Object,
      value: {}
    }
  },

  options : {
    addGlobalClass: true
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    songsDetail() {
      wx.navigateTo({
        url: '/pages/song-detail/index?id=' + this.properties.song.id,
      })
    }
  }
})
