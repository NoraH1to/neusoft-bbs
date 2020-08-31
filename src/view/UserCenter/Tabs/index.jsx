import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { indexOf } from 'lodash'

import { Tabs, Tab } from '@material-ui/core'

export default (props) => {
    // 拿到用户 id
    const { id } = props

    const history = useHistory()

    // 路由列表 对应tabs
    const routeList = [
        '/user-center/'.concat(id).concat('/post-list'), // 帖子
        '/user-center/'.concat(id).concat('/reply-list'), // 回复
        '/user-center/'.concat(id).concat('/info'), // 个人资料
    ]

    // 选中项目
    const [index, setIndex] = useState(indexOf(routeList, history.location.pathname))

    // 每次渲染都根据当前路由更新 tab 选中项目
    useEffect(() => {
        setIndex(indexOf(routeList, history.location.pathname))
    }, [])

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
            textColor="primary"
        >
            <Tab label="帖子" value={0} />
            <Tab label="回复" value={1} />
            <Tab label="个人资料" value={2} />
            <Tab label="编辑资料" value={3} />
            <Tab label="修改密码" value={4} />
        </Tabs>
    )
}
