import React, { useState } from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Board from './Board'

export default (props) => {
    const [category, setCategory] = useState(props.category)
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            {/* 分区名称 */}
            <Grid item xs>
                <Typography gutterBottom variant="h4">
                    分区标题{category.name}
                </Typography>
            </Grid>
            {/* 描述 */}
            <Grid item>
                <Typography color="textSecondary" variant="h5">分区描述{category.description}</Typography>
                <Divider />
            </Grid>
            <Grid>
                {category.boardList.map((board) => (
                    <Board board={board} />
                ))}
            </Grid>
        </Grid>
    )
}
