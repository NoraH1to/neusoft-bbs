import React, { useState } from 'react'

import {useHistory} from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

export default (props) => {
    const [board, setBoard] = useState(props.board)
    const history = useHistory()
    return (
        <Grid container direction="column" justify="center" alignItems="center" onClick={() => history.push('/board/'.concat(board.id))}>
            {/* 板块名称 */}
            <Grid item>
                <Typography>标题{board.name}</Typography>
            </Grid>
            {/* 描述 */}
            <Grid item>
                <Typography>描述{board.description}</Typography>
            </Grid>
        </Grid>
    )
}