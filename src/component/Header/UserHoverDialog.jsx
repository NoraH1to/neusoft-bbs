import React from 'react'
import { useConcent } from 'concent'

import LoginForm from '@component/LoginForm'
import UserCard from './UserCard'

// 登录卡片
const LoginCard = () => {
    return <LoginForm />
}

export default () => {
    const ctx = useConcent({ module: 'user' })
    const { hasLogin } = ctx.moduleComputed
    // 根据登录状态返回不同卡片
    if (hasLogin) return <UserCard />
    else return <LoginCard />
}
