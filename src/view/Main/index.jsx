/* 主页 */

import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'

import SearchIcon from '@material-ui/icons/Search'

import AuthRoute from '../../router/AuthRoute'

export default (props) => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        NEU BBS
                    </Typography>
                    <div>
                        <div>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <div className="container m-auto">
                {props.routes.map((route) => {
                    return (
                        <AuthRoute
                            {...route}
                            key={route.path}
                            render={(props) => <route.component {...props} routes={route.routes} />}
                        />
                    )
                })}
            </div>
        </div>
    )
}
