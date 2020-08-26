import React from 'react'

import TopicList from '@component/TopicList'
import Action from '@component/TopicList/Action'

import { attrMap } from '@modules/topic/template'

export default (props) => {
    const {
        match: {
            params: { id },
        },
    } = props

    return (
        <div>
            <TopicList Action={Action} requestParam={{ [attrMap.boardId.key]: id }} />
        </div>
    )
}
