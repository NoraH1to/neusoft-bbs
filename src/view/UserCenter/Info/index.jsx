import React from 'react'
import { useConcent } from 'concent'

import { Paper, Typography } from '@material-ui/core'

import { userInfo } from '@api/user'

const setup = (ctx) => {
    // 请求用户个人中心数据
    const requestUserInfo = () => {
        userInfo
            .request({
                params: {
                    userId: ctx.props.id,
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
}

export default (props) => {
    const ctx = useConcent({ module: 'user', setup, props })
    const userInfo = ctx.state

    return (
        <Paper variant="outlined" className="px-4 py-6">
            {/* id */}
            <div className="flex flex-row items-center justify-start px-6 mb-4">
                <div style={{ minWidth: '32px' }} className="mr-6 flex-shrink-0">
                    <Typography color="textSecondary">ID</Typography>
                </div>
                <div>
                    <Typography variant="h6">{userInfo.id}</Typography>
                </div>
            </div>

            {/* 账号 */}
            <div className="flex flex-row items-center justify-start px-6 mb-4">
                <div style={{ minWidth: '32px' }} className="mr-6 flex-shrink-0">
                    <Typography color="textSecondary">账号</Typography>
                </div>
                <div>
                    <Typography variant="h6">{userInfo.username}</Typography>
                </div>
            </div>

            {/* 邮箱 */}
            <div className="flex flex-row items-center px-6 mb-4">
                <div style={{ minWidth: '32px' }} className="mr-6 flex-shrink-0">
                    <Typography color="textSecondary">邮箱</Typography>
                </div>
                {/* 邮箱 */}
                <div className="break-all mr-2 inline">
                    <Typography className="break-all inline" variant="h6">
                        {userInfo.email}
                    </Typography>
                </div>
                {/* 校验状态 */}
                <div className="flex-shrink-0">
                    <div
                        className="inline-block px-2 py-1 text-white text-xs rounded-md border border-solid"
                        style={
                            userInfo.emailVerified
                                ? { color: '#15d36a', borderColor: '#15d36a' }
                                : { color: '#ffc61b', borderColor: '#ffc61b' }
                        }
                    >
                        {userInfo.emailVerified ? '已校验' : '未校验'}
                    </div>
                </div>
            </div>

            {/* 昵称 */}
            <div className="flex flex-row items-center justify-start px-6 mb-4">
                <div style={{ minWidth: '32px' }} className="mr-6 flex-shrink-0">
                    <Typography color="textSecondary">昵称</Typography>
                </div>
                <div>
                    <Typography variant="h6">{userInfo.nickname}</Typography>
                </div>
            </div>

            {/* 性别 */}
            <div className="flex flex-row items-center justify-start px-6 mb-4">
                <div style={{ minWidth: '32px' }} className="mr-6 flex-shrink-0">
                    <Typography color="textSecondary">性别</Typography>
                </div>
                <div>
                    {(() => {
                        switch (userInfo.sex) {
                            case 0:
                                return (
                                    <Typography className="text-blue-400 pl-2">♂ 男生</Typography>
                                )
                            case 1:
                                return <Typography className="text-red-400 pl-2">♀ 女生</Typography>
                            default:
                                return (
                                    <Typography variant="h6" color="textSecondary">
                                        保密
                                    </Typography>
                                )
                        }
                    })()}
                </div>
            </div>

            {/* 签名 */}
            <div className="flex flex-row items-center justify-start px-6 mb-4">
                <div style={{ minWidth: '32px' }} className="mr-6 flex-shrink-0">
                    <Typography color="textSecondary">签名</Typography>
                </div>
                <div>
                    <Typography variant="h6">{userInfo.signature}</Typography>
                </div>
            </div>

            {/* 注册时间 */}
            <div className="flex flex-row items-center justify-start px-6">
                <div style={{ minWidth: '32px' }} className="mr-6 flex-shrink-0">
                    <Typography color="textSecondary">注册时间</Typography>
                </div>
                <div>
                    <Typography variant="h6">{userInfo.registerTime}</Typography>
                </div>
            </div>
        </Paper>
    )
}
