import url from './url'
import { POST, DELETE } from '../../customAxios'

// 登录
export const login = (data) => {
    return POST({
        url: url.login,
        params: data
    })
}

// 登出
export const logout = (data) => {
    return DELETE({
        url: url.logout
    })
}
