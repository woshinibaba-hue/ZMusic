// app.js
import { NavBarHeight } from './constants/device-const'

import { loginRequest } from './service/request'

App({
  globalData: {
    statusBarHeight: 0,
    screenHeight: 0,
    NavBarHeight,
    ratio: 0
  },
  async onLaunch() {
    wx.getSystemInfo({
      success: res => {
        this.globalData.statusBarHeight = res.statusBarHeight // 获取当前设备状态栏高度
        this.globalData.screenHeight = res.screenHeight
        this.globalData.ratio = res.screenHeight / res.screenWidth
      }
    })

    // 获取本地存储中的token
    const token = wx.getStorageSync('musicToken')
    // 验证token是否过期
    const res = await this.checkToken(token)
    // 验证session_key是否过期
    const isCheckSession = await this.checkSession()

    // 当token不存在或者token验证失败或者session_key过期时需要执行登录
    if (!token || !res || !isCheckSession) {
      this.login()
    }
  },

  login() {
    wx.login().then(async res => {
      const data = await loginRequest.post('/login', { code: res.code })
      // 将token保存至本地存储当中
      wx.setStorageSync('musicToken', data.data.token)
    })
  },

  async checkToken(token) {
    const res = await loginRequest.post('/auth', {}, { token })
    if (res.code !== 200) {
      return false
    }
    return true
  },

  // 验证 session_key 是否过期
  checkSession() {
    return new Promise((resolve, reject) => {
      wx.checkSession()
        .then(res => {
          console.log('res: ', res)
          resolve(res)
        })
        .catch(err => {
          console.log('err: ', err)
          reject(err)
        })
    })
  }
})
