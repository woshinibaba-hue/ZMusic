// pages/music-play/index.js
import { backgroundAudio } from '../../store/index'

import { playStore } from '../../store/index'

const app = getApp()

const playModels = ['order', 'repeat', 'random']

Page({
  data: {
    songDetail: {},
    currentPage: 0,
    statusBarHeight: app.globalData.statusBarHeight,
    screenHeight: app.globalData.screenHeight,
    NavBarHeight: app.globalData.NavBarHeight,
    ratio: app.globalData.ratio,
    isSlider: false, // 进度条是否滑动

    currentTime: 0,
    slider: 0,
    lyricArr: [],
    currentIndex: 0,
    scrollTop: 0,
    isPlay: false,
    playName: 'pause', // 播放按钮图标
    playModel: 'order'
  },

  onLoad: function (options) {
    const id = options.id
    this.ListeningStore(id)
  },

  swiperChange(e) {
    this.setData({ currentPage: e.detail.current })
  },

  // 当进度条发生改变时触发
  sliderChange(e) {
    const slider = e.detail.value
    const currentTime = (this.data.songDetail.dt * (slider / 100)) / 1000
    backgroundAudio.seek(currentTime)
    this.setData({ isSlider: false, slider })
  },

  // 滑动进度条时触发
  sliderChangeIng(e) {
    const slider = e.detail.value
    const currentTime = this.data.songDetail.dt * (slider / 100)
    this.setData({ currentTime, isSlider: true, slider })
  },

  // 点击切换歌曲与歌词页
  toggle(e) {
    this.setData({ currentPage: e.currentTarget.dataset.page })
  },

  // 监听store数据变化
  ListeningStore(id) {
    playStore.dispatch('getPlayMusicDataAction', { id })
    playStore.dispatch('setupAudioContextListenerAction')

    playStore.onStates(
      ['songDetail', 'lyricArr', 'isPlay'],
      ({ songDetail, lyricArr, isPlay }) => {
        if (songDetail) this.setData({ songDetail })
        if (lyricArr) this.setData({ lyricArr })
        if (isPlay !== undefined)
          this.setData({ playName: isPlay ? 'pause' : 'resume', isPlay })
      }
    )

    playStore.onStates(
      ['currentTime', 'currentIndex'],
      ({ currentTime, currentIndex }) => {
        if (currentTime !== undefined && !this.data.isSlider) {
          this.setData({
            currentTime,
            slider: (currentTime / this.data.songDetail.dt) * 100
          })
        }
        if (currentIndex) {
          this.setData({ currentIndex, scrollTop: currentIndex * 35 })
        }
      }
    )
  },

  // 暂停/播放切换
  playMusic() {
    this.setData({ isPlay: !this.data.isPlay })
    playStore.dispatch('musicPlayAction', this.data.isPlay)
  },

  // 播放模式切换
  playModel() {
    let playStatus = playStore.state.playStatus
    playStatus = playStatus + 1
    if (playStatus === 3) playStatus = 0
    playStore.setState('playStatus', playStatus)
    this.setData({ playModel: playModels[playStatus] })
  },

  // 切换音乐
  playToggle(e) {
    const isNext = e.currentTarget.dataset.isnext
    playStore.dispatch('playToggleMusic', isNext)
  }
})
