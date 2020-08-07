import React from 'react'
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { TextField } from 'formik-material-ui'
import { Formik, Form, Field } from 'formik'
import { login } from '../../utils/api/user'
import { useConcent } from 'concent'
import CircularProgress from '@material-ui/core/CircularProgress'
import { debounce } from 'lodash'
import { object } from 'yup'

const { log } = console

// 组件局部状态
const loginState = () => ({ form: { account: '', password: '' } })

const setup = ctx => {
    const updateUser = userData => {
        ctx.dispatch('setState', userData)
    }
    // 当发起请求时
    const handlerSubmit = debounce(
        (values, actions) => {
            login
                .request({ data: values, msg: '登录' })
                .then(res => {
                    // 更新用户数据
                    updateUser(res.data)
                    // 跳转到主页
                    ctx.props.history.replace('/')
                })
                .catch(err => {
                    // 根据报错提示用户字段错误
                    if (err.errorData) {
                        Object.keys(err.errorData).map(key => {
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
        handlerSubmit
    }
}

export default withRouter(function(props) {
    const ctx = useConcent({ module: 'user', setup, state: loginState, props })
    const { state } = ctx
    const { handlerSubmit } = ctx.settings
    return (
        <>
            <Formik
                initialValues={state.form}
                validationSchema={object().shape(login.formRules)}
                onSubmit={handlerSubmit}
            >
                {({ isSubmitting }) => {
                    return (
                        <Form>
                            <div
                                className="w-auto px-8 py-16 flex flex-col justify-around items-stretch"
                                spacing={4}
                            >
                                <Typography
                                    variant="h2"
                                    className="pb-12"
                                    style={{ textShadow: '0 4px 6px rgb(66, 66, 66)' }}
                                >
                                    登入
                                </Typography>
                                {/* 账号 */}
                                <div className="form-item">
                                    <Field
                                        className="w-full"
                                        name="username"
                                        component={TextField}
                                        variant="outlined"
                                        size="medium"
                                        label="账号"
                                    />
                                </div>
                                {/* 密码 */}
                                <div className="form-item">
                                    <Field
                                        className="w-full"
                                        type="password"
                                        name="password"
                                        component={TextField}
                                        variant="outlined"
                                        size="medium"
                                        label="密码"
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
