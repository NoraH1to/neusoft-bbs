import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';
import React, { Suspense } from 'react';
import "./common/tailwindGlobal.css"
const Index = React.lazy(() => import('./view/Index'))
setConfig({
    trackTailUpdates: false,  // 添加这个配置才能热更新 lazy 组件
    logLevel: 'debug',
    hotHooks: true,
});

function App() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Index />
            </Suspense>
        </div>
    )
}

export default hot(App);
