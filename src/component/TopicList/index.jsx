import React, { useState, useEffect } from 'react'

import Topic from './Topic'

import InfiniteLoader from 'react-window-infinite-loader'

import { topicList as requestTopicList } from '@api/topic'
import { attrMap } from '@modules/topic/template'

const getTopicList = (params) => {
    return requestTopicList.request(params)
}

export default (props) => {
    const { Action } = props

    const [topicList, setTopicList] = useState([])

    const [requestParams, setRequestParams] = useState({
        [attrMap.type.key]: null,
        [attrMap.sort.key]: null,
        [attrMap.page.key]: 1,
        [attrMap.count.key]: 10,
        ...props.requestParam,
    })
    // 参数更改请求一次数据
    useEffect(() => {
        getTopicList(requestParams)
            .then((res) => {
                setTopicList(
                    requestParams[attrMap.page.key] > 1 ? topicList.concat(res.data) : res.data
                )
            })
            .catch((err) => {
                console.log('getTopicList fial', err)
            })
    }, [
        requestParams[attrMap.type.key],
        requestParams[attrMap.sort.key],
        requestParams[attrMap.page.key],
    ])
    // 每次 action 后重置页数然后请求
    const actionCallBack = (actions) => {
        setRequestParams({ ...requestParams, ...actions, [attrMap.page.key]: 1 })
    }

    const Item = ({ index, style }) => {
        let content
        if (!isItemLoaded(index)) {
            content = 'Loading...'
        } else {
            content = items[index].name
        }

        return <div style={style}>{content}</div>
    }

    return (
        <div>
            <div>{Action ? <Action callBackFn={actionCallBack} /> : undefined}</div>
            <div>
                {topicList.map((topic) => {
                    return <Topic topic={topic} />
                })}
                {/* <InfiniteLoader>
                    {({ onItemsRendered, ref }) => (
                        <FixedSizeList
                            itemCount={itemCount}
                            onItemsRendered={onItemsRendered}
                            ref={ref}
                            {...props}
                        >
                            {Item}
                        </FixedSizeList>
                    )}
                </InfiniteLoader> */}
            </div>
        </div>
    )
}
