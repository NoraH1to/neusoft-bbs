/* 用户中心 / 个人资料 */

import React from 'react'

// 组件
import { Avatar, Typography, Button } from '@material-ui/core'

export default (props) => {
    const { ctx } = props
    const userInfo = ctx.state
    const { id, nickname, avatarPath, topicCount, replyCount, sex, signature } = userInfo

    return (
        <div className="flex flex-col sm:flex-row items-center sm:items-stretch px-12 py-6">
            {/* 左侧头像 */}
            <Avatar src={avatarPath} style={{ height: '8rem', width: '8rem' }} className="sm:mr-8" />

            {/* 中间信息 */}
            <div className="flex flex-col items-center sm:items-start flex-grow sm:mt-0 mt-2">
                <div className="flex items-center mb-1">
                    {/* 身份 */}
                    {ctx.moduleComputed.isAdmin ? (
                        <div className="bg-orange-400 rounded-md px-2 text-white mr-4">管理</div>
                    ) : (
                        <div className="bg-blue-400 rounded-md px-2 text-white mr-4">
                            普通用户
                        </div>
                    )}
                    {/* 昵称 */}
                    <Typography variant="h6">{nickname}</Typography>
                    {/* 性别 */}
                    {(() => {
                        switch (sex) {
                            case 0:
                                return <Typography className="text-blue-400 pl-2">♂</Typography>
                                break
                            case 1:
                                return <Typography className="text-red-400 pl-2">♀</Typography>
                                break
                            default:
                                return undefined
                        }
                    })()}
                    {/* ID */}
                    <Typography variant="caption" color="textSecondary" className="pl-2">
                        ID:{id}
                    </Typography>
                </div>
                {/* 签名 */}
                <div className="mb-2">
                    <Typography variant="body2" color="textSecondary">
                        {'✒ ' + (signature ? signature : '这个人莫得签名')}
                    </Typography>
                </div>
                {/* 编辑资料按钮 */}
                <div className="flex start">
                    <Button variant="outlined" color="primary" className="w-24">
                        编辑
                    </Button>
                </div>
            </div>

            {/* 右侧数据 */}
            <div className="flex flex-row items-center sm:ml-4 sm:mt-0 mt-2">
                <div className="flex flex-col items-center">
                    <Typography variant="h5">{topicCount}</Typography>
                    <Typography color="textSecondary">回复</Typography>
                </div>
                <div className="flex flex-col items-center pl-8">
                    <Typography variant="h5">{replyCount}</Typography>
                    <Typography color="textSecondary">发帖</Typography>
                </div>
            </div>
        </div>
    )
}
