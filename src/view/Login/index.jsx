/* 登录 */

import React from 'react'
import LoginForm from '../../component/LoginForm'
import Grid from '@material-ui/core/Grid'
import css from './index.scss'
import Fade from '@material-ui/core/Fade'
import Hidden from '@material-ui/core/Hidden'
import { useConcent } from 'concent'
import loginSvg from '../../../assets/login.svg'
import Typography from '@material-ui/core/Typography'
import LoginLink from '../../component/LoginLink'

const setup = (ctx) => {
    ctx.effect(() => {
        setTimeout(() => {
            ctx.setState({
                visibleLoginCard: true,
            })
        }, 300)
    }, [])
}

export default function () {
    const ctx = useConcent({
        state: {
            visibleLoginCard: false,
        },
        setup,
    })
    return (
        <div className={css.loginViewContainer + ' h-full'}>
            <Grid container direction="row" justify="center" alignItems="center" className="h-full">
                <Grid container direction="column" justify="center" xs={10} md={8}>
                    <Fade in={ctx.state.visibleLoginCard}>
                        <div className={css.loginCard + ' w-full'}>
                            <Grid container direction="row" justify="center" alignItems="stretch">
                                <Hidden xsDown>
                                    <img
                                        src={loginSvg}
                                        style={{ flexGrow: 1, background: 'rgb(71, 145, 219)' }}
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
                                    <div className="py-16">
                                        <Typography
                                            variant="h2"
                                            className="px-8 pb-8"
                                            style={{ textShadow: '0 4px 6px rgb(66, 66, 66)' }}
                                        >
                                            登入
                                        </Typography>
                                        <div className="px-8">
                                            <LoginForm />
                                        </div>
                                        <div className="px-8 pt-3">
                                            <LoginLink />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Fade>
                </Grid>
            </Grid>
        </div>
    )
}
