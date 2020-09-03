/* 用户中心 */

import React, { useState } from 'react'
import { useConcent } from 'concent'
import AuthRoute from '../../router/AuthRoute'

// 组件
import InfoCard from './Info/InfoCard'
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
                ctx.setState((oldState) => {
                    // 本人信息直接覆盖，它人另存
                    if (oldState.id == res.data.id) {
                        return res.data
                    } else {
                        return { otherUserInfo: res.data }
                    }
                }, (newState) => {
                    console.log(newState)
                })
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
        id: props.match.params.id,
    }
}

export default (props) => {
    const ctx = useConcent({ module: 'user', setup, props })
    const { requestUserInfo, id } = ctx.settings
    return (
        <div className="flex flex-col">
            <div>
                <Paper>
                    <InfoCard ctx={ctx} outId={id}/>
                </Paper>
            </div>
            <div className="flex sm:flex-row flex-col sm:items-start items-stretch mt-4">
                <div className="flex-shrink sm:mr-4 mr-0">
                    <Paper variant="outlined">
                        <RouteTab id={id} ctx={ctx} />
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
                                    <route.component
                                        {...props}
                                        routes={route.routes}
                                        ctx={ctx}
                                        id={id}
                                    />
                                )}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
