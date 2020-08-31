import React from 'react'

import TopicList from '@component/TopicList'
import Action from '@component/TopicList/Action'
import { Fab } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'

import { attrMap } from '@modules/topic/template'

export default (props) => {
    const {
        match: {
            params: { id },
        },
        history
    } = props

    return (
        <div>
            <TopicList Action={Action} requestParam={{ [attrMap.boardId.key]: id }} />
            <div className="fixed right-0 bottom-0 m-6">
                <Fab onClick={() => history.push('/edit-topic')} color="primary">
                    <AddIcon />
                </Fab>
            </div>
        </div>
    )
}
