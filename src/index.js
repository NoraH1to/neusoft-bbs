import React from 'react';
import ReactDom from 'react-dom';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import routes from './router/routes'
import {
    BrowserRouter
} from 'react-router-dom';
import {
    renderRoutes
} from "react-router-config";
import axios from './customAxios'

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
