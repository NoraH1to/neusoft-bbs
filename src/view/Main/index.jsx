/* 主页 */

import React from 'react'

import Header from '@component/Header'

import AuthRoute from '../../router/AuthRoute'

export default (props) => {
    return (
        <div>
            {/* header */}
            <Header />
            {/* 渲染子路由 */}
            <div className="container m-auto">
                {props.routes.map((route) => {
                    return (
                        <AuthRoute
                            {...route}
                            key={route.path}
                            render={(props) => <route.component {...props} routes={route.routes} />}
                        />
                    )
                })}
            </div>
        </div>
    )
}
