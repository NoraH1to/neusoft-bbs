import axios from 'axios'
import { requestPrefix } from '../../config'

// 提醒
import Toast from '../toast'

import cc from 'concent'

axios.defaults.timeout = 5000 // 响应时间
axios.defaults.headers['Content-Type'] = 'application/json' // 配置请求头

// 根据环境切换 host
axios.defaults.baseURL = requestPrefix

axios.defaults.withCredentials = true

// 请求拦截
axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截
axios.interceptors.response.use(
    response => {
        if (response.data.code) {
            if (response.data.code !== 200) {
                Toast.error(response.data.msg)
                if (response.data.code === 403) {
                    // 清空用户信息
                    cc.dispatch('user/resetState')
                }
            } else {
                // 有 msg 配置的提醒成功
                response.config.msg ? Toast.success(response.config.msg + '成功') : undefined
                return response.data
            }
        }
        return Promise.reject(response.data)
    },
    error => {
        Toast.error(error.message)
        return Promise.reject(error)
    }
)

const currentAxios = method => options => {
    return axios({
        method,
        ...options
    })
}

export const GET = currentAxios('GET')
export const POST = currentAxios('POST')
export const PUT = currentAxios('PUT')
export const DELETE = currentAxios('DELETE')
export const UPLOAD = options => {
    return POST({
        headers: {'Content-Type':'multipart/form-data'},
        ...options
    })
}

export default axios
