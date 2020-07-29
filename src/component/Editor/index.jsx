import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import DOMPurify from 'dompurify';
import css from './Editor.module.scss'
import { registerDumb } from 'concent'
import { Button } from '@material-ui/core';

const setup = ctx => {
    const onEditorStateChange = (editorState) => {
        ctx.setState({
            editorState,
        });
    }
    const init = () => {
        ctx.dispatch('init')
    }
    const resetState = () => {
        ctx.dispatch('resetState')
    }
    return { onEditorStateChange, init, resetState }
};

const mapProps = ctx => {
    const { onEditorStateChange, init, resetState } = ctx.settings;
    const { editorState, toolbarOptions } = ctx.state;
    return { onEditorStateChange, editorState, toolbarOptions, hasLogin: ctx.moduleComputed.hasLogin, init, resetState }
}

const html = '';
const contentBlock = htmlToDraft(html);
const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
const editorState = EditorState.createWithContent(contentState);

const state = {
    editorState,
    toolbarOptions: {
        image: {
            alt: { present: true, mandatory: false }
        }
    }
};

const EditorUI = props => {
    // props.init()
    const history = useHistory();
    return (
        <Card>
            <CardContent>
                <Editor
                    toolbar={props.toolbarOptions}
                    editorState={props.editorState}
                    toolbarClassName={css.customEditorToolbar}
                    editorClassName={css.customEditor}
                    onEditorStateChange={props.onEditorStateChange}
                    localization={{
                        locale: 'zh',
                    }}
                />
                {/* <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(draftToHtml(convertToRaw(state.editorState.getCurrentContent()))) }}>
                </div> */}
                {/* <div>
                    {props.hasLogin ? '已经登录' : '没登录'}
                </div> */}
                <Button onClick={() => history.push('login')}></Button>
            </CardContent>
        </Card>
    );

}

const connectFn = registerDumb({ state, setup, mapProps, module: 'user', watchedKeys: '*', connect: { 'loading': ['user/init'] } });
export default connectFn(EditorUI)
