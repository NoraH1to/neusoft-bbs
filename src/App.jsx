import { hot } from 'react-hot-loader/root'
import { setConfig } from 'react-hot-loader'
import React from 'react'
import './common/tailwindGlobal.css'
setConfig({
    trackTailUpdates: false, // 添加这个配置才能热更新 lazy 组件
    logLevel: 'debug',
    hotHooks: true,
})
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routesConfig from './router/routes'
import AuthRoute from './router/AuthRoute'

function App() {
    return (
        <Router>
            <Switch>
                {routesConfig.map((route) => (
                    <AuthRoute key={route.path} {...route} />
                ))}
            </Switch>
        </Router>
    )
}

export default hot(App)
