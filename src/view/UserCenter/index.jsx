/* 用户中心 */

import React, { useState } from 'react'
import { useConcent } from 'concent'
import AuthRoute from '../../router/AuthRoute'

// 组件
import InfoCard from './Info'
import RouteTab from './Tabs'
import { Paper } from '@material-ui/core'

// 接口
import { userInfo } from '@api/user'

const setup = (ctx) => {
    const { props } = ctx
    ctx.computed({
        // 是否是自己的空间
        isSelf({ id }) {
            return id == props.match.params.id
        },
    })

    // 请求用户个人中心数据
    const requestUserInfo = () => {
        userInfo
            .request({
                params: {
                    userId: props.match.params.id,
                },
            })
            .then((res) => {
                ctx.setState(res.data)
            })
            .catch((err) => {
                console.log('requestUserInfo fail', err)
            })
    }

    // 进来先请求一次
    ctx.effect(() => {
        requestUserInfo()
    }, [])

    return {
        requestUserInfo,
    }
}

export default (props) => {
    const ctx = useConcent({ module: 'user', setup, props })
    return (
        <div className="flex flex-col">
            <div>
                <Paper>
                    <InfoCard ctx={ctx} />
                </Paper>
            </div>
            <div className="flex sm:flex-row flex-col sm:items-start items-stretch mt-4">
                <div className="flex-shrink sm:mr-4 mr-0">
                    <Paper variant="outlined">
                        <RouteTab id={props.match.params.id}/>
                    </Paper>
                </div>
                <div className="flex-grow overflow-hidden">
                    {props.routes.map((route) => {
                        return (
                            <AuthRoute
                                {...route}
                                key={route.path}
                                params={props.match.params}
                                render={(props) => (
                                    <route.component {...props} routes={route.routes} />
                                )}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
