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
        history,
    } = props

    return (
        <div>
            <div className="pb-6">
                <div className="pb-2">
                    <TopicList
                        onlyTitle={true}
                        requestParam={{ [attrMap.boardId.key]: id, type: 'announcement' }}
                    />
                </div>
                <div>
                    <TopicList
                        onlyTitle={true}
                        requestParam={{ [attrMap.boardId.key]: id, type: 'pinned' }}
                    />
                </div>
            </div>
            <div>
                <TopicList
                    onlyTitle={false}
                    Action={Action}
                    requestParam={{ [attrMap.boardId.key]: id }}
                />
            </div>
            <div className="fixed right-0 bottom-0 m-6">
                <Fab onClick={() => history.push('/edit-topic/?boardId='.concat(id))} color="primary">
                    <AddIcon />
                </Fab>
            </div>
        </div>
    )
}
