import React from 'react'
import { withRouter } from 'react-router-dom'
import { useConcent } from 'concent'
import { debounce } from 'lodash'

// 控件
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import InputAdornment from '@material-ui/core/InputAdornment'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import VpnKeyOutlined from '@material-ui/icons/VpnKeyOutlined'
import MoodOutlinedIcon from '@material-ui/icons/MoodOutlined'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

// 表单
import { TextField } from 'formik-material-ui'
import { Formik, Form, Field } from 'formik'
import { object } from 'yup'
import VerifyCodeField from '../VerifyCodeField'

// 接口
import { register } from '../../utils/api/user'

// 参数映射
import { attrMap as verifyCodeAttrMap } from '../../store/modules/verifyCode/template'
import { attrMap as userAttrMap } from '../../store/modules/user/template'

// 组件局部状态
const registerState = {
    // 注册表单
    registerForm: {
        [userAttrMap.username.key]: '',
        [userAttrMap.password.key]: '',
        [userAttrMap.nickname.key]: '',
        [userAttrMap.email.key]: '',
        [verifyCodeAttrMap.verifyCode.key]: '',
        [verifyCodeAttrMap.verifyCodeRandom.key]: '',
    },
    // 是否显示密码
    showPassword: false,
}

const setup = (ctx) => {
    // 当验证码更新了
    const handlerVerifyCodeChange = (data) => {
        ctx.set(
            'registerForm.' + verifyCodeAttrMap.verifyCodeRandom.key,
            data[verifyCodeAttrMap.verifyCodeRandom.key]
        )
    }
    // 当发起请求时执行的函数
    const handlerSubmit = debounce(
        (values, actions) => {
            register
                .request({ data: values, msg: '注册' })
                .then((res) => {
                    // 跳转到登录页面
                    ctx.props.history.push('/login')
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
        handlerVerifyCodeChange,
    }
}

const style = {
    iconStyle: { color: 'rgb(60, 60, 60)' },
}

export default withRouter((props) => {
    // 声明该组件属于 user, loginState 为该组件状态, 使用 setup
    const ctx = useConcent({ setup, state: registerState, props })
    const { state } = ctx
    const { handlerSubmit, handlerVerifyCodeChange } = ctx.settings
    return (
        <>
            <Formik
                initialValues={state.registerForm}
                validationSchema={object().shape(register.formRules)}
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
                                                        style={style.iconStyle}
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
                                        type={state.showPassword ? '' : 'password'}
                                        name={userAttrMap.password.key}
                                        component={TextField}
                                        variant="outlined"
                                        label={userAttrMap.password.value}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment className="mr-2">
                                                    <VpnKeyOutlined
                                                        fontSize="small"
                                                        style={style.iconStyle}
                                                    />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment
                                                    className="ml-2 cursor-pointer"
                                                    onClick={() =>
                                                        ctx.set('showPassword', !state.showPassword)
                                                    }
                                                    onMouseDown={(e) => e.preventDefault()}
                                                >
                                                    {state.showPassword ? (
                                                        <Visibility fontSize="small" />
                                                    ) : (
                                                        <VisibilityOff fontSize="small" />
                                                    )}
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                {/* 昵称 */}
                                <div className="pb-6">
                                    <Field
                                        className="w-full"
                                        name={userAttrMap.nickname.key}
                                        component={TextField}
                                        variant="outlined"
                                        label={userAttrMap.nickname.value}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment className="mr-2">
                                                    <MoodOutlinedIcon
                                                        fontSize="small"
                                                        style={style.iconStyle}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                {/* 邮箱 */}
                                <div className="pb-6">
                                    <Field
                                        className="w-full"
                                        name={userAttrMap.email.key}
                                        component={TextField}
                                        variant="outlined"
                                        label={userAttrMap.email.value}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment className="mr-2">
                                                    <EmailOutlinedIcon
                                                        fontSize="small"
                                                        style={style.iconStyle}
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
                                    注册
                                </Button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
})
