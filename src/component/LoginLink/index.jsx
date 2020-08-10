import React from 'react'

import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

export default () => {
    return (
        <div className="flex justify-between">
            <Link
                style={{ textShadow: '0 2px 10px rgb(80, 80, 80)' }}
                component={RouterLink}
                to="/register"
                color="textSecondary"
                underline="none"
            >
                注册
            </Link>
            <Link
                style={{ textShadow: '0 2px 10px rgb(80, 80, 80)' }}
                component={RouterLink}
                to="/find-password"
                color="textSecondary"
                underline="always"
            >
                忘记密码？
            </Link>
        </div>
    )
}
