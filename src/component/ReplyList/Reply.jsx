import React from 'react'

import {Typography} from '@material-ui/core'

export default (props) => {
    const { reply } = props
    return (<div>
        <Typography>{reply.content}</Typography>
    </div>)
}
