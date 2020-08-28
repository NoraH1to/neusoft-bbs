import React, { useState } from 'react'
import { Grid, Typography, Divider, CardContent, Paper } from '@material-ui/core'
import Board from './Board'
import ColorHash from 'color-hash'

export default (props) => {
    const [category, setCategory] = useState(props.category)
    const colorHash = new ColorHash()
    return (
        <>
            <Paper elevation={4} className="w-full" style={{borderRadius: '1rem'}}>
                <div className="px-10 pb-4 pt-8">
                    {/* 标题 */}
                    <Typography gutterBottom variant="h4">
                        {category.name}
                    </Typography>
                    {/* 描述 */}
                    <Typography noWrap color="textSecondary" variant="caption">
                        {category.description}
                    </Typography>
                </div>
                <Divider />
                {/* 板块 */}
                <Grid container className="py-4 px-10">
                    {category.boardList.map((board) => (
                        <Grid item xs={12} sm={4} className="flex-grow">
                            <Board board={board} />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </>
    )
}
