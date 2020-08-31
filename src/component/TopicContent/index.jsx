import React from 'react'
import css from './index.scss'
import DOMPurify from 'dompurify'

export default (props) => {
    const { editorState, rawHTML } = props
    return (
        <div
            className={css.container}
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(editorState ? editorState.toHTML() : rawHTML),
            }}
        ></div>
    )
}
