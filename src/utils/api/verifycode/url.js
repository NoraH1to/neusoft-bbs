const perfix = '/verifycode'

const url = (value) => {
    return perfix + value
}

export default {
    // 获取验证码
    getVerifyCode: url('/refresh-code')
}
