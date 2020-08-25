import React from 'react'

import Topic from './Topic'

export default (props) => {
    // 获得 Action 组件
    const { Action } = props

    return (
        <div>
            <div>{Action ? <Action/> : undefined}</div>
            <div>
                {props.topicList ? props.topicList.map((topic) => {
                    return <Topic topic={topic} />
                }) : undefined}
            </div>
        </div>
    )
}
