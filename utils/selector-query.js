/**
 * 获取dom容器信息，比如高度宽度等
 * 具体参考文档：https://developers.weixin.qq.com/miniprogram/dev/api/wxml/wx.createSelectorQuery.html
 * @param {String} selector css选择器
 * @returns {Promise}
 */
export default function (selector) {
  return new Promise(resolve => {
    //  创建 SelectorQuery 对象实例
    const query = wx.createSelectorQuery()
    // 获取 img 元素
    query.select(selector).boundingClientRect()
    query.exec(res => {
      resolve(res)
    })
  })
}
