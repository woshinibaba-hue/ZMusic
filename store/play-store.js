import { HYEventStore } from 'hy-event-store'

import { getMusicDetailData, getLyric } from '../service/api/play'
import { parseLyric } from '../utils/parse-lyric'

// 创建播放组件
const backgroundAudio = wx.getBackgroundAudioManager()

wx.setInnerAudioOption({
  obeyMuteSwitch: false // 此参数为false，即使用户开启静音模式，依然可以播放音乐
})

const playStore = new HYEventStore({
  state: {
    id: 0, // 当前歌曲id
    songDetail: {}, // 歌曲详情
    lyricArr: [], // 歌词数组

    currentTime: 0, // 当前播放事件 单位: ms
    currentIndex: 0,

    playSongs: [], // 当前播放音乐列表
    playIndex: 0, // 当前播放音乐索引

    isPlay: false, // 是否播放音乐
    playStatus: 0 // 0 循环 1 单曲循环 2 随机
  },
  actions: {
    getPlayMusicDataAction(ctx, { id, isRefresh = false }) {
      if (id === ctx.id && !isRefresh) {
        isRefresh = true
        return
      }

      ctx.id = id
      // 获取歌曲信息
      getMusicDetailData(id).then(res => {
        ctx.isPlay = true
        // 设置音乐url
        backgroundAudio.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
        // 后台播放音乐，必须设置title属性
        backgroundAudio.title = res.songs[0].name
        backgroundAudio.singer = res.songs[0].ar[0].name
        // 设置背景音乐播放封面图
        backgroundAudio.coverImgUrl = res.songs[0].al.picUrl
        // 设置歌曲详情
        ctx.songDetail = res.songs[0]
      })

      // 获取歌词信息
      getLyric(id).then(res => {
        const lyricArr = parseLyric(res.lrc.lyric)
        ctx.lyricArr = lyricArr
      })
    },

    setupAudioContextListenerAction(ctx) {
      // 监听音频时间更新事件
      backgroundAudio.onTimeUpdate(() => {
        const currentTime = backgroundAudio.currentTime * 1000
        ctx.currentTime = currentTime

        let currentIndex = ctx.lyricArr.findIndex(
          lyric => lyric.time >= currentTime
        )
        currentIndex = currentIndex - 1

        if (ctx.currentIndex !== currentIndex) {
          ctx.currentIndex = currentIndex
        }
      })

      // 监听音乐播放失败
      backgroundAudio.onError(() => {
        wx.showToast({
          title: '播放失败, 自动返回上一页',
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      })

      // 监听音乐播放停止事件
      backgroundAudio.onEnded(() => {
        this.dispatch('playToggleMusic')
      })
    },

    // 播放音乐
    musicPlayAction(ctx, isPlay) {
      ctx.isPlay = isPlay
      ctx.isPlay ? backgroundAudio.play() : backgroundAudio.pause()
    },

    // 切换音乐
    playToggleMusic(ctx, isNext = true) {
      // 获取当前播放音乐的索引
      let index = ctx.playIndex

      switch (ctx.playStatus) {
        case 0:
          // 循环播放
          index = isNext ? index + 1 : index - 1
          if (index === -1) index = ctx.playSongs.length - 1
          if (index === ctx.playSongs.length) index = 0
          ctx.playIndex = index
          break
        case 1:
          // 单曲循环
          index = index
          break
        case 2:
          // 随机播放
          index = Math.floor(Math.random() * ctx.playSongs.length)
          break
      }

      this.dispatch('getPlayMusicDataAction', { id: ctx.playSongs[index].id })
    }
  }
})

export { backgroundAudio, playStore }
