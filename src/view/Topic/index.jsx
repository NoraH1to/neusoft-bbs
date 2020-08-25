/* 主题详情 */

import React, { useEffect, useState } from 'react'

import { topicDetail } from '@api/topic'

import Typography from '@material-ui/core/Typography'

const getTopicDetail = (params) => {
    return topicDetail.request(params)
}

export default function (props) {
    const [topic, setTopic] = useState({})

    const {
        history,
        match: {
            params: { id },
        },
    } = props

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
