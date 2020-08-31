import React from 'react'

import { Paper } from '@material-ui/core'

export default (props) => {
    const { ctx, id } = props
    const userInfo = ctx.state
    console.log(userInfo)
    return (
        <Paper>
            <div></div>
        </Paper>
    )
}
