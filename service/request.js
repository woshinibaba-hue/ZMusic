const BAST_URL = 'https://netease-cloud-music-api-weld-ten.vercel.app/'

const LOGIN_BASE_URL = 'http://localhost:3000'

class Request {
  constructor(baseurl) {
    this.baseUrl = baseurl
  }

  request(url, data, method = 'GET', header = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl + url,
        data,
        method,
        header,
        success(res) {
          resolve(res.data)
        },
        fail: reject
      })
    })
  }

  get(url, params, header) {
    return this.request(url, params, 'get', header)
  }

  post(url, params, header) {
    return this.request(url, params, 'post', header)
  }
}

const request = new Request(BAST_URL)
const loginRequest = new Request(LOGIN_BASE_URL)

export default request

export { loginRequest }
