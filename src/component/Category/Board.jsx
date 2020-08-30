import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ColorHash from 'color-hash'

export default (props) => {
    const [board, setBoard] = useState(props.board)
    const history = useHistory()
    const colorHash = new ColorHash()
    return (
        <List>
            <ListItem
                style={{ borderLeft: 'solid 0.25rem ' + colorHash.hex(board.name) }}
                button
                onClick={() => history.push('/board/'.concat(board.id))}
            >
                <div className="flex flex-col overflow-hidden">
                    <div>
                        <Typography noWrap variant="h6">标题{board.name}</Typography>
                    </div>
                    <div>
                        <Typography noWrap color="textSecondary" variant="caption">
                            描述{board.description}
                        </Typography>
                    </div>
                </div>
            </ListItem>
        </List>
    )
}
