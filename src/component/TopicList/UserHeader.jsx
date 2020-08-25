import React from 'react'

export default (props) => {
    const { userInfo } = props
    return (
        <div>
            <div>{'id '.concat(userInfo.submitterUserId)}</div>
            <div>{'nickanme '.concat(userInfo.submitterNickname)}</div>
            <div>
                <img src={userInfo.submitterAvatarPath} />
            </div>
        </div>
    )
}
