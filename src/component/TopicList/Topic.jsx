import React from 'react'
import { useHistory } from 'react-router-dom'

import UserHeader from './UserHeader'
import { Avatar, Typography } from '@material-ui/core'
import { Visibility as VisibilityIcon, Message as MessageIcon } from '@material-ui/icons'

import Scss from './index.scss'

export default (props) => {
    const { topic } = props
    const { submitterUserId, submitterNickname, submitterAvatarPath } = topic
    const history = useHistory()
    return (
        <div className="w-full">
            {/* 头 */}
            <header className="flex justify-between items-center">
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
            </header>

            {/* 内容 */}
            <main className="mt-2" onClick={() => history.push('/topic/'.concat(topic.id))}>
                {/* 类型 tag、标题 */}
                <div title={topic.title}>
                    {topic.type === 0 ? (
                        <span className={Scss.itemTypeCommon}>普通</span>
                    ) : (
                        <span className={Scss.itemTypeAnno}>公告</span>
                    )}
                    <Typography variant="h6" className={Scss.itemTitle}>
                        {topic.title}
                    </Typography>
                </div>

                {/* 短内容 */}
                <Typography noWrap color="textSecondary" className="">
                    {topic.shortContent}
                </Typography>

                {/* 预览图 */}
                <div className={Scss.itemImageWrapper}>
                    {(() => {
                        if (topic.images.length > 0) {
                            return (
                                <div className={Scss.itemImageContainer}>
                                    {topic.images.map((imgURL) => (
                                        <div className={Scss.itemImage} key={imgURL}>
                                            <img
                                                src="https://upload-bbs.mihoyo.com/upload/2019/01/17/299d032cdcb014fb1015a4cc5b5f70b4.png?x-oss-process=image/resize,s_150/quality,q_80/auto-orient,0/interlace,1/format,jpg"
                                                alt={imgURL}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                    })()}
                </div>
            </main>

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
