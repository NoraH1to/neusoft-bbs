import React from 'react'

import Editor from '@component/Editor'
import { Typography, Hidden } from '@material-ui/core'

export default (props) => {
    const {
        history,
        match: {
            params: { id },
        },
    } = props
    return (
        <div className="sm:mt-12 sm:mb-12 h-full">
            <Hidden xsDown>
                <Typography className="pb-4" variant="h3" color="textSecondary">
                    {id ? '编辑主题帖' : '新建主题帖'}
                </Typography>
            </Hidden>
            <Editor />
        </div>
    )
}
