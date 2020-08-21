/* 登录 */

import React from 'react'

import Base from '@component/BaseLoginRegister'
import LoginForm from '@component/LoginForm'
import Typography from '@material-ui/core/Typography'
import LoginLink from '@component/LoginLink'

export default function () {
    return (
        <Base>
            <div className="py-16">
                <Typography
                    variant="h2"
                    className="px-8 pb-8"
                    style={{ textShadow: '0 4px 6px rgb(66, 66, 66)' }}
                >
                    登入
                </Typography>
                <div className="px-8">
                    <LoginForm />
                </div>
                <div className="px-8 pt-4">
                    <LoginLink />
                </div>
            </div>
        </Base>
    )
}
