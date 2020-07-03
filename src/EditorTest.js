import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import DOMPurify from 'dompurify';


class EditorConvertToHTML extends Component {
    constructor(props) {
        super(props);
        const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
                toolbarOptions: {
                    image: {
                        alt: { present: true, mandatory: false }
                    }
                }
            };
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;
        return (
            <Card>
                <CardContent>
                    <Editor
                        toolbar={this.state.toolbarOptions}
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                        localization={{
                            locale: 'zh',
                        }}
                    />
                    <textarea
                        disabled
                        value={DOMPurify.sanitize(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
                    />
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(draftToHtml(convertToRaw(editorState.getCurrentContent()))) }}>
                    </div>
                </CardContent>
            </Card>
        );
    }
}

export default EditorConvertToHTML
