/* 用户中心 / 主题列表 */

import React from 'react'

import TopicList from '@component/TopicList'
import Action from '@component/TopicList/Action'

export default (props) => {
    const { id } = props
    return <TopicList Action={Action} requestParam={{ userId: id }} />
}
