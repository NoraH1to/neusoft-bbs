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
    // 用户指定板块的权限
    boardPermission: url('/board-permission'),
    // 用户修改个人资料
    updateInfo: url('/update-info'),
    // 用户修改邮箱
    updateEmail: url('/update-email'),
    // 用户修改头像
    updateAvatar: url('/update-avatar'),
    // 用户修改密码
    updatePassword: url('/update-password'),
    // 用户激活邮箱
    verifyEmail: url('/verify-email'),
    // 找回密码
    resetPassword: url('/reset-password'),
}
