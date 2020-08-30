import React, { useState, useEffect } from 'react'
import { range } from 'lodash'

import { Paper, ListItem } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import Topic from './Topic'
import InfiniteScroll from 'react-infinite-scroller'

import { topicList as requestTopicList } from '@api/topic'
import { attrMap } from '@modules/topic/template'

const LoadingFrame = (
    <div className="px-6">
        {range(0, 3).map(() => (
            <div className="flex flex-col items-stretch w-full py-4 border-0 border-b border-solid border-gray-400">
                <div className="flex flex-row items-center">
                    <Skeleton height={50} width={50} variant="circle" />
                    <Skeleton height={35} width={150} className="ml-4" variant="text" />
                </div>
                <div className="mb-2">
                    <Skeleton height={50} className="w-full" variant="text" />
                </div>
                <div className="flex flex-row">
                    <Skeleton
                        style={{
                            height: '150px',
                            width: '150px',
                            maxWidth: '33%',
                        }}
                        className="mr-2"
                        variant="rect"
                    />
                    <Skeleton
                        style={{
                            height: '150px',
                            width: '150px',
                            maxWidth: '33%',
                        }}
                        className="mr-2"
                        variant="rect"
                    />
                    <Skeleton
                        style={{
                            height: '150px',
                            width: '150px',
                            maxWidth: '33%',
                        }}
                        variant="rect"
                    />
                </div>
            </div>
        ))}
    </div>
)

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
        getTopicList(1)
    }, [requestParams[attrMap.type.key], requestParams[attrMap.sort.key]])

    // 获取帖子列表
    const getTopicList = (page) => {
        // 拿到最新的加载状态，没有加载才执行
        setIsLoading((oldLoading) => {
            if (!oldLoading) {
                requestTopicList
                    .request({
                        ...requestParams,
                        ...(page ? { [attrMap.page.key]: page } : undefined),
                    })
                    .then((res) => {
                        const { content, ...otherData } = res.data
                        setTopicList((oldTopList) => {
                            return page == 1 ? content : oldTopList.concat(content)
                        })
                    })
                    .catch((err) => {})
                    .finally(() => {
                        setIsLoading(false)
                    })
            }
            return true
        })
    }

    // 加载更多
    const loadMore = (page) => {
        setRequestParams((oldRequestParams) => {
            getTopicList(oldRequestParams[attrMap.page.key])
            return {
                ...oldRequestParams,
                [attrMap.page.key]: oldRequestParams[attrMap.page.key] + 1,
            }
        })
    }

    // 每次 action 后重置页数然后请求
    const actionCallBack = (actions) => {
        setRequestParams((oldRequestParams) => {
            return { ...oldRequestParams, ...actions, [attrMap.page.key]: 2 }
        })
    }

    return (
        <div>
            <Paper>
                {/* action bar */}
                <div>{Action ? <Action callBackFn={actionCallBack} /> : undefined}</div>

                {/* 滚动加载数据列表 */}
                <div>
                    <InfiniteScroll
                        loadMore={loadMore}
                        loader={
                            <div className="loader" key={0}>
                                <p align="middle">Loading ...</p>
                            </div>
                        }
                        threshold={10}
                        useWindow={true}
                        hasMore={!isLoading}
                    >
                        <div>
                            {isLoading && requestParams.page == 2
                                ? LoadingFrame
                                : topicList.map((topic) => {
                                      return (
                                          <div className=" border-solid border-0 border-b border-gray-400">
                                              <ListItem
                                                  alignItems="center"
                                                  ContainerComponent="div"
                                                  button
                                                  style={{ padding: '1rem 1.5rem' }}
                                              >
                                                  <Topic topic={topic} />
                                              </ListItem>
                                          </div>
                                      )
                                  })}
                        </div>
                    </InfiniteScroll>
                </div>
            </Paper>
        </div>
    )
}
