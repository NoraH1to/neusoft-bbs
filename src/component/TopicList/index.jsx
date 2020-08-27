import React, { useState, useEffect } from 'react'

import Topic from './Topic'
import InfiniteScroll from 'react-infinite-scroller'

import { topicList as requestTopicList } from '@api/topic'
import { attrMap } from '@modules/topic/template'

export default (props) => {
    const { Action } = props

    const [isLoading, setIsLoading] = useState(false)

    const [pageOptions, setPageOptions] = useState({})

    // 主题帖列表
    const [topicList, setTopicList] = useState([])

    // 请求参数
    const [requestParams, setRequestParams] = useState({
        [attrMap.type.key]: null,
        [attrMap.sort.key]: null,
        [attrMap.page.key]: 1,
        [attrMap.count.key]: 10,
        ...props.requestParam,
    })

    // 参数更改请求一次数据
    useEffect(() => {
        console.log('effect')
        getTopicList()
    }, [requestParams[attrMap.type.key], requestParams[attrMap.sort.key]])

    // 获取帖子列表
    const getTopicList = (page) => {
        setIsLoading(true)
        console.log('get', page ? page : requestParams[attrMap.page.key])
        requestTopicList
            .request({
                ...requestParams,
                ...(page ? { [requestParams[attrMap.page.key]]: page } : undefined),
            })
            .then((res) => {
                const { content, ...otherData } = res.data
                setTopicList((oldTopList) => {
                    return requestParams[attrMap.page.key] > 1
                        ? oldTopList.concat(content)
                        : content
                })
                setPageOptions(otherData)
                if (content.length > 0) {
                    setRequestParams({
                        ...requestTopicList,
                        [attrMap.page.key]: requestParams[attrMap.page.key] + 1,
                    })
                }
            })
            .catch((err) => {
                console.log('getTopicList fial', err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    // 每次 action 后重置页数然后请求
    const actionCallBack = (actions) => {
        setRequestParams({ ...requestParams, ...actions, [attrMap.page.key]: 1 })
    }

    return (
        <div>
            <div>{Action ? <Action callBackFn={actionCallBack} /> : undefined}</div>
            <div>
                <InfiniteScroll
                    loadMore={(page) => {
                        getTopicList()
                    }}
                    loader={
                        <div className="loader" key={0}>
                            <p align="middle">Loading ...</p>
                        </div>
                    }
                    threshold={0}
                    useWindow={true}
                    hasMore={!isLoading}
                >
                    {topicList.map((topic) => {
                        return <Topic topic={topic} />
                    })}
                </InfiniteScroll>
            </div>
        </div>
    )
}
