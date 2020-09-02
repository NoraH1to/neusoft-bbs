import React from 'react'
import { useConcent } from 'concent'
import { debounce } from 'lodash'

import {
    Avatar,
    Paper,
    Button,
    FormControlLabel,
    Radio,
    CircularProgress,
    Typography,
    FormLabel,
} from '@material-ui/core'

// 表单
import { TextField, RadioGroup } from 'formik-material-ui'
import { Formik, Form, Field } from 'formik'
import { object } from 'yup'

// 接口
import { updateInfo, updateAvatar } from '@api/user'
import { attrMap as userAttrMap } from '@modules/user/template'

const setup = (ctx) => {
    // 当发起请求时执行的函数
    const handlerSubmit = debounce(
        (values, actions) => {
            updateInfo
                .request({
                    data: values,
                    msg: '修改',
                })
                .finally(() => {
                    // 请求完毕
                    actions.setSubmitting(false)
                })
                .then((res) => {})
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

    // 上传头像
    const requestUpdateAvatar = (e) => {
        let data = new FormData()
        data.append('file', e.target.files[0])
        updateAvatar
            .request({
                data,
                msg: '修改头像',
            })
            .then((res) => {
                setState({ avatarPath: res.data.avatarPath })
            })
            .catch((err) => {
                console.log('updateAvatar fail', err)
            })
    }

    ctx.effect(() => {
        ctx.setState({
            editInfoForm: {
                [userAttrMap.nickname.key]: ctx.state.nickname,
                [userAttrMap.sex.key]: ctx.state.sex,
                [userAttrMap.signature.key]: ctx.state.signature,
            },
        })
    }, [])

    return {
        handlerSubmit,
        requestUpdateAvatar,
    }
}

export default (props) => {
    const ctx = useConcent({
        module: 'user',
        setup,
    })
    const { state } = ctx
    const { handlerSubmit, requestUpdateAvatar } = ctx.settings
    return (
        <Paper className="flex flex-col items-stretch px-4 py-6" variant="outlined">
            <div className="flex flex-col items-center justify-center my-6">
                <div onClick className="relative">
                    <input
                        accept="image/*"
                        className="hidden"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={(e) => requestUpdateAvatar(e)}
                    />
                    <label htmlFor="contained-button-file">
                        <Avatar
                            className="cursor-pointer hover:bg-blue-300"
                            alt={state.nickname}
                            src={state.avatarPath}
                            style={{ height: '8rem', width: '8rem' }}
                        ></Avatar>
                        <div
                            className="inline float-left absolute text-gray-600 cursor-pointer"
                            style={{ bottom: '25px', right: '31px' }}
                        >
                            修改头像
                        </div>
                    </label>
                </div>
                {/* 格式提示 */}
                <Typography className="pt-4 break-all" variant="subtitle2" color="textSecondary">支持jpg/png格式，分辨率最低100x100，最高500x500，宽度1:1</Typography>
            </div>
            <div className="p-4 md:px-32">
                <Formik
                    initialValues={{
                        [userAttrMap.nickname.key]: ctx.state.nickname,
                        [userAttrMap.sex.key]: ctx.state.sex + '',
                        [userAttrMap.signature.key]: ctx.state.signature,
                    }}
                    validationSchema={object().shape(updateInfo.formRules)}
                    onSubmit={handlerSubmit}
                >
                    {({ isSubmitting }) => {
                        return (
                            <Form>
                                <div className="w-auto flex flex-col justify-around items-stretch">
                                    {/* 昵称 */}
                                    <div className="pb-6">
                                        <Field
                                            className="w-full"
                                            name={userAttrMap.nickname.key}
                                            component={TextField}
                                            variant="outlined"
                                            label={userAttrMap.nickname.value}
                                        />
                                    </div>

                                    {/* 个人签名 */}
                                    <div className="pb-6">
                                        <Field
                                            className="w-full"
                                            multiline={true}
                                            name={userAttrMap.signature.key}
                                            component={TextField}
                                            rowsMax={8}
                                            variant="outlined"
                                            label={userAttrMap.signature.value}
                                        />
                                    </div>

                                    {/* 性别 */}
                                    <div
                                        className="pb-3"
                                        // className="mb-6 px-3 pt-3 border-0 border-b border-solid border-gray-600 rounded-tr-md rounded-tl-md"
                                        // style={{ backgroundColor: 'rgba(0, 0, 0, 0.09)' }}
                                    >
                                        <FormLabel>性别</FormLabel>
                                        <Field
                                            className="w-full"
                                            name={userAttrMap.sex.key}
                                            row={true}
                                            component={RadioGroup}
                                        >
                                            <FormControlLabel
                                                value={'0'}
                                                control={
                                                    <Radio
                                                        color="primary"
                                                        disabled={isSubmitting}
                                                    />
                                                }
                                                label="男"
                                                disabled={isSubmitting}
                                            />
                                            <FormControlLabel
                                                value={'1'}
                                                control={
                                                    <Radio
                                                        color="primary"
                                                        disabled={isSubmitting}
                                                    />
                                                }
                                                label="女"
                                                disabled={isSubmitting}
                                            />
                                            <FormControlLabel
                                                value={'2'}
                                                control={
                                                    <Radio
                                                        color="primary"
                                                        disabled={isSubmitting}
                                                    />
                                                }
                                                label="保密"
                                                disabled={isSubmitting}
                                            />
                                        </Field>
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
                                        保存
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
