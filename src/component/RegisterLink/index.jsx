import React from 'react'

import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

export default () => {
    return (
        <div className="flex justify-between">
            <Link
                style={{ textShadow: '0 2px 10px rgb(80, 80, 80)' }}
                component={RouterLink}
                to="/login"
                color="textSecondary"
                underline="always"
            >
                已有账号？前往登录
            </Link>
        </div>
    )
}
