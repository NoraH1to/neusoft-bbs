import React, { useState, useEffect } from 'react'
import { range } from 'lodash'

import { Paper, ListItem, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

import Topic from './Topic'
import InfiniteScroll from 'react-infinite-scroller'

import { topicList as requestTopicList } from '@api/topic'
import { attrMap } from '@modules/topic/template'

const useStyles = makeStyles((theme) => ({
    sk: {
        width: '33%',
        height: '0px',
        paddingBottom: '33%',
        [theme.breakpoints.up('sm')]: {
            width: '150px',
            height: '150px',
            paddingBottom: '0',
        },
    },
}))

// 加载分页时候的提示
const LoadingPageFrame = (
    <div className="p-2 text-center" key={0}>
        <Typography color="textSecondary">加载中 ...</Typography>
    </div>
)

export default (props) => {
    const classes = useStyles()

    // 首次加载时的骨架屏
    const LoadingFrame = (
        <>
            {range(0, 3).map(() => (
                <div className="flex flex-col items-stretch py-4 px-6 border-0 border-b border-solid border-gray-400">
                    <div className="flex flex-row items-center">
                        <Skeleton height={40} width={40} variant="circle" />
                        <Skeleton height={35} width={150} className="ml-2" variant="text" />
                    </div>
                    <div className="mb-2">
                        <Skeleton height={50} className="w-full" variant="text" />
                    </div>
                    <div className="flex content-start ">
                        <Skeleton className={classes.sk + ' mr-2'} variant="rect" />
                        <Skeleton className={classes.sk + ' mr-2'} variant="rect" />
                        <Skeleton className={classes.sk} variant="rect" />
                    </div>
                </div>
            ))}
        </>
    )

    // 获取 ActionBar
    const { Action } = props

    // 加载状态
    const [isLoading, setIsLoading] = useState(false)

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
                        const { content } = res.data
                        setTopicList((oldTopList) => {
                            return page == 1 ? content : oldTopList.concat(content)
                        })
                    })
                    .catch((err) => {
                        console.log('requestTopicList fail', err)
                    })
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
        <Paper>
            {/* action bar */}
            {Action ? (
                <div>
                    <Action callBackFn={actionCallBack} />
                </div>
            ) : undefined}

            {/* 滚动加载数据列表 */}
            <InfiniteScroll
                loadMore={loadMore}
                loader={LoadingPageFrame}
                threshold={10}
                useWindow={true}
                hasMore={!isLoading}
            >
                {isLoading && requestParams.page == 2
                    ? LoadingFrame
                    : topicList.map((topic) => {
                          return (
                              <div className=" border-solid border-0 border-b border-gray-400 overflow-hidden">
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
            </InfiniteScroll>
        </Paper>
    )
}
