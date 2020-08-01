import axios from 'axios'
import config from '../../config'

// 提醒
// import { useSnackbar } from 'notistack'
// const { enqueueSnackbar } = useSnackbar()
import Toast from '../toast'

axios.defaults.timeout = 5000 // 响应时间
axios.defaults.headers['Content-Type'] = 'application/json' // 配置请求头

// 根据环境切换 host
axios.defaults.baseURL = config.requestPrefix

axios.defaults.withCredentials = true

// 请求拦截
axios.interceptors.request.use(
    confing => {
        return confing
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
                // Todo: 提示错误信息
                // enqueueSnackbar(response.data.msg, {
                //     variant: 'error'
                // })
                Toast.error(response.data.msg)
                if (response.data.code === 403) {
                    // 清空用户信息，对应长时间挂机 session 过期的清空
                    // store.commit('user/deleteUserData')
                    // router.replace({
                    // 	name: 'login'
                    // })
                }
                return Promise.reject(response)
            }
        }
        return response
    },
    error => {
        // Todo: 提示错误信息
        // enqueueSnackbar(error, {
        //     variant: 'error'
        // })
        Toast.error(error)
        return Promise.reject(error)
    }
)

const currentAxios = method => options =>
    axios({
        method,
        ...options
    })

export const GET = currentAxios('GET')
export const POST = currentAxios('POST')
export const PUT = currentAxios('PUT')
export const DELETE = currentAxios('DELETE')

export default axios
