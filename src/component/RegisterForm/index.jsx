import React from 'react'
import { withRouter } from 'react-router-dom'
import { useConcent } from 'concent'
import { debounce } from 'lodash'
import Toast from '../../utils/toast'

// 表单
import { TextField } from 'formik-material-ui'
import { Formik, Form, Field } from 'formik'
import { object } from 'yup'

// 接口
import { register, emailVerifyCode } from '../../utils/api/user'
import { verifyCode } from '../../utils/api/verifycode'

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
}

const setup = (ctx) => {
    // 当发起请求时执行的函数
    const handlerSubmit = debounce(
        (values, actions) => {
            register
                .request({ data: values, msg: '注册' })
                .then((res) => {
                    // 跳转到登录页面
                    ctx.props.history.replace('/login')
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
    }
}

export default (props) => {
    // 声明该组件属于 user, loginState 为该组件状态, 使用 setup
    const ctx = useConcent({ setup, state: registerState, props })
    const { state } = ctx
    const { handlerSubmit } = ctx.settings
    return (
        <>
            <Formik
                initialValues={state.registerForm}
                validationSchema={object().shape(register.formRules)}
                onSubmit={handlerSubmit}
            >
                {({ isSubmitting }) => {
                    return <Form>{/* TODO: 注册表单 */}</Form>
                }}
            </Formik>
        </>
    )
}
