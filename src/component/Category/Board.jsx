import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

export default (props) => {
    const [board, setBoard] = useState(props.board)
    const history = useHistory()
    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            onClick={() => history.push('/board/'.concat(board.id))}
        >
            <List>
                <ListItem button>
                    {/* 板块名称 */}
                    <Grid item>
                        <Typography variant="h6">标题{board.name}</Typography>
                    </Grid>
                    {/* 描述 */}
                    <Grid item>
                        <Typography color="textSecondary">描述{board.description}</Typography>
                    </Grid>
                </ListItem>
            </List>
        </Grid>
    )
}
