import { HYEventStore } from 'hy-event-store'

import { getPersonalizedSong, getPlayList, getTopListDetail } from '../service/api/home'

const songsMap = {0: 'hotSongsMenus', 1: 'recommendMenus'}

// 创建store仓库
const rankingStore = new HYEventStore({
  state: {
    recommendSongs: [], // 推荐歌曲
    hotSongsMenus: [], // 热门歌单
    recommendMenus: [], // 推荐歌单
    topListDetails: [] // 排行榜
  },
  actions: {
    // 获取推荐歌曲
    getPersonalizedSongs(ctx, limit = 6) {
      getPersonalizedSong(limit).then(res => {
        // console.log(res)
        ctx.recommendSongs = res.result
      })
    },
    // 获取热门歌单
    getSongMenus(ctx, type = 0, cat = '全部', limit = 6, offset = 0) {
      getPlayList(limit, offset, cat).then(res => {
        // console.log(res)
        ctx[songsMap[type]] = res.playlists
      })
    },
    // 获取排行榜内容摘要
    getTopListDetails(ctx) {
      getTopListDetail().then(res => {
        // console.log(res)
        ctx.topListDetails = res.list
      })
    }
  }
})

export {
  rankingStore
}