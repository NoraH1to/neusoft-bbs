import React from 'react'
import { useHistory } from 'react-router-dom'
import { useConcent } from 'concent'

import { Avatar, Typography, Link, Button, Divider } from '@material-ui/core'

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
        <div className="flex flex-col">
            {/* 头像 */}
            <Avatar src={state[attrMap.avatarPath.key]} />
            {/* 用户名 */}
            <Typography>{state[attrMap.nickname.key]}</Typography>
            {/* 跳转个人空间 */}
            <Link onClick={() => history.push('/user-center')}>个人空间</Link>
            <Divider />
            {/* 登出按钮 */}
            <Button
                onClick={() => {
                    requestLogout()
                }}
                color="secondary"
                variant="contained"
            >
                登出
            </Button>
        </div>
    )
}
