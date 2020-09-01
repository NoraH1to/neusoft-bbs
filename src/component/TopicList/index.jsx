import React, { useState, useEffect } from 'react'
import { useConcent } from 'concent'
import { range } from 'lodash'

// 组件
import { Paper, ListItem, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import Topic from './Topic'
import { StickyContainer, Sticky } from 'react-sticky'

import { topicList as requestTopicList, userTopicList as requestUserTopicList } from '@api/topic'
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

const setup = (ctx) => {
    const { state, setState } = ctx
    const { isLoading, hasNext, topicList, requestParams } = state

    ctx.computed({
        // 根据参数决定用哪个 api
        topicApi: (newState) => {
            return newState.requestParams.userId ? requestUserTopicList : requestTopicList
        },
    })

    // 加载状态
    const setIsLoading = (newState, callBack) => {
        setState({ isLoading: newState }, callBack)
    }

    // 设置是否有下一页
    const setHasNext = (newState, callBack) => {
        setState({ hasNext: newState }, callBack)
    }

    // 设置帖子
    const setTopicList = (newState, callBack) => {
        setState((oldState) => {
            return {
                topicList: oldState.topicList.concat(newState),
            }
        }, callBack)
    }

    // 获取帖子列表
    const getTopicList = (inputRequestParams) => {
        // 拿到最新的加载状态，没有加载才执行
        if (!isLoading) {
            setIsLoading(true)
            ctx.refComputed.topicApi
                .request({
                    params: {
                        ...(inputRequestParams ? inputRequestParams : requestParams),
                    },
                })
                .then((res) => {
                    const { content, hasNext } = res.data
                    setState((oldState) => {
                        // 如果是第一页就替换，防止脏数据
                        return {
                            hasNext,
                            topicList:
                                oldState.requestParams.page == 1
                                    ? content
                                    : oldState.topicList.concat(content),
                        }
                    })
                })
                .catch((err) => {
                    console.log('requestTopicList fail', err)
                    setState((oldState) => {
                        // 如果是第一页就替换，防止脏数据
                        return {
                            hasNext: false,
                        }
                    })
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    // 加载更多
    const loadMore = () => {
        setState(
            (oldState) => {
                return {
                    requestParams: {
                        ...oldState.requestParams,
                        [attrMap.page.key]: oldState.requestParams[attrMap.page.key] + 1,
                    },
                }
            },
            (newState) => {
                getTopicList(newState.requestParams)
            }
        )
    }

    // 每次 action 后重置页数然后请求
    const actionCallBack = (actions) => {
        setState(
            (oldState) => {
                return {
                    isLoading: false,
                    hasNext: true,
                    topicList: [],
                    requestParams: {
                        ...oldState.requestParams,
                        ...actions,
                        [attrMap.page.key]: 0,
                    },
                }
            },
            (newState) => {
                loadMore()
            }
        )
    }

    // 没有 action 的时候开始自己要请求一次
    ctx.effect(() => {
        if (!ctx.props.Action) {
            loadMore()
        }
    }, [])

    return {
        setIsLoading,
        setTopicList,
        getTopicList,
        setHasNext,
        loadMore,
        actionCallBack,
    }
}

export default (props) => {
    // 获取 ActionBar
    const { onlyTitle, Action } = props

    const ctx = useConcent({
        state: {
            isLoading: false,
            hasNext: true,
            topicList: [],
            requestParams: {
                [attrMap.type.key]: null,
                [attrMap.sort.key]: null,
                [attrMap.page.key]: 0,
                [attrMap.count.key]: 10,
                ...props.requestParam,
            },
        },
        props,
        setup,
    })

    const { setIsLoading, setTopicList, getTopicList, loadMore, actionCallBack } = ctx.settings

    const { state, setState } = ctx

    const { isLoading, hasNext, topicList, requestParams } = state

    const classes = useStyles()

    // 首次加载时的骨架屏
    const LoadingFrame = (
        <>
            {range(0, 3).map((currentValue) => (
                <div
                    key={'sk-'.concat(currentValue)}
                    className="flex flex-col items-stretch pt-4 pb-6 px-6 border-0 border-b border-solid border-gray-400"
                >
                    <div className="flex flex-row items-center">
                        <Skeleton height={40} width={40} variant="circle" />
                        <Skeleton height={35} width={150} className="ml-2" variant="text" />
                    </div>
                    <div className="mb-2">
                        <Skeleton height={50} className="w-full" variant="text" />
                    </div>
                    <div className="flex content-start ">
                        <Skeleton className={classes.sk + ' mr-2 rounded-lg'} variant="rect" />
                        <Skeleton className={classes.sk + ' mr-2 rounded-lg'} variant="rect" />
                        <Skeleton className={classes.sk + ' rounded-lg'} variant="rect" />
                    </div>
                </div>
            ))}
        </>
    )

    return (
        <div>
            <StickyContainer>
                <Paper>
                    {/* action bar */}
                    {Action ? (
                        <Sticky>
                            {({ style }) => (
                                <div style={{ ...style, zIndex: 100 }}>
                                    <Action
                                        callBackFn={actionCallBack}
                                        tabKey={{
                                            ...attrMap.type,
                                            defaultValue: attrMap.type.selectMap.normal.key,
                                        }}
                                        menuKey={{
                                            ...attrMap.sort,
                                            defaultValue: attrMap.sort.selectMap.replyTime.key,
                                        }}
                                    />
                                </div>
                            )}
                        </Sticky>
                    ) : undefined}

                    {/* 帖子列表 */}
                    <div>
                        {isLoading && requestParams.page == 1
                            ? LoadingFrame
                            : topicList.map((topic) => {
                                  return (
                                      <div
                                          className={
                                              onlyTitle
                                                  ? 'overflow-hidden'
                                                  : 'border-solid border-0 border-b border-gray-400 overflow-hidden'
                                          }
                                      >
                                          <ListItem
                                              alignItems="center"
                                              ContainerComponent="div"
                                              button
                                              key={topic.id}
                                              style={
                                                  onlyTitle
                                                      ? { padding: '0.5rem 1rem' }
                                                      : { padding: '1rem 1.5rem' }
                                              }
                                          >
                                              <Topic onlyTitle={onlyTitle} topic={topic} />
                                          </ListItem>
                                      </div>
                                  )
                              })}
                    </div>

                    {/* 加载更多 */}
                    {topicList.length > 0 && !onlyTitle ? (
                        hasNext ? (
                            <div onClick={() => loadMore()} className="p-2 text-center" key={0}>
                                <Typography color="textSecondary">
                                    {isLoading ? '加载中 ...' : '点击加载更多'}
                                </Typography>
                            </div>
                        ) : (
                            <div className="p-2 text-center" key={0}>
                                <Typography color="textSecondary">{'到底了'}</Typography>
                            </div>
                        )
                    ) : (
                        ''
                    )}
                </Paper>
                {/* 完全没有内容 */}
                {topicList.length == 0 && !hasNext && !onlyTitle ? (
                    <div className="h-64 w-full flex items-center justify-center">
                        <Typography color="textSecondary">{'没有内容'}</Typography>
                    </div>
                ) : (
                    ''
                )}
            </StickyContainer>
        </div>
    )
}
