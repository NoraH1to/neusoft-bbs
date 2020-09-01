import React from 'react'
import { Typography } from '@material-ui/core'
import css from './index.scss'
import DOMPurify from 'dompurify'

const noData = (
    <div className="h-64 w-full flex items-center justify-center">
        <Typography variant="subtitle1" color="textSecondary">
            没有内容
        </Typography>
    </div>
)

export default (props) => {
    const { editorState, rawHTML } = props
    return rawHTML ? (
        <div
            className={css.container}
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(editorState ? editorState.toHTML() : rawHTML),
            }}
        ></div>
    ) : (
        noData
    )
}
