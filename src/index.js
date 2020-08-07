import React from 'react'
import ReactDom from 'react-dom'

// 全局 toast 注入
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator } from './utils/toast'

// 自定义 material-ui 主题
import { ThemeProvider } from '@material-ui/styles'
import theme from './utils/materialTheme'

// 引入 store 就初始化了 concent
import store from './store'

// axios
import axios from './utils/customAxios'

// mock
import './utils/mockjs/user'

import App from './App'

// 开发环境
if (process.env.NODE_ENV === 'production') {
    window.cc = null
}

// 挂载 axios
React.$axios = axios

ReactDom.render(
    <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={theme}>
            <App />
            <SnackbarUtilsConfigurator />
        </ThemeProvider>
    </SnackbarProvider>,
    document.getElementById('root')
)

// 热重载
if (module.hot) {
    module.hot.accept()
}
