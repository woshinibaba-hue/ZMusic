// components/song-item/index.js
Component({
  properties: {
    song: {
      type: Object,
      value: {}
    }
  },
  
  options: {
    addGlobalClass: true
  },

  data: {},

  methods: {
    play() {
      wx.navigateTo({
        url: '/pages/music-play/index?id=' + this.properties.song.id,
      })
    }
  }
})
