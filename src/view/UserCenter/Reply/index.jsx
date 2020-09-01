/* 用户中心 / 回复列表 */

import React from 'react'

import ReplyList from '@component/ReplyList'
import Action from '@component/TopicList/Action'

export default function (props) {
    const { id } = props
    return <ReplyList requestParam={{ userId: id } } Action={Action} />
}
