import url from './url'
import { GET } from '../../customAxios'

// 获取验证码
export const getVerifyCode = {
    request: options => {
        return GET({
            url: url.getVerifyCode,
            ...options
        })
    }
}