import React from 'react'
import { useConcent } from 'concent'
import { range, omit } from 'lodash'

// 组件
import { Paper, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { StickyContainer, Sticky } from 'react-sticky'
import Reply from './Reply'

// 接口
import { topicReplyList, userReplyList } from '@api/reply'
import { attrMap } from '@modules/reply/template'

const setup = (ctx) => {
    const { state, setState } = ctx
    const { isLoading, hasNext, replyList, requestParams } = state

    ctx.computed({
        // 根据参数决定用哪个 api
        replyApi: (newState) => {
            return newState.requestParams.topicId ? topicReplyList : userReplyList
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
    const setReplyList = (newState, callBack) => {
        setState((oldState) => {
            return {
                replyList: oldState.replyList.concat(newState),
            }
        }, callBack)
    }

    // 获取回复列表
    const getReplyList = (inputRequestParams) => {
        // 拿到最新的加载状态，没有加载才执行
        if (!isLoading) {
            setIsLoading(true)
            ctx.refComputed.replyApi
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
                            replyList:
                                oldState.requestParams.page == 1
                                    ? content
                                    : oldState.replyList.concat(content),
                        }
                    })
                })
                .catch((err) => {
                    console.log('requestReplyList fail', err)
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
                getReplyList(newState.requestParams)
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
                    replyList: [],
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
        setReplyList,
        getReplyList,
        setHasNext,
        loadMore,
        actionCallBack,
    }
}

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
                <div>
                    <Skeleton height={50} className="w-full" variant="text" />
                </div>
            </div>
        ))}
    </>
)

export default (props) => {
    // 获取 ActionBar
    const { Action, authorId } = props

    const ctx = useConcent({
        state: {
            isLoading: false,
            hasNext: true,
            replyList: [],
            requestParams: {
                submitterOnly: false,
                [attrMap.sort.key]: null,
                [attrMap.page.key]: 0,
                [attrMap.count.key]: 10,
                ...props.requestParam,
            },
        },
        setup,
        props
    })

    const { setIsLoading, setReplyList, getReplyList, loadMore, actionCallBack } = ctx.settings

    const { state, setState } = ctx

    const { isLoading, hasNext, replyList, requestParams } = state
    return (
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
                                        ...(props.requestParam.userId ? omit(attrMap.submitterOnly, 'selectMap.true') : attrMap.submitterOnly),
                                        defaultValue: attrMap.submitterOnly.selectMap[false].key,
                                    }}
                                    menuKey={{
                                        ...attrMap.sort,
                                        defaultValue: attrMap.sort.selectMap.normal.key,
                                    }}
                                />
                            </div>
                        )}
                    </Sticky>
                ) : undefined}

                {/* 回复列表 */}
                {isLoading && requestParams.page == 1
                    ? LoadingFrame
                    : replyList.map((reply) => {
                          return (
                              <div
                                  className={
                                      'border-solid border-0 border-b border-gray-400 overflow-hidden'
                                  }
                              >
                                  <div key={reply.id} style={{ padding: '1rem 1.5rem' }}>
                                      <Reply reply={reply} authorId={authorId}/>
                                  </div>
                              </div>
                          )
                      })}

                {/* 加载更多 */}
                {replyList.length > 0 ? (
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
            {replyList.length == 0 && !hasNext ? (
                <div className="h-64 w-full flex items-center justify-center">
                    <Typography color="textSecondary">{'没有内容'}</Typography>
                </div>
            ) : (
                ''
            )}
        </StickyContainer>
    )
}
