import 'braft-editor/dist/index.css'
import React, { useState, useRef } from 'react'
import BraftEditor from 'braft-editor'

export default () => {
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))
    const [editorInstance, setEditorInstance] = useState(null)

    const editorObj = useRef(null)

    const handleChange = (editorState) => {
        setEditorState(editorState)
    }

    return (
        <div>
            <button onClick={() => console.log(editorState.toHTML())}>2333</button>
            <BraftEditor ref={instance => setEditorInstance(instance)} value={editorState} onChange={handleChange} />
        </div>
    )
}
