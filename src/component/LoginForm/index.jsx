import React from 'react'
import { withRouter } from 'react-router-dom'
import { useConcent } from 'concent'
import { debounce } from 'lodash'
import Toast from '../../utils/toast'

// 控件
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import InputAdornment from '@material-ui/core/InputAdornment'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import VpnKeyOutlined from '@material-ui/icons/VpnKeyOutlined'

// 表单
import { TextField } from 'formik-material-ui'
import { Formik, Form, Field } from 'formik'
import { object } from 'yup'

// 接口
import { login } from '../../utils/api/user'
import { verifyCode } from '../../utils/api/verifycode'

// 参数映射
import { attrMap as verifyCodeAttrMap } from '../../store/modules/verifyCode/template'
import { attrMap as userAttrMap } from '../../store/modules/user/template'

const { log } = console

// 组件局部状态
const loginState = () => ({
    // 用户输入表单要发送的内容
    loginForm: {
        [userAttrMap.username.key]: '',
        [userAttrMap.password.key]: '',
        [verifyCodeAttrMap.verifyCode.key]: '',
        [verifyCodeAttrMap.verifyCodeRandom.key]: '',
    },
    // 验证码图片地址
    [verifyCodeAttrMap.url.key]: '',
})

const setup = (ctx) => {
    // 获取验证码
    const requestVerifyCode = () => {
        verifyCode
            .request()
            .then((res) => {
                ctx.set(verifyCodeAttrMap.url.key, res.data.url)
                ctx.set(
                    'loginForm.' + verifyCodeAttrMap.verifyCodeRandom.key,
                    res.data.verifyCodeRandom
                )
            })
            .catch((err) => {
                log('requestVerifyCode fail', err)
            })
    }
    requestVerifyCode()
    // 定义更新用户信息的函数
    const updateUser = (userData) => {
        ctx.dispatch('setState', userData)
    }
    // 当发起请求时执行的函数
    const handlerSubmit = debounce(
        (values, actions) => {
            login
                .request({ data: values, msg: '登录' })
                .then((res) => {
                    // 更新用户数据
                    updateUser(res.data)
                    // 跳转到主页
                    ctx.props.history.replace('/')
                })
                .catch((err) => {
                    // 根据报错提示用户字段错误
                    if (err.errorData) {
                        Object.keys(err.errorData).map((key) => {
                            actions.setFieldError(key, err.errorData[key].join(', '))
                        })
                    }
                })
                .finally(() => {
                    // 请求完毕
                    actions.setSubmitting(false)
                })
        },
        1000,
        { leading: true, trailing: true }
    )
    return {
        handlerSubmit,
        requestVerifyCode,
    }
}

export default withRouter(function (props) {
    // 声明该组件属于 user, loginState 为该组件状态, 使用 setup
    const ctx = useConcent({ module: 'user', setup, state: loginState, props })
    const { state } = ctx
    const { handlerSubmit, requestVerifyCode } = ctx.settings
    return (
        <>
            <Formik
                initialValues={state.loginForm}
                validationSchema={object().shape(login.formRules)}
                onSubmit={handlerSubmit}
            >
                {({ isSubmitting }) => {
                    return (
                        <Form>
                            <div
                                className="w-auto flex flex-col justify-around items-stretch"
                                spacing={4}
                            >
                                {/* <Typography
                                    variant="h2"
                                    className="pb-12"
                                    style={{ textShadow: '0 4px 6px rgb(66, 66, 66)' }}
                                >
                                    登入
                                </Typography> */}
                                {/* 账号 */}
                                <div className="form-item">
                                    <Field
                                        className="w-full"
                                        name={userAttrMap.username.key}
                                        component={TextField}
                                        variant="outlined"
                                        label={userAttrMap.username.value}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment className="mr-2">
                                                    <AccountCircleOutlinedIcon
                                                        fontSize="small"
                                                        style={{ color: 'rgb(60, 60, 60)' }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                {/* 密码 */}
                                <div className="form-item">
                                    <Field
                                        className="w-full"
                                        type="password"
                                        name={userAttrMap.password.key}
                                        component={TextField}
                                        variant="outlined"
                                        label={userAttrMap.password.value}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment className="mr-2">
                                                    <VpnKeyOutlined
                                                        fontSize="small"
                                                        style={{ color: 'rgb(60, 60, 60)' }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                {/* 验证码 */}
                                <div className="form-item flex items-stretch justify-center">
                                    <Field
                                        className="w-full flex-grow"
                                        name={verifyCodeAttrMap.verifyCode.key}
                                        component={TextField}
                                        variant="outlined"
                                        size="small"
                                        label={verifyCodeAttrMap.verifyCode.value}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment>
                                                    <div
                                                        className="w-16 h-6 text-right"
                                                        onClick={() => requestVerifyCode()}
                                                    >
                                                        <img
                                                            className="h-full w-auto rounded"
                                                            src={state[verifyCodeAttrMap.url.key]}
                                                        ></img>
                                                    </div>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="hidden">
                                    <Field
                                        className="w-full"
                                        name={verifyCodeAttrMap.verifyCodeRandom.key}
                                    />
                                </div>
                                {/* 提交请求 */}
                                <Button
                                    className="w-full"
                                    disabled={isSubmitting}
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                    startIcon={isSubmitting ? <CircularProgress size={12} /> : ''}
                                >
                                    登录
                                </Button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
})
