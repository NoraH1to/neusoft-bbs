import { hot } from 'react-hot-loader/root';
import React from 'react';
import Editor from './component/Editor';
// 引入 store 就初始化了 concent
import store from './store';

function App() {
    return (
        <div>
            <Editor />
        </div>
    )
}

export default hot(App);
