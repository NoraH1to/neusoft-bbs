const perfix = '/user'

const url = (value) => {
    return perfix + value
}

export default {
    // 登入
    login: url('/login'),
    // 登出
    logout: url('/logout'),
    // 注册
    register: url('/register'),
    // 发送邮箱验证码
    emailVerifyCode: url('/send-email-verify-code'),
    // 个人中心信息
    userInfo: url('/user-info'),
}
