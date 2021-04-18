/* 登录 */

import React from 'react'
import Grid from '@material-ui/core/Grid'
import css from './index.scss'
import Fade from '@material-ui/core/Fade'
import Hidden from '@material-ui/core/Hidden'
import { useConcent } from 'concent'
import mySvg from '@assets/login_register.svg'

const setup = (ctx) => {
    ctx.effect(() => {
        setTimeout(() => {
            ctx.setState({
                visibleCard: true,
            })
        }, 200)
    }, [])
}

export default (props) => {
    const ctx = useConcent({
        state: {
            visibleCard: false,
        },
        setup,
    })
    return (
        <div className={css.viewContainer + ' h-full'}>
            <Grid container direction="row" justify="center" alignItems="center" className="h-full">
                <Grid container direction="column" justify="center" xs={10} md={8}>
                    <Fade in={ctx.state.visibleCard}>
                        <div className={css.actionCard + ' w-full'}>
                            <Grid container direction="row" justify="center" alignItems="stretch" wrap="nowrap">
                                <Hidden xsDown>
                                    <img
                                        src={mySvg}
                                        style={{ flexGrow: 1, background: 'rgb(71, 145, 219)', width: '1px' }}
                                    ></img>
                                </Hidden>
                                <Grid
                                    container
                                    style={{ minWidth: '18rem', maxWidth: '22rem' }}
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    xs={12}
                                    sm={4}
                                >
                                    {props.children}
                                </Grid>
                            </Grid>
                        </div>
                    </Fade>
                </Grid>
            </Grid>
        </div>
    )
}
