import url from './url'
import { POST, GET } from '../../customAxios'

import * as Yup from 'yup'

import { attrMap } from '../../../store/modules/user/template'
import { attrMap as verifyCodeAttrMap } from '../../../store/modules/verifyCode/template'

// 登录
export const login = {
    request: (options) => {
        return POST({
            url: url.login,
            ...options,
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
        // 验证码
        [verifyCodeAttrMap.verifyCode.key]: Yup.string().required('验证码不能为空'),
        // 随机字符串
        [verifyCodeAttrMap.verifyCodeRandom.key]: Yup.string().required(
            'must has verifyCodeRandom string'
        ),
    },
}

// 登出
export const logout = {
    request: (options) => {
        return POST({
            url: url.logout,
            ...options,
        })
    },
}

// 注册
export const register = {
    request: (options) => {
        return POST({
            url: url.register,
            ...options,
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
        [attrMap.nickname.key]: Yup.string()
            .required('昵称不能为空')
            .min(1, '1 - 30 字符')
            .max(30, '1 - 30 字符'),
        // 邮箱
        [attrMap.email.key]: Yup.string().required('邮箱不能为空').email('邮箱格式错误'),
        // 验证码
        [verifyCodeAttrMap.verifyCode.key]: Yup.string().required('验证码不能为空'),
        // 随机字符串
        [verifyCodeAttrMap.verifyCodeRandom.key]: Yup.string().required(
            'must has verifyCodeRandom string'
        ),
    },
}

// 发送邮箱验证码
export const emailVerifyCode = {
    request: (options) => {
        return POST({
            url: url.emailVerifyCode,
            ...options,
        })
    },
    formRules: {
        // 邮箱
        [attrMap.email.key]: Yup.string().required('邮箱不能为空').email('邮箱格式错误'),
        [verifyCodeAttrMap.verifyCode.key]: Yup.string().required('验证码不能为空'),
        // 随机字符串
        [verifyCodeAttrMap.verifyCodeRandom.key]: Yup.string().required(
            'must has verifyCodeRandom string'
        ),
    },
}

// 个人中心信息
export const userInfo = {
    request: (options) => {
        return GET({
            url: url.userInfo,
            ...options,
        })
    },
}

// 用户指定板块的权限
export const boardPermission = {
    request: (options) => {
        return GET({
            url: url.boardPermission,
            ...options,
        })
    },
}

// 用户修改个人信息
export const updateInfo = {
    request: (options) => {
        return POST({
            url: url.updateInfo,
            ...options,
        })
    },
    formRules: {
        // 昵称
        [attrMap.nickname.key]: Yup.string().required('昵称不能为空').max(30, '1 - 30 字符'),
        // 性别
        [attrMap.sex.key]: Yup.number().required('性别不能为空'),
        // 签名
        [attrMap.signature.key]: Yup.string().max(500, '0 - 500 字符'),
    },
}

// 用户修改邮箱
export const updateEmail = {
    request: (options) => {
        return POST({
            url: url.updateEmail,
            ...options,
        })
    },
    formRules: {
        // 密码
        [attrMap.password.key]: Yup.string()
            .required('密码不能为空')
            .min(6, '6 - 20 字符')
            .max(20, '6 - 20 字符'),
        // 邮箱
        [attrMap.email.key]: Yup.string().required('邮箱不能为空').email('邮箱格式错误'),
        // 验证码
        [verifyCodeAttrMap.verifyCode.key]: Yup.string().required('验证码不能为空'),
        // 新邮箱验证码
        [attrMap.emailVerifyCode.key]: Yup.string().required('邮箱验证码不能为空'),
    },
}

// 用户修改头像
export const updateAvatar = {
    request: (options) => {
        return POST({
            url: url.updateAvatar,
            ...options,
        })
    },
}

// 用户修改密码
export const updatePassword = {
    request: (options) => {
        return POST({
            url: url.updatePassword,
            ...options,
        })
    },
    formRules: {
        // 旧密码
        oldPassword: Yup.string()
            .required('旧密码不能为空')
            .min(6, '6 - 20 字符')
            .max(20, '6 - 20 字符'),
        // 新密码
        newPassword: Yup.string()
            .required('新密码不能为空')
            .min(6, '6 - 20 字符')
            .max(20, '6 - 20 字符'),
        // 验证码
        [verifyCodeAttrMap.verifyCode.key]: Yup.string().required('验证码不能为空'),
        // 邮箱验证码
        [attrMap.emailVerifyCode.key]: Yup.string().required('邮箱验证码不能为空'),
    },
}

// 用户激活邮箱
export const verifyEmail = {
    request: (options) => {
        return POST({
            url: url.verifyEmail,
            ...options,
        })
    },
    formRules: {
        // 验证码
        [verifyCodeAttrMap.verifyCode.key]: Yup.string().required('验证码不能为空'),
        // 邮箱验证码
        [attrMap.emailVerifyCode.key]: Yup.string().required('邮箱验证码不能为空'),
    },
}

// 找回密码
export const resetPassword = {
    request: (options) => {
        return POST({
            url: url.resetPassword,
            ...options,
        })
    },
    formRules: {
        // 邮箱
        [attrMap.email.key]: Yup.string().required('邮箱不能为空').email('邮箱格式错误'),
        // 新密码
        newPassword: Yup.string()
            .required('新密码不能为空')
            .min(6, '6 - 20 字符')
            .max(20, '6 - 20 字符'),
        // 验证码
        [verifyCodeAttrMap.verifyCode.key]: Yup.string().required('验证码不能为空'),
        // 邮箱验证码
        [attrMap.emailVerifyCode.key]: Yup.string().required('邮箱验证码不能为空'),
    },
}
