import React, { useState } from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Board from './Board'

export default (props) => {
    const [category, setCategory] = useState(props.category)
    return (
        <>
            <Grid container direction="column" justify="center" alignItems="center">
                {/* <Box border={1} borderRadius={16} borderColor="primary.main"> */}
                <Card>
                    <Grid item xs>
                        <CardContent>
                            <Typography gutterBottom variant="h4">
                                分区标题{category.name}
                            </Typography>
                        </CardContent>
                    </Grid>
                    {/* 描述 */}
                    <Grid item>
                        <CardContent>
                            <Typography color="textSecondary" variant="h5">
                                分区描述{category.description}
                            </Typography>
                        </CardContent>
                        <Divider />
                    </Grid>
                    <Grid>
                        {category.boardList.map((board) => (
                            <Board board={board} />
                        ))}
                    </Grid>
                </Card>
                {/* </Box> */}
            </Grid>
        </>
    )
}
