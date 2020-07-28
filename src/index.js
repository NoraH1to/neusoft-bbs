import React from 'react';
import ReactDom from 'react-dom';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// 引入 store 就初始化了 concent
import store from './store';
import routes from './router/routes';
import {
    BrowserRouter
} from 'react-router-dom';
import {
    renderRoutes
} from "react-router-config";
import axios from './utils/customAxios';

// 开发环境
if (process.env.NODE_ENV === 'production') {
    window.cc = null
}

// 挂载 axios
React.$axios = axios;

ReactDom.render(
    // 路由
    <BrowserRouter>
        {renderRoutes(routes)}
    </BrowserRouter>,
    document.getElementById('root')
);

// 热重载
if (module.hot) {
    module.hot.accept();
}
