import React from 'react'
import { withRouter } from 'react-router-dom'
import { useConcent } from 'concent'
import { debounce } from 'lodash'

// 控件
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import InputAdornment from '@material-ui/core/InputAdornment'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import VpnKeyOutlined from '@material-ui/icons/VpnKeyOutlined'

// 表单
import { TextField } from 'formik-material-ui'
import { Formik, Form, Field } from 'formik'
import { object } from 'yup'
import VerifyCodeField from '../VerifyCodeField'

// 接口
import { login } from '../../utils/api/user'

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
})

const setup = (ctx) => {
    // 定义更新用户信息的函数
    const updateUser = (userData) => {
        ctx.dispatch('setState', userData)
    }
    // 当验证码更新了
    const handlerVerifyCodeChange = (data) => {
        console.log('changeVerifyCode', data)
        ctx.set(
            'loginForm.' + verifyCodeAttrMap.verifyCodeRandom.key,
            data[verifyCodeAttrMap.verifyCodeRandom.key]
        )
    }
    // 当发起请求时执行的函数
    const handlerSubmit = debounce(
        (values, actions) => {
            login
                .request({
                    data: { ...values, verifyCodeRandom: ctx.state.loginForm.verifyCodeRandom },
                    msg: '登录',
                })
                .finally(() => {
                    // 请求完毕
                    actions.setSubmitting(false)
                })
                .then((res) => {
                    // 更新用户数据
                    updateUser(res.data)
                    // 跳转到主页
                    ctx.props.history.push('/')
                })
                .catch((err) => {
                    // 根据报错提示用户字段错误
                    if (err.errorData) {
                        Object.keys(err.errorData).map((key) => {
                            actions.setFieldError(key, err.errorData[key].join(', '))
                        })
                    }
                })
        },
        1000,
        { leading: true, trailing: true }
    )
    return {
        handlerSubmit,
        handlerVerifyCodeChange,
    }
}

export default withRouter((props) => {
    // 声明该组件属于 user, loginState 为该组件状态, 使用 setup
    const ctx = useConcent({ module: 'user', setup, state: loginState, props })
    const { state } = ctx
    const { handlerSubmit, handlerVerifyCodeChange } = ctx.settings
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
                            <div className="w-auto flex flex-col justify-around items-stretch">
                                {/* 账号 */}
                                <div className="pb-6">
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
                                <div className="pb-6">
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
                                <div className="pb-6 flex items-stretch justify-center">
                                    <VerifyCodeField
                                        className="w-full flex-grow"
                                        name={verifyCodeAttrMap.verifyCode.key}
                                        variant="outlined"
                                        size="small"
                                        label={verifyCodeAttrMap.verifyCode.value}
                                        onVerifyCodeChange={handlerVerifyCodeChange}
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
