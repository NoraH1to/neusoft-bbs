/* 主题详情 */

import React, { useEffect, useState } from 'react'

// 组件
import { Typography } from '@material-ui/core'
import ReplyList from '@component/ReplyList'

// 接口
import { attrMap } from '@modules/topic/template'
import { topicDetail } from '@api/topic'
import { topicReplyList } from '@api/reply'

export default function (props) {
    const [topic, setTopic] = useState({})

    const {
        history,
        match: {
            params: { id },
        },
    } = props

    // 请求帖子信息
    const getTopicDetail = () => {
        return topicDetail.request({
            params: {
                [attrMap.topicId.key]: id,
            },
        })
    }

    // 请求回复列表
    const getReplyList = () => {
        return topicReplyList.request({
            params: {
                [attrMap.topicId.key]: id,
            },
        })
    }

    useEffect(() => {
        getTopicDetail()
            .then((res) => {
                console.log(res.data)
                setTopic(res.data)
            })
            .catch((err) => {
                console.log('getTopicDetail fail', err)
            })
    }, [])

    return (
        <div>
            <div>{topic.id}</div>
            <div>{topic.title}</div>
            <div>
                <Typography>{topic.content}</Typography>
            </div>
        </div>
    )
}
