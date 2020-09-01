import React from 'react'

// 组件
import { Typography } from '@material-ui/core'
import UserHeader from '@component/TopicList/UserHeader'
import TopicContent from '@component/TopicContent'

export default (props) => {
    const { reply, authorId } = props
    // 标签基础样式
    const tagStyle = {
        dispaly: 'inline-block',
        padding: '2px 6px',
        fontWeight: '600',
        borderRadius: '5px',
        fontSize: '14px',
        color: '#fff',
    }
    // 楼主
    const TagAnno = (
        <div
            style={{
                ...tagStyle,
                color: '#1976d2',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: '#1976d2',
            }}
        >
            楼主
        </div>
    )
    return (
        <div>
            <div className="flex flex-row items-center">
                {/* 用户信息 */}
                <div className="flex-shrink-0">
                    <UserHeader
                        userInfo={{
                            submitterUserId: reply.replierUserId,
                            submitterNickname: reply.replierNickname,
                            submitterAvatarPath: reply.replierAvatarPath,
                        }}
                    />
                </div>
                {/* 楼主标签 */}
                {authorId ? (
                    authorId == reply.replierUserId ? (
                        <div className="ml-2">{TagAnno}</div>
                    ) : (
                        ''
                    )
                ) : (
                    ''
                )}
                <div className="flex-grow"></div>
                {/* 回复时间 */}
                <div className="ml-2 flex flex-col justify-center">
                    <Typography noWrap variant="caption" color="textSecondary">
                        {reply.replyTime}
                    </Typography>
                </div>
            </div>
            {/* 回复内容 */}
            <div className="mt-4">
                <TopicContent rawHTML={reply.content} />
            </div>
        </div>
    )
}
