import React from 'react'
import { useHistory } from 'react-router-dom'
import { useConcent } from 'concent'

import { Avatar, Typography, Button, Divider } from '@material-ui/core'

import { logout } from '@api/user'
import { attrMap } from '@modules/user/template'

export default () => {
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
                <Avatar src={state[attrMap.avatarPath.key]} />
            </div>
            {/* 用户名 */}
            <div className="mb-3">
                <Typography variant="h6">{state[attrMap.nickname.key]}</Typography>
            </div>
            {/* 跳转个人空间 */}
            <div className="mb-3">
                <Button className="w-full" variant="outlined" onClick={() => history.push('/user-center')}>
                    个人空间
                </Button>
            </div>
            <Divider />
            {/* 登出按钮 */}
            <div className="mb-3">
                <Button
                    className="w-full"
                    onClick={() => {
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