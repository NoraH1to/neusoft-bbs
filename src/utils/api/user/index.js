import url from './url'
import { POST, DELETE } from '../../customAxios'
import * as Yup from 'yup'
import { attrMap } from '../../../store/modules/user/template'

// 登录
export const login = {
    request: options => {
        return POST({
            url: url.login,
            ...options
        })
    },
    formRules: {
        // 账号
        [attrMap.username.key]: Yup.string()
            .required('账号不能为空')
            .min(1, '1 - 30 字符')
            .max(30, '1 - 30 字符'),
        // 密码
        [attrMap.password.key]: Yup.string()
            .required('密码不能为空')
            .min(6, '6 - 20 字符')
            .max(20, '6 - 20 字符')
    }
}

// 登出
export const logout = {
    request: () => {
        return DELETE({
            url: url.logout
        })
    }
}

// 注册
export const register = {
    request: options => {
        return POST({
            url: url.register,
            ...options
        })
    },
    formRules: {
        // 账号
        [attrMap.username.key]: Yup.string()
            .required('账号不能为空')
            .min(1, '1 - 30 字符')
            .max(30, '1 - 30 字符'),
        // 密码
        [attrMap.password.key]: Yup.string()
            .required('密码不能为空')
            .min(6, '6 - 20 字符')
            .max(20, '6 - 20 字符'),
        // 昵称
        [attrMap.username.key]: Yup.string()
            .required('昵称不能为空')
            .min(1, '1 - 30 字符')
            .max(30, '1 - 30 字符'),
        // 邮箱
        [attrMap.email.key]: Yup.string()
            .required('邮箱不能为空')
            .email('邮箱格式错误'),
        // 验证码
        [attrMap.verifyCode.key]: Yup.string().required('验证码不能为空')
    }
}

// 发送邮箱验证码
export const emailVerifyCode = {
    request: options => {
        return POST({
            url: url.emailVerifyCode,
            options
        })
    },
    formRules: {
        [attrMap.email.key]: Yup.string()
            .required('邮箱不能为空')
            .email('邮箱格式错误'),
        [attrMap.verifyCode.key]: Yup.string().required('验证码不能为空')
    }
}
