import React from 'react'
import { useHistory } from 'react-router-dom'

import { Avatar, Typography } from '@material-ui/core'

export default (props) => {
    const { userInfo } = props
    const history = useHistory()
    return (
        <div
            className="flex flex-row items-center cursor-pointer hover:text-blue-500"
            onClick={() => history.push('/user-center/' + userInfo.submitterUserId + '/post-list')}
        >
            <Avatar
                alt={userInfo.submitterNickname}
                // src="https://upload-bbs.mihoyo.com/upload/2019/01/17/e6b220ca85d57dae70379399b85e3bee.png?x-oss-process=image/resize,s_150/quality,q_80/auto-orient,0/interlace,1/format,jpg"
                src={userInfo.submitterAvatarPath}
            />
            <Typography className="pl-2">{userInfo.submitterNickname}</Typography>
        </div>
    )
}
