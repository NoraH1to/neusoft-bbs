import React, { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import DOMPurify from 'dompurify';
import css from './Editor.module.scss'

export default function () {

    const html = '';
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    const [state, setState] = useState({
        editorState,
        toolbarOptions: {
            image: {
                alt: { present: true, mandatory: false }
            }
        }
    })

    const onEditorStateChange = (editorState) => {
        setState({
            editorState,
        });
    };

    return (
        <Card>
            <CardContent>
                <Editor
                    toolbar={state.toolbarOptions}
                    editorState={state.editorState}
                    toolbarClassName={css.customEditorToolbar}
                    editorClassName={css.customEditor}
                    onEditorStateChange={onEditorStateChange}
                    localization={{
                        locale: 'zh',
                    }}
                />
                {/* <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(draftToHtml(convertToRaw(state.editorState.getCurrentContent()))) }}>
                </div> */}
            </CardContent>
        </Card>
    );

}
