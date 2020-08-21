/* 注册 */

import React from 'react'

import Base from '@component/BaseLoginRegister'
import RegisterForm from '@component/RegisterForm'
import Typography from '@material-ui/core/Typography'
import RegisterLink from '@component/RegisterLink'

export default function () {
    return (
        <Base>
            <div className="py-16">
                <Typography
                    variant="h2"
                    className="px-8 pb-8"
                    style={{ textShadow: '0 4px 6px rgb(66, 66, 66)' }}
                >
                    注册
                </Typography>
                <div className="px-8">
                    <RegisterForm />
                </div>
                <div className="px-8 pt-3">
                    <RegisterLink />
                </div>
            </div>
        </Base>
    )
}

