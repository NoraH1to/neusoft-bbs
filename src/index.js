import React from 'react';
import ReactDom from 'react-dom';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import routes from './router/routes/index.jsx'
import {
    BrowserRouter
} from 'react-router-dom';
import {
    renderRoutes
} from "react-router-config";

ReactDom.render(
    <BrowserRouter>
        {renderRoutes(routes)}
    </BrowserRouter>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept()
}
