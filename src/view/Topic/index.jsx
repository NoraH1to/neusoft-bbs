/* 主题详情 */

import React, { useEffect, useState } from 'react'

// 组件
import { Typography, Paper, Link } from '@material-ui/core'
import ReplyList from '@component/ReplyList'
import TopicContent from '@component/TopicContent'
import UserHeader from '@component/TopicList/UserHeader'

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

    useEffect(() => {
        getTopicDetail()
            .then((res) => {
                setTopic(res.data)
            })
            .catch((err) => {
                console.log('getTopicDetail fail', err)
            })
    }, [])

    return (
        <div>
            <Paper>
            <div className="flex flex-col justify-start py-4 sm:py-8">
                {/* 帖子信息 */}
                <div className="px-4 sm:px-10 pb-4 sm:pb-6 border-0 border-b border-solid border-gray-400">
                    <div className="mb-4 break-all">
                        {/* 精华 / 置顶 */}
                        <span className="inline align-middle mr-1">
                            <div className="w-auto inline-block">
                                {topic.type === 1 ? (
                                    <span className="inline-block px-1">
                                        <span
                                            className="inline-block px-2 py-1 text-white text-xs rounded-lg border border-solid"
                                            style={{ color: '#ffc61b', borderColor: '#ffc61b' }}
                                        >
                                            公告
                                        </span>
                                    </span>
                                ) : (
                                    ''
                                )}
                                {topic.featured ? (
                                    <span className="inline-block px-1">
                                        <span
                                            className="inline-block px-2 py-1 text-white text-xs rounded-lg font-extrabold"
                                            style={{ background: '#95de64' }}
                                        >
                                            精华
                                        </span>
                                    </span>
                                ) : (
                                    <></>
                                )}
                                {topic.pinned ? (
                                    <span className="inline-block px-1">
                                        <span
                                            className="inline-block px-2 py-1 text-white text-xs rounded-lg font-extrabold"
                                            style={{ background: '#ff4d4f' }}
                                        >
                                            置顶
                                        </span>
                                    </span>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </span>
                        {/* 标题 */}
                        <Typography Wrap variant="h5" className="text-black inline align-middle">
                            {topic.title}
                        </Typography>
                    </div>
                    <div className="flex items-sterch justify-between">
                        <div>
                            <UserHeader userInfo={topic} />
                        </div>
                        <div className="flex items-center">
                            <Typography color="textSecondary" variant="caption">
                                {topic.submitTime}
                            </Typography>
                        </div>
                    </div>
                </div>

                {/* 帖子内容 */}
                <div className="px-4 sm:px-10 py-4">
                    <TopicContent rawHTML={topic.content} />
                </div>

                {/* 最后编辑时间 */}
                {topic.editTime ? (
                    <div className="pt-4 border-0 border-t border-solid border-gray-400 flex flex-col items-center justify-center">
                        <Typography color="textSecondary" variant="subtitle2">
                            最后编辑于
                        </Typography>
                        <Typography color="textSecondary" variant="subtitle2">
                            {topic.editTime}
                        </Typography>
                        <Link
                            variant="subtitle2"
                            onClick={() =>
                                history.push(
                                    '/user-center/' + topic.lastReplierUserId + '/post-list'
                                )
                            }
                        >
                            {topic.editorNickname}
                        </Link>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </Paper>
        <Paper>
            <ReplyList requestParam={{ topicId: id }}/>
        </Paper>
        </div>
    )
}
