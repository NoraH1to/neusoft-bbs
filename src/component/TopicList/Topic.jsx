import React from 'react'
import { useHistory } from 'react-router-dom'

import UserHeader from './UserHeader'

export default (props) => {
    const { topic } = props
    const { submitterUserId, submitterNickname, submitterAvatarPath } = topic
    const history = useHistory()
    return (
        <div onClick={() => history.push('/topic/'.concat(topic.id))}>
            <UserHeader userInfo={{ submitterUserId, submitterNickname, submitterAvatarPath }} />
            <div>{'标题 '.concat(topic.title)}</div>
            <div>{'预览内容 '.concat(topic.shortContent)}</div>
            {(() => {
                if (topic.images.length > 0) {
                    return (
                        <div>
                            {topic.images.map((imgURL) => {
                                return <img src={imgURL}></img>
                            })}
                        </div>
                    )
                }
            })()}
        </div>
    )
}
