import { useSnackbar } from 'notistack'
import React from 'react'
const InnerSnackbarUtilsConfigurator = (props) => {
    props.setUseSnackbarRef(useSnackbar())
    return null
}
let useSnackbarRef
const setUseSnackbarRef = (useSnackbarRefProp) => {
    useSnackbarRef = useSnackbarRefProp
}
export const SnackbarUtilsConfigurator = () => {
    return <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
}
export default {
    success(msg, options) {
        this.toast(msg, 'success', options)
    },
    warning(msg, options) {
        this.toast(msg, 'warning', options)
    },
    info(msg, options) {
        this.toast(msg, 'info', options)
    },
    error(msg, options) {
        this.toast(msg, 'error', options)
    },
    toast(msg, variant = 'default', options) {
        useSnackbarRef.enqueueSnackbar(msg, {
            // 类型
            variant,
            // 位置
            anchorOrigin: {
                horizontal: 'center',
                vertical: 'top',
            },
            // 自动隐藏时间
            autoHideDuration: 2000,
            ...options,
        })
    },
}
