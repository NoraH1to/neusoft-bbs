import url from './url'
import { GET } from '../../customAxios'

// 获取验证码
export const verifyCode = {
    request: options => {
        return GET({
            url: url.getVerifyCode,
            ...options
        })
    }
}