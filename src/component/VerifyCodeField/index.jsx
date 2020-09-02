import React, { useState, useEffect, forwardRef } from 'react'

// 接口
import { verifyCode } from '../../utils/api/verifycode'

// 参数映射
import { attrMap as verifyCodeAttrMap } from '../../store/modules/verifyCode/template'

// 表单控件
import { Field } from 'formik'
import { TextField } from 'formik-material-ui'
import InputAdornment from '@material-ui/core/InputAdornment'

export default forwardRef((props, ref) => {
    const [state, setState] = useState({
        [verifyCodeAttrMap.url.key]: '',
        [verifyCodeAttrMap.verifyCodeRandom.key]: '',
    })
    const { onVerifyCodeChange, ...otherProps } = props
    // 请求验证码
    function requestVerifyCode() {
        verifyCode
            .request()
            .then((res) => {
                setState(res.data)
            })
            .catch((err) => {
                console.log('requestVerifyCode fail', err)
            })
    }
    // 初始化完成请求一次
    useEffect(() => {
        requestVerifyCode()
    }, [])
    // 更新执行外部回调
    useEffect(() => {
        if (onVerifyCodeChange) {
            onVerifyCodeChange(state)
        }
    }, [state[verifyCodeAttrMap.verifyCodeRandom.key]])
    return (
        <Field
            {...otherProps}
            component={TextField}
            InputProps={{
                endAdornment: (
                    <InputAdornment>
                        <div className="w-16 h-6 text-right" onClick={() => requestVerifyCode()}>
                            <img
                                className="h-full w-auto rounded"
                                src={state[verifyCodeAttrMap.url.key]}
                            ></img>
                        </div>
                    </InputAdornment>
                ),
                ref: ref
            }}
        />
    )
})
