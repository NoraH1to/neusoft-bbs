import React from 'react'
import { useHistory } from 'react-router-dom'
import { useConcent } from 'concent'

import { Avatar, Typography, Button, Divider } from '@material-ui/core'

import { logout } from '@api/user'
import { attrMap } from '@modules/user/template'

export default (props) => {
    const { onAction } = props
    const ctx = useConcent({ module: 'user' })
    const { state } = ctx
    const history = useHistory()

    // 登出
    const requestLogout = () => {
        logout
            .request({ msg: '登出' })
            .then((res) => {
                ctx.dispatch('resetState')
                history.push('/')
            })
            .catch((err) => {
                console.log('logout fail', err)
            })
    }

    return (
        <div className="flex flex-col items-stretch text-center px-4 pt-2">
            {/* 头像 */}
            <div className="flex items-center justify-center mb-3">
                <Avatar
                    alt={ctx.moduleState.nickname}
                    src={ctx.moduleState.avatarPath ? ctx.moduleState.avatarPath : undefined}
                />
            </div>
            {/* 身份 */}
            <div className="mb-1">
                <div className="flex flex-col items-center">
                    {ctx.moduleComputed.isAdmin ? (
                        <div className="bg-orange-400 rounded-md px-2 text-white font-extrabold">
                            管理
                        </div>
                    ) : (
                        <div className="bg-blue-400 rounded-md px-2 text-white font-extrabold">
                            普通用户
                        </div>
                    )}
                </div>
            </div>
            {/* 用户名 */}
            <div className="mb-3">
                <Typography variant="h6">{state[attrMap.nickname.key]}</Typography>
            </div>
            {/* 跳转个人空间 */}
            <div className="mb-3">
                <Button
                    className="w-full"
                    variant="outlined"
                    onClick={() => {
                        onAction()
                        history.push('/user-center/' + state.id + '/post-list')
                    }}
                >
                    个人空间
                </Button>
            </div>
            <Divider />
            {/* 登出按钮 */}
            <div className="mb-3">
                <Button
                    className="w-full"
                    onClick={() => {
                        onAction()
                        requestLogout()
                    }}
                    color="secondary"
                    variant="contained"
                >
                    登出
                </Button>
            </div>
        </div>
    )
}
