import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { indexOf } from 'lodash'

import { Tabs, Tab } from '@material-ui/core'

export default (props) => {
    // 拿到用户 id
    const { id, ctx } = props

    const history = useHistory()

    // 路由列表 对应tabs
    const routeList = [
        '/user-center/'.concat(id).concat('/post-list'), // 帖子
        '/user-center/'.concat(id).concat('/reply-list'), // 回复
        '/user-center/'.concat(id).concat('/info'), // 个人资料
        '/user-center/'.concat(id).concat('/edit-info'), // 编辑资料
        '/user-center/'.concat(id).concat('/edit-email'), // 修改邮箱
        '/user-center/'.concat(id).concat('/edit-pwd'), // 修改密码
        '/user-center/'.concat(id).concat('/init-email'), // 激活邮箱
    ]

    // 选中项目
    const [index, setIndex] = useState(indexOf(routeList, history.location.pathname))

    // 每次渲染都根据当前路由更新 tab 选中项目
    useEffect(() => {
        setIndex(indexOf(routeList, history.location.pathname))
    }, [history.location.pathname])

    // 点击 tab 更新 tab 选中项目，切换到对应路由
    const handleTabChange = (event, value) => {
        setIndex(value)
        history.push(routeList[value])
    }

    // 小于 sm 宽度，变为横向的 tab
    const [mwidth, setmwidth] = useState(document.documentElement.clientWidth)
    window.onresize = function () {
        setmwidth(document.documentElement.clientWidth)
    }

    return (
        <Tabs
            orientation={mwidth > 623 ? 'vertical' : null}
            value={index}
            onChange={handleTabChange}
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
        >
            <Tab label="帖子" value={0} />
            <Tab label="回复" value={1} />
            <Tab label="个人资料" value={2} />
            {ctx.state.id == id ? <Tab label="编辑资料" value={3} /> : ''}
            {ctx.state.id == id ? <Tab label="修改邮箱" value={4} /> : ''}
            {ctx.state.id == id ? <Tab label="修改密码" value={5} /> : ''}
            {ctx.state.emailVerified || ctx.state.id != id ? (
                ''
            ) : (
                <Tab label="激活邮箱" value={6} />
            )}
        </Tabs>
    )
}
