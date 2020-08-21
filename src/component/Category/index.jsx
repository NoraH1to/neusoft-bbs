import React, { useState } from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Board from '@component/Board'

export default (props) => {
    const [category, setCategory] = useState(props.category)
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            {/* 分区名称 */}
            <Grid item>
                <Typography>分区标题{category.name}</Typography>
            </Grid>
            {/* 描述 */}
            <Grid item>
                <Typography>分区描述{category.description}</Typography>
            </Grid>
            <Grid>
                {category.boardList.map((board) => (
                    <Board board={board} />
                ))}
            </Grid>
        </Grid>
    )
}
