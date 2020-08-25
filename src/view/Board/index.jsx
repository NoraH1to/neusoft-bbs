import React, { useState, useEffect } from 'react'

import TopicList from '@component/TopicList'
import Action from '@component/TopicList/Action'

import { topicList as requestTopicList } from '@api/topic'

const getTopicList = (params) => {
    return requestTopicList.request(params)
}

export default (props) => {
    const [topicList, setTopicList] = useState([])

    const {
        history,
        match: {
            params: { id },
        },
    } = props

    useEffect(() => {
        getTopicList()
            .then((res) => {
                console.log(res)
                setTopicList(topicList.concat(res.data))
            })
            .catch((err) => {
                console.log('getTopicList fial', err)
            })
    }, [])

    return (
        <div>
            <TopicList Action={Action} topicList={topicList} />
        </div>
    )
}
