/* 找回密码 */

import React, { useRef } from 'react'
import { useConcent } from 'concent'
import { debounce } from 'lodash'

import {
    Paper,
    Button,
    CircularProgress,
    Typography,
    FormLabel,
    InputAdornment,
} from '@material-ui/core'
import Toast from '@toast/'

// 表单
import { TextField } from 'formik-material-ui'
import { Formik, Form, Field } from 'formik'
import { object } from 'yup'
import VerifyCodeField from '@component/VerifyCodeField'

// 接口
import { resetPassword, emailVerifyCode } from '@api/user'
import { attrMap as userAttrMap } from '@modules/user/template'
import { attrMap as verifyCodeAttrMap } from '@modules/verifyCode/template'

const setup = (ctx) => {
    // 当发起请求时执行的函数
    const handlerSubmit = debounce(
        (values, actions) => {
            resetPassword
                .request({
                    data: values,
                    msg: '修改',
                })
                .finally(() => {
                    // 请求完毕
                    actions.setSubmitting(false)
                })
                .then((res) => {
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
        },
        1000,
        { leading: true, trailing: true }
    )

    // 当验证码更新了
    const handlerVerifyCodeChange = (data) => {
        ctx.setState({
            ...data,
        })
    }

    return {
        handlerSubmit,
        handlerVerifyCodeChange,
    }
}

export default (props) => {
    const ctx = useConcent({
        module: 'user',
        setup,
        state: {
            second: 0,
        },
        props
    })
    const { state } = ctx
    const { handlerSubmit, handlerVerifyCodeChange } = ctx.settings
    const ref = useRef(null)
    const emailRef = useRef(null)
    return (
        <Paper className="flex flex-col items-stretch px-4 py-6" variant="outlined">
            <div className="p-4 md:px-32">
                <Formik
                    initialValues={{
                        "newPassword": '',
                        [userAttrMap.email.key]: '',
                        [userAttrMap.emailVerifyCode.key]: '',
                        [verifyCodeAttrMap.verifyCode.key]: '',
                    }}
                    validationSchema={object().shape(resetPassword.formRules)}
                    onSubmit={handlerSubmit}
                >
                    {({ isSubmitting, setFieldError }) => {
                        return (
                            <Form>
                                <div className="w-auto flex flex-col justify-around items-stretch">
                                    {/* 邮箱地址 */}
                                    <div className="pb-6">
                                        <Field
                                            className="w-full"
                                            name={userAttrMap.email.key}
                                            component={TextField}
                                            variant="outlined"
                                            label={userAttrMap.email.value}
                                            InputProps={{
                                                ref: emailRef,
                                                endAdornment: (
                                                    <InputAdornment className="ml-2">
                                                        <Button
                                                            disabled={state.second > 0}
                                                            onClick={() => {
                                                                // 简单验证参数齐不齐
                                                                if (
                                                                    !ref.current.childNodes[0]
                                                                        .defaultValue
                                                                ) {
                                                                    Toast.error('验证码不能为空')
                                                                    return
                                                                }
                                                                if (
                                                                    !emailRef.current.childNodes[0]
                                                                        .defaultValue
                                                                ) {
                                                                    Toast.error('邮箱不能为空')
                                                                    return
                                                                }

                                                                // 发送验证码
                                                                emailVerifyCode
                                                                    .request({
                                                                        msg: '发送验证码',
                                                                        data: {
                                                                            email:
                                                                                emailRef.current
                                                                                    .childNodes[0]
                                                                                    .defaultValue,
                                                                            verifyCode:
                                                                                ref.current
                                                                                    .childNodes[0]
                                                                                    .defaultValue,
                                                                            verifyCodeRandom:
                                                                                state.verifyCodeRandom,
                                                                        },
                                                                    })
                                                                    .then((res) => {
                                                                        ctx.setState(
                                                                            (oldState) => {
                                                                                return {
                                                                                    second: 60,
                                                                                }
                                                                            },
                                                                            (newState) => {
                                                                                const myTimer = setInterval(
                                                                                    () => {
                                                                                        ctx.setState(
                                                                                            (
                                                                                                oldState
                                                                                            ) => {
                                                                                                if (
                                                                                                    oldState.second ==
                                                                                                    0
                                                                                                ) {
                                                                                                    clearInterval(
                                                                                                        myTimer
                                                                                                    )
                                                                                                    return {
                                                                                                        second:
                                                                                                            oldState.second,
                                                                                                    }
                                                                                                }
                                                                                                return {
                                                                                                    second:
                                                                                                        oldState.second -
                                                                                                        1,
                                                                                                }
                                                                                            }
                                                                                        )
                                                                                    },
                                                                                    1000
                                                                                )
                                                                            }
                                                                        )
                                                                    })
                                                                    .catch((err) => {
                                                                        // 根据报错提示用户字段错误
                                                                        if (err.errorData) {
                                                                            Object.keys(
                                                                                err.errorData
                                                                            ).map((key) => {
                                                                                setFieldError(
                                                                                    key,
                                                                                    err.errorData[
                                                                                        key
                                                                                    ].join(', ')
                                                                                )
                                                                            })
                                                                        }
                                                                    })
                                                            }}
                                                            color="primary"
                                                            variant="outlined"
                                                        >
                                                            发送验证码
                                                            {state.second > 0
                                                                ? ' (' + state.second + ') '
                                                                : ''}
                                                        </Button>
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
                                            ref={ref}
                                        />
                                    </div>
                                    <div className="hidden">
                                        <Field
                                            className="w-full"
                                            name={verifyCodeAttrMap.verifyCodeRandom.key}
                                        />
                                    </div>

                                    {/* 邮箱验证码 */}
                                    <div className="pb-6">
                                        <Field
                                            className="w-full"
                                            name={userAttrMap.emailVerifyCode.key}
                                            component={TextField}
                                            variant="outlined"
                                            label={userAttrMap.emailVerifyCode.value}
                                        />
                                    </div>

                                    {/* 新密码 */}
                                    <div className="pb-6">
                                        <Field
                                            className="w-full"
                                            name={"newPassword"}
                                            component={TextField}
                                            variant="outlined"
                                            label={"新密码"}
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
                                        startIcon={
                                            isSubmitting ? <CircularProgress size={12} /> : ''
                                        }
                                    >
                                        修改
                                    </Button>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </Paper>
    )
}
