import axios from 'axios'
// 环境
axios.defaults.baseURL = 'http://127.0.0.1:8081' // 开发环境

// 请求超时时间
// axios.defaults.timeout = 5000

// post请求头
// axios.defaults.headers.get['Content-Type'] = 'application/json'

// // 请求拦截器
// axios.interceptors.request.use(
//   config => {
//     const token = getCookie('_b_token')
//     config.headers['_b_token'] = token
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   }
// )
// // 读cookie
// function getCookie (objName) { // 获取指定名称的cookie的值
//   var arrStr = document.cookie.split('; ')
//   for (var i = 0; i < arrStr.length; i++) {
//     var temp = arrStr[i].split('=')
//     if (temp[0] === objName) return unescape(temp[1]) // 解码
//   }
//   return ''
// }
// 拦截Axios发起的所有请求.
// axios.interceptors.response.use((config) => {
//   return config
// })

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
