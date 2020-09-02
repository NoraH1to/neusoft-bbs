import React from 'react'
import { withRouter } from 'react-router-dom'
import { useConcent } from 'concent'

import LoginForm from '@component/LoginForm'
import UserCard from './UserCard'
import { Button } from '@material-ui/core'

export default withRouter((props) => {
    const { onCallClose } = props
    const ctx = useConcent({ module: 'user' })
    const { hasLogin } = ctx.moduleComputed
    // 根据登录状态返回不同卡片
    if (hasLogin) return <UserCard onAction={onCallClose} />
    else
        return (
            <>
                <LoginForm onAction={onCallClose} />
                <div className="mt-2 ">
                    <Button
                        className="w-full"
                        onClick={() => props.history.push('/register')}
                        color="primary"
                        variant="outlined"
                    >
                        注册
                    </Button>
                </div>
            </>
        )
})
