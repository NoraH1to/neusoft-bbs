import React, { useEffect, useState, useMemo } from 'react'

// 组件
import Category from '@component/Category'
import FriendLinkCard from '@component/FriendLinkCard'
import { Grid, Paper, Hidden, Typography } from '@material-ui/core'
import LoginForm from '@component/LoginForm'

// 接口
import { homeBoardList } from '@api/forum'

export default () => {
    const [mainState, setMainState] = useState({
        state: [],
    })
    function requestMainList() {
        homeBoardList
            .request()
            .then((res) => {
                setMainState({
                    state: res.data,
                })
            })
            .catch((err) => {
                console.log('request main list fail', err)
            })
    }
    useEffect(() => {
        // 请求
        requestMainList()
    }, [])
    const FriendLinkPaper = useMemo(() => (
        <Paper variant="outlined" className="mb-10 p-8">
            <Typography variant="h5" className="pb-4 text-center">友情链接</Typography>
            <FriendLinkCard />
        </Paper>
    ), [mainState])
    return (
        <>
            <div className="my-10 mx-4 flex">
                <div>
                    {mainState.state.map((category) => (
                        <div className="mb-10">
                            <Category category={category} />
                        </div>
                    ))}
                    <Hidden mdUp>
                        {/* 友情链接 */}
                        {FriendLinkPaper}
                    </Hidden>
                </div>
                {/* 侧边栏 */}
                <Hidden mdDown>
                    <div className="pl-10" style={{ maxWidth: '22rem', minWidth: '18rem' }}>
                        {/* 登录 */}
                        <Paper className="p-10 mb-10">
                            <div className="mb-6">
                                <Typography variant="h3">登录</Typography>
                            </div>
                            <LoginForm />
                        </Paper>
                        {/* 友情链接 */}
                        {FriendLinkPaper}
                    </div>
                </Hidden>
            </div>
        </>
    )
}
