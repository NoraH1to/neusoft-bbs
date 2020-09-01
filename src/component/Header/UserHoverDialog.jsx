import React from 'react'
import { useConcent } from 'concent'

import LoginForm from '@component/LoginForm'
import UserCard from './UserCard'

export default (props) => {
    const { onCallClose } = props
    const ctx = useConcent({ module: 'user' })
    const { hasLogin } = ctx.moduleComputed
    // 根据登录状态返回不同卡片
    if (hasLogin) return <UserCard onAction={onCallClose} />
    else return <LoginForm onAction={onCallClose}/>
}
