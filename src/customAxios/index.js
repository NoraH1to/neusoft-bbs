import axios from 'axios'
import config from '../config'

axios.defaults.timeout = 5000; // 响应时间
axios.defaults.headers['Content-Type'] = 'application/json'; // 配置请求头

// 根据环境切换 host
axios.defaults.baseURL = config.requestPrefix

axios.defaults.withCredentials = true

// 请求拦截
axios.interceptors.request.use(
	(confing) => {
		return confing
	},
	(error) => {
		return Promise.reject(error)
	}
)

// 响应拦截
axios.interceptors.response.use(
	(response) => {
		if (response.data.code) {
			if (response.data.code !== 200) {
				// Todo: 提示错误信息
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
	(error) => {
		// Todo: 提示错误信息
		return Promise.reject(error)
	}
)
export default axios
