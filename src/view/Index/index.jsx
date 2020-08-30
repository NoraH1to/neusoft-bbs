import React, { useEffect, useState } from 'react'
import { useConcent } from 'concent'
import { range } from 'lodash'

// 组件
import Category from '@component/Category'
import FriendLinkCard from '@component/FriendLinkCard'
import { Grid, Paper, Hidden, Typography } from '@material-ui/core'
import LoginForm from '@component/LoginForm'

// 动画
import Slide from '@material-ui/core/Slide'
import Skeleton from '@material-ui/lab/Skeleton'

// 接口
import { homeBoardList } from '@api/forum'

export default () => {
    // 是否在加载
    const [loading, setLoading] = useState(true)

    const ctx = useConcent({
        module: 'user',
        state: {
            mainState: [],
        },
        setup: (ctx) => {
            // 请求主页数据
            function requestMainList() {
                setLoading(true)
                homeBoardList
                    .request()
                    .then((res) => {
                        ctx.setState({
                            mainState: res.data,
                        })
                    })
                    .catch((err) => {
                        console.log('request main list fail', err)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }
            ctx.watch('id', {
                fn: (newVal) => {
                    requestMainList()
                },
            })
            return { requestMainList }
        },
    })
    const { hasLogin } = ctx.moduleComputed
    const { requestMainList } = ctx.settings

    useEffect(() => {
        // 请求
        requestMainList()
    }, [])
    const FriendLinkPaper = (
        <Paper variant="outlined" className="mb-10 p-8">
            <Typography variant="h5" className="pb-4 text-center">
                友情链接
            </Typography>
            <FriendLinkCard />
        </Paper>
    )
    return (
        <>
            <div className="my-10 mx-4 sm:mx-10 flex justify-end">
                {loading ? (
                    <div className="flex flex-col w-full">
                        {range(0, 20).map(() => (
                            <>
                                <Skeleton variant="text" height={50} className="w-full mb-1" />
                                <Skeleton variant="text" height={50} className="w-full" />
                                <Skeleton variant="rect" height={300} className="w-full mt-2" />
                            </>
                        ))}
                    </div>
                ) : (
                    <Slide in={!loading} direction="right">
                        <div className="w-full">
                            {ctx.state.mainState.map((category) => (
                                <div className="mb-10 w-full">
                                    <Category category={category} />
                                </div>
                            ))}
                            <Hidden lgUp>
                                {/* 友情链接 */}
                                {FriendLinkPaper}
                            </Hidden>
                        </div>
                    </Slide>
                )}
                {/* 侧边栏 */}
                <Hidden mdDown>
                    <div className="pl-10" style={{ maxWidth: '22rem', minWidth: '22rem' }}>
                        {/* 登录 */}
                        {hasLogin ? undefined : (
                            <Paper className="p-10 mb-10">
                                <div className="mb-6">
                                    <Typography className="text-center" variant="h5">
                                        登录
                                    </Typography>
                                </div>
                                <LoginForm />
                            </Paper>
                        )}
                        {/* 友情链接 */}
                        {FriendLinkPaper}
                    </div>
                </Hidden>
            </div>
        </>
    )
}
