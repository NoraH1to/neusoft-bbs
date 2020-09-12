/* 用户中心 */

import React, { useEffect } from 'react'
import { useConcent } from 'concent'
import AuthRoute from '../../router/AuthRoute'

// 组件
import InfoCard from './Info/InfoCard'
import RouteTab from './Tabs'
import { Paper } from '@material-ui/core'

// 接口
import { userInfo } from '@api/user'

export default (props) => {
    const setup = (ctx) => {
        // 请求用户个人中心数据
        const requestUserInfo = (id) => {
            userInfo
                .request({
                    params: {
                        userId: id ? id : props.match.params.id,
                    },
                })
                .then((res) => {
                    // 如果是本人的信息，顺便更新下全局个人信息
                    if (ctx.connectedState.user.id == res.data.id)
                        ctx.setModuleState('user', res.data)
                    ctx.setState(res.data)
                })
                .catch((err) => {
                    console.log('requestUserInfo fail', err)
                })
        }

        ctx.effect(() => {
            requestUserInfo()
        }, [])

        return {
            requestUserInfo,
        }
    }
    const ctx = useConcent({ module: 'userCenter', connect: ['user'], setup, props })
    const { requestUserInfo } = ctx.settings
    // 路由参数更新就重新拿信息
    useEffect(() => {
        requestUserInfo(props.match.params.id)
    }, [props.match.params])
    return (
        <div className="flex flex-col">
            <div>
                <Paper>
                    <InfoCard ctx={ctx} outId={props.match.params.id} />
                </Paper>
            </div>
            <div className="flex sm:flex-row flex-col sm:items-start items-stretch mt-4">
                <div className="flex-shrink sm:mr-4 mr-0">
                    <Paper variant="outlined">
                        <RouteTab id={props.match.params.id} ctx={ctx} />
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
                                        id={props.match.params.id}
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
