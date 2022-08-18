// components/song-item-show/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    song: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 1
    }
  },
  options: {
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
    play() {
      wx.navigateTo({
        url: '/pages/music-play/index?id=' + this.properties.song.id,
      })
    }
  }
})
