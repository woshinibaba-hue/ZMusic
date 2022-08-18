// components/nav-bar/index.js
const app = getApp()

Component({
  properties: {

  },
  options: {
    multipleSlots: true
  },

  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    NavBarHeight: app.globalData.NavBarHeight
  },

  methods: {
    back() {
      wx.navigateBack()
    }
  }
})
