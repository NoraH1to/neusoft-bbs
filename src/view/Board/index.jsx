import React from 'react'
import { useConcent } from 'concent'

// 组件
import TopicList from '@component/TopicList'
import Action from '@component/TopicList/Action'
import { Fab } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'

// 接口
import { attrMap } from '@modules/topic/template'
import { boardPermission } from '@api/user'

export default (props) => {
    const {
        match: {
            params: { id },
        },
        history,
    } = props
    const ctx = useConcent({ module: 'user', props })

    // 进入板块刷新板块权限
    ctx.effect(() => {
        boardPermission
            .request({
                params: {
                    boardId: id,
                },
            })
            .then((res) => {
                ctx.dispatch('addBoardPermission', { [id]: res.data })
                if (res.data.banVisit) {
                    history.goBack()
                }
            })
            .catch((err) => {
                console.log('requestBoardPermission fail', err)
            })
    }, [])

    return (
        <div>
            {/* 板块公告帖、置顶帖 */}
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

            {/* 板块帖子 */}
            <div>
                <TopicList
                    onlyTitle={false}
                    Action={Action}
                    requestParam={{ [attrMap.boardId.key]: id }}
                />
            </div>

            {/* 发帖按钮 */}
            {ctx.moduleComputed.hasLogin ? (
                <div className="fixed right-0 bottom-0 m-6">
                    <Fab
                        onClick={() => history.push('/edit-topic/?boardId='.concat(id))}
                        color="primary"
                    >
                        <AddIcon />
                    </Fab>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}
