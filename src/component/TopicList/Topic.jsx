import React from 'react'
import { useHistory } from 'react-router-dom'

import UserHeader from './UserHeader'
import { Avatar, Typography } from '@material-ui/core'
import { Visibility as VisibilityIcon, Message as MessageIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import Scss from './index.scss'

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

export default (props) => {
    const classes = useStyles()
    const { topic, onlyTitle } = props
    const { submitterUserId, submitterNickname, submitterAvatarPath } = topic
    const history = useHistory()

    // 标签基础样式
    const tagStyle = {
        dispaly: 'inline-block',
        padding: '2px 6px',
        fontWeight: '600',
        borderRadius: '5px',
        fontSize: '14px',
        color: '#fff',
    }

    // 公告标签
    const TagAnno = <div style={{ ...tagStyle, backgroundColor: '#ffc61b' }}>公告</div>
    // 置顶标签
    const TagPin = <div style={{ ...tagStyle, backgroundColor: '#FF4D4F' }}>置顶</div>
    // 精华标签
    const TagFeature = <div style={{ ...tagStyle, backgroundColor: '#95DE64' }}>精华</div>

    return (
        <div className="w-full flex flex-col items-stretch">
            {/* 头 */}
            {onlyTitle ? (
                ''
            ) : (
                <div className="flex justify-between items-center mb-2">
                    {/* 用户信息 */}
                    <div className="flex-grow">
                        <UserHeader
                            userInfo={{ submitterUserId, submitterNickname, submitterAvatarPath }}
                        />
                    </div>

                    {/* 置顶/精华 tag */}
                    <div className="flex">
                        {topic.featured ? <div className="ml-2">{TagFeature}</div> : <></>}
                        {topic.pinned ? <div className="ml-2">{TagPin}</div> : <></>}
                    </div>
                </div>
            )}

            {/* 内容 */}
            <div className="flex flex-col" onClick={() => history.push('/topic/'.concat(topic.id))}>
                {/* 类型 tag、标题 */}
                <div className="flex items-center justify-start" title={topic.title}>
                    {/* tag */}
                    <div className="flex flex-row flex-shrink-0">
                        {topic.type === 1 ? <div className="mr-2">{TagAnno}</div> : ''}
                        {/* 简略模式的时候显示置顶 tag */}
                        {onlyTitle ? (topic.pinned ? <div className="mr-2">{TagPin}</div> : '') : ''}
                    </div>
                    {/* 标题 */}
                    <div className="flex-grow overflow-hidden">
                        <Typography noWrap variant={onlyTitle ? 'subtitle1' : 'h6'} className="hover:text-blue-500">
                            {topic.title}
                        </Typography>
                    </div>
                </div>

                {onlyTitle ? (
                    ''
                ) : (
                    <>
                        {/* 预览内容 */}
                        <div className="flex w-full overflow-hidden">
                            <Typography noWrap color="textSecondary">
                                {topic.shortContent}
                            </Typography>
                        </div>
                        {/* 预览图 */}
                        {(() => {
                            if (topic.images.length > 0) {
                                return (
                                    <div className={'flex mt-4 ' + Scss.itemImage}>
                                        {topic.images.map((imgURL) => (
                                            <div
                                                className={classes.sk + ' rounded-lg'}
                                                style={{
                                                    background:
                                                        'url("' + imgURL + '") no-repeat center',
                                                    backgroundSize: 'cover',
                                                }}
                                            />
                                        ))}
                                    </div>
                                )
                            }
                        })()}
                    </>
                )}
            </div>

            {/* 底部 */}
            {onlyTitle ? (
                ''
            ) : (
                <footer className="flex items-center justify-between mt-4">
                    {/* 日期 */}
                    <div className="footerLeft">
                        <div className={Scss.itemDate}>{topic.submitTime}</div>
                    </div>

                    {/* 浏览/回复数 */}
                    <div className={Scss.footerRight}>
                        <div className={Scss.itemViewCount}>
                            <VisibilityIcon
                                fontSize="small"
                                style={{ color: 'rgb(150, 150, 150)' }}
                            />
                            <Typography color="textSecondary" style={{ marginLeft: 5 }}>
                                {topic.viewCount}
                            </Typography>
                        </div>
                        <div className={Scss.itemReplyCount}>
                            <MessageIcon fontSize="small" style={{ color: 'rgb(150, 150, 150)' }} />
                            <Typography color="textSecondary" style={{ marginLeft: 5 }}>
                                {topic.replyCount}
                            </Typography>
                        </div>
                    </div>
                </footer>
            )}
        </div>
    )
}
