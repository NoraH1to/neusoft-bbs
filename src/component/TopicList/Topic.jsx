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
    const { topic, hideAvater } = props
    const { submitterUserId, submitterNickname, submitterAvatarPath } = topic
    const history = useHistory()
    return (
        <div className="w-full flex flex-col items-stretch">
            {/* 头 */}
            <div className="flex justify-between items-center mb-2">
                {/* 用户信息 */}
                <div className="flex-grow">
                    <UserHeader
                        userInfo={{ submitterUserId, submitterNickname, submitterAvatarPath }}
                    />
                </div>

                {/* 置顶/精华 tag */}
                <div className="flex">
                    {topic.featured ? (
                        <span className={Scss.itemTypeWrapper}>
                            <span className={Scss.itemFeatured}>精华</span>
                        </span>
                    ) : (
                        <></>
                    )}
                    {topic.pinned ? (
                        <span className={Scss.itemTypeWrapper}>
                            <span className={Scss.itemPinned}>置顶</span>
                        </span>
                    ) : (
                        <></>
                    )}
                </div>
            </div>

            {/* 内容 */}
            <div className="flex flex-col" onClick={() => history.push('/topic/'.concat(topic.id))}>
                {/* 类型 tag、标题 */}
                <div className="flex items-center" title={topic.title}>
                    <div className="flex-shrink-0">
                        {topic.type === 0 ? (
                            <span className={Scss.itemTypeCommon}>普通</span>
                        ) : (
                            <span className={Scss.itemTypeAnno}>公告</span>
                        )}
                    </div>
                    <div className="overflow-hidden">
                        <Typography noWrap variant="h6" className="hover:text-blue-500">
                            {topic.title}
                        </Typography>
                    </div>
                </div>

                {/* 短内容 */}
                <div className="flex w-full overflow-hidden">
                    <Typography noWrap color="textSecondary">
                        {topic.shortContent}
                    </Typography>
                </div>

                {/* 预览图 */}
                {(() => {
                    if (topic.images.length > 0) {
                        return (
                            <div className={"flex mt-4 " + Scss.itemImage}>
                                {topic.images.map((imgURL) => (
                                    <div className={classes.sk + ' rounded-lg'} style={{background: 'url("'+ imgURL +'") no-repeat center', backgroundSize: 'cover'}}/>
                                ))}
                            </div>
                        )
                    }
                })()}
            </div>

            {/* 底部 */}
            <footer className="flex items-center justify-between mt-4">
                {/* 日期 */}
                <div className="footerLeft">
                    <div className={Scss.itemDate}>{topic.submitTime}</div>
                </div>

                {/* 浏览/回复数 */}
                <div className={Scss.footerRight}>
                    <div className={Scss.itemViewCount}>
                        <VisibilityIcon fontSize="small" style={{ color: 'rgb(150, 150, 150)' }} />
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
        </div>
    )
}
