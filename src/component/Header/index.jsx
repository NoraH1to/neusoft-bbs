import React from 'react'
import { useConcent } from 'concent'

import { fade, makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, InputBase, Avatar, IconButton } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    IconSpace: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}))

export default () => {
    const ctx = useConcent({ module: 'user' })
    const classes = useStyles()
    console.log(ctx.moduleState)

    return (
        <AppBar position="static">
            <Toolbar>
                {/* 标题 */}
                <Typography className={classes.title} variant="h6" noWrap>
                    NEU BBS
                </Typography>
                {/* 搜索框 */}
                <div
                    className={
                        'flex ml-6 bg-white bg-opacity-25 hover:bg-opacity-50 px-1 rounded-md ' +
                        classes.search
                    }
                >
                    <div className="flex items-center ml-2 mr-1">
                        <SearchIcon />
                    </div>
                    <InputBase
                        classes={{ root: classes.inputRoot, input: classes.inputInput }}
                        placeholder="搜索..."
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <div className="flex-grow"/>
                {/* 用户头像 */}
                <div className="flex flex-end">
                    <IconButton>
                    <Avatar
                        className={classes.small}
                        src={ctx.moduleState.avatarPath ? ctx.moduleState.avatarPath : undefined}
                    />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    )
}
